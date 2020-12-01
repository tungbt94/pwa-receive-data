<template>
  <div class="share-data-display">
    <p>title: {{ title }}</p>
    <p>text: {{ text }}</p>
    <p>url: {{ url }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      text: '',
      url: '',
    }
  },

  mounted() {
    const parsedUrl = new URL(window.location)
    this.title = parsedUrl.searchParams.get('title')
    this.text = parsedUrl.searchParams.get('text')
    this.url = decodeURIComponent(parsedUrl.searchParams.get('url')) + '.html'
  },
}
</script>
