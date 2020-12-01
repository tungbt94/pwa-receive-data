self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  if (url.pathname !== '/share') {
    return event.respondWith(fetch(event.request))
  }

  event.respondWith(
    (() => {
      const title = url.searchParams.get('title')
      const text = url.searchParams.get('text')
      const isAndroid = navigator.userAgent.indexOf('Android')
      const redirectUrl = new URL(`${url.origin}/share/`)
      redirectUrl.searchParams.append('title', title)
      if (isAndroid) {
        // because android cant get url, we need get from text
        const urlIndex = text.indexOf('https')
        let paramUrl = text.slice(urlIndex)
        // remove .html in url
        if (paramUrl.indexOf('html')) {
          paramUrl = paramUrl.slice(0, paramUrl.indexOf('html') - 1)
        }
        const pureText = text.slice(0, urlIndex - 1)
        redirectUrl.searchParams.append('text', pureText)
        redirectUrl.searchParams.append('url', paramUrl)
      } else {
        const paramUrl = url.searchParams.get('url')
        redirectUrl.searchParams.append('text', text)
        redirectUrl.searchParams.append('url', paramUrl)
      }
      return Response.redirect(redirectUrl.href, 302)
    })()
  )
})
