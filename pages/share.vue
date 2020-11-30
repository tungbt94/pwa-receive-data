<template>
  <div class="share-data-display">
    <p>{{ title }}</p>
    <p>{{ text }}</p>
    <p>{{ url }}</p>
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
    this.url = parsedUrl.searchParams.get('url')
  },
}
</script>
