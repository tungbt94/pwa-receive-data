self.addEventListener('fetch', (event) => {
  console.log('event:', event)
  const url = new URL(event.request.url)
  if (url.pathname === '/share') {
    const title = url.searchParams.get('title')
    const text = url.searchParams.get('text')
    const isAndroid = navigator.userAgent.indexOf('Android')
    if (isAndroid) {
      // because android cant get url, we need get from text
      const urlIndex = text.indexOf('https')
      const paramUrl = text.slice(urlIndex)
      const pureText = text.slice(0, urlIndex - 1)
      postMessage({
        title,
        text: pureText,
        url: paramUrl,
      })
    } else {
      const paramUrl = url.searchParams.get('url')
      postMessage({
        title,
        text,
        url: paramUrl,
      })
    }
  }
})
