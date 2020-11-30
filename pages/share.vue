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
    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log('share >> mounted >> message:', event.data)
    })
    const parsedUrl = new URL(window.location)
    this.title = parsedUrl.searchParams.get('title')
    this.text = parsedUrl.searchParams.get('text')
    this.url = parsedUrl.searchParams.get('url')
  },
}
</script>
