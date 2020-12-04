<template>
  <div class="share-data-display">
    <p>title: {{ title }}</p>
    <p>text: {{ text }}</p>
    <p>url: {{ url }}</p>
    <img v-if="src" :src="src" :alt="url" />
  </div>
</template>

<script>
import { bufferToImageUrl } from '@/utils/image'

export default {
  data() {
    return {
      title: '',
      text: '',
      url: '',
      src: '',
    }
  },

  mounted() {
    this.syncDataFromParam()
    this.getScreenshot()
  },

  methods: {
    syncDataFromParam() {
      const parsedUrl = new URL(window.location)
      this.title = parsedUrl.searchParams.get('title')
      this.text = parsedUrl.searchParams.get('text')
      this.url = decodeURIComponent(parsedUrl.searchParams.get('url')) + '.html'
    },
    getScreenshot() {
      const screenshotFunctionUrl =
        'https://pwa-receive-data.netlify.app/.netlify/functions/screenshot'
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ pageToScreenshot: this.url }),
      }
      fetch(screenshotFunctionUrl, options)
        .then((res) => res.json())
        .then((res) => {
          if (!res.buffer) console.log('Capture screenshot error')
          this.src = bufferToImageUrl(res.buffer.data)
        })
        .catch((err) => {
          console.error('error:', err)
        })
    },
  },
}
</script>
