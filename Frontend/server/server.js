const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./config/database');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// JWT Secret (should be in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Register route
app.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Validate input presence
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    // Validate input lengths according to database schema
    if (first_name.length > 100 || last_name.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'First name and last name must not exceed 100 characters'
      });
    }

    if (email.length > 150) {
      return res.status(400).json({
        success: false,
        message: 'Email must not exceed 150 characters'
      });
    }

    if (password.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Password must not exceed 100 characters'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address' 
      });
    }

    // Check if user already exists
    const [existingUsers] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into database
    const [result] = await db.query(
      'INSERT INTO users (first_name, last_name, email, password, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
      [first_name, last_name, email, hashedPassword, 'user']
    );

    // Get the newly created user with timestamps
    const [newUser] = await db.query(
      'SELECT id, first_name, last_name, email, role, created_at, updated_at FROM users WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      userId: result.insertId,
      user: {
        id: newUser[0].id,
        firstName: newUser[0].first_name,
        lastName: newUser[0].last_name,
        email: newUser[0].email,
        role: newUser[0].role,
        createdAt: newUser[0].created_at,
        updatedAt: newUser[0].updated_at
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration' 
    });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check if user exists
    const [users] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = users[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token (expires in 30 days)
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Update last login time
    await db.query(
      'UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [user.id]
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    req.user = user;
    next();
  });
};

// Protected route to verify token
app.get('/verify-token', authenticateToken, async (req, res) => {
  try {
    // Get updated user data
    const [users] = await db.query(
      'SELECT id, first_name, last_name, email, role, created_at, updated_at FROM users WHERE id = ?',
      [req.user.userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = users[0];

    res.json({
      success: true,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during token verification'
    });
  }
});

// Email notification endpoint for daily check-ins
app.post('/send-email', authenticateToken, async (req, res) => {
  try {
    const { to, subject, template, data } = req.body;
    
    // Validate required fields
    if (!to || !subject) {
      return res.status(400).json({
        success: false,
        message: 'Email recipient and subject are required'
      });
    }

    // For now, we'll simulate email sending and log the details
    // In a production environment, you would integrate with an email service like:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Nodemailer with SMTP
    
    const emailContent = generateEmailContent(template, data);
    
    console.log('=== EMAIL NOTIFICATION ===');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Template: ${template}`);
    console.log(`Content: ${emailContent}`);
    console.log('========================');
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return success response
    res.json({
      success: true,
      message: 'Email notification sent successfully',
      emailId: `sim_${Date.now()}`,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error sending email notification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email notification'
    });
  }
});

// Helper function to generate email content based on template
function generateEmailContent(template, data) {
  switch (template) {
    case 'checkin-confirmation':
      return `
        Hi ${data.userName},

        Your daily check-in has been successfully recorded!

        Check-in Details:
        • Date: ${data.checkInDate}
        • Mood: ${data.mood}
        • Note: ${data.note}
        • Current Streak: ${data.streakDays} days

        Keep up the great work! You're building amazing habits and making consistent progress.

        Visit your dashboard to track your progress: ${data.dashboardUrl}

        Best regards,
        The Mikaelson Initiative Team
      `;
      
    case 'streak-milestone':
      return `
        🎉 Congratulations ${data.userName}!

        You've reached an incredible milestone - ${data.streakDays} consecutive days of check-ins!

        This achievement shows your dedication and commitment to personal growth. You're setting an inspiring example for our community.

        Keep pushing forward and see how far you can go!

        View your progress: ${data.dashboardUrl}

        Celebrating your success,
        The Mikaelson Initiative Team
      `;
      
    case 'weekly-reminder':
      return `
        Hi ${data.userName},

        This is your weekly reminder to check in with your habits and goals.

        Last Check-in: ${data.lastCheckIn}

        Don't break your momentum! Take a moment to reflect on your progress and check in today.

        Visit your dashboard: ${data.dashboardUrl}

        Best regards,
        The Mikaelson Initiative Team
      `;
      
    default:
      return `
        Hi ${data.userName},

        You have a new notification from the Mikaelson Initiative.

        Visit your dashboard for more details: ${data.dashboardUrl}

        Best regards,
        The Mikaelson Initiative Team
      `;
  }
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
