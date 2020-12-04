function bufferToImageUrl(buffer) {
  const arrayBufferView = new Uint8Array(buffer)
  const blob = new Blob([arrayBufferView], { type: 'image/jpeg' })
  const urlCreator = window.URL || window.webkitURL
  const imageUrl = urlCreator.createObjectURL(blob)
  return imageUrl
}

export { bufferToImageUrl }
