<template>
  <div class="twitter-embed-root" ref="root"></div>
</template>

<script>
import { ref, onMounted, watch, nextTick } from 'vue'

export default {
  name: 'TwitterEmbed',
  props: {
    tweetId: { type: String, required: true },
    theme: { type: String, default: 'light' },
    align: { type: String, default: 'center' },
    conversation: { type: String, default: 'none' },
    width: { type: [String, Number], default: undefined },
  },
  setup(props) {
    const root = ref(null)

    const loadTwitterScript = () => {
      return new Promise((resolve) => {
        if (window.twttr && window.twttr.widgets) return resolve()
        const existing = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')
        if (existing) {
          existing.addEventListener('load', () => resolve(), { once: true })
          return
        }
        const s = document.createElement('script')
        s.async = true
        s.src = 'https://platform.twitter.com/widgets.js'
        s.onload = () => resolve()
        s.onerror = () => resolve() // resolve anyway; we may fallback later if needed
        document.body.appendChild(s)
      })
    }

    const render = async () => {
      await loadTwitterScript()
      await nextTick()
      if (!root.value) return
      root.value.innerHTML = ''
      if (window.twttr && window.twttr.widgets && props.tweetId) {
        try {
          await window.twttr.widgets.createTweet(props.tweetId, root.value, {
            theme: props.theme,
            align: props.align,
            conversation: props.conversation,
            dnt: true,
            width: props.width,
          })
        } catch (e) {
          // silently ignore; parent can show fallback if desired
        }
      }
    }

    onMounted(render)
    watch(() => props.tweetId, render)

    return { root }
  }
}
</script>

<style scoped>
.twitter-embed-root {
  width: 100%;
}
</style>
