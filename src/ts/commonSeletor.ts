class commonSeletor {
  static clear(
    cropBoxElement: HTMLElement,
    infoHeightElement: HTMLSpanElement,
    infoWidthElement: HTMLSpanElement
  ) {
    cropBoxElement.style.height = '0px'
    cropBoxElement.style.width = '0px'
    cropBoxElement.style.transform = 'translate3d(0px, 0px, 0px)'
    infoHeightElement.innerHTML = '0'
    infoWidthElement.innerHTML = '0'
  }

  static selectAll(
    cropBoxElement: HTMLElement,
    infoHeightElement: HTMLSpanElement,
    infoWidthElement: HTMLSpanElement,
    imgElement: HTMLImageElement,
    proportion?: number
  ) {
    const width = Math.round(parseFloat(imgElement.style.width))
    const height = Math.round(parseFloat(imgElement.style.height))
    cropBoxElement.style.height = `${height}px`
    cropBoxElement.style.width = `${width}px`
    cropBoxElement.style.transform = 'translate3d(0px, 0px, 0px)'
    imgElement.style.transform = 'translate3d(0px, 0px, 0px)'
    if (proportion) {
      infoHeightElement.innerHTML = `${Math.round(height / proportion)}`
      infoWidthElement.innerHTML = `${Math.round(width / proportion)}`
    } else {
      infoHeightElement.innerHTML = `${height}`
      infoWidthElement.innerHTML = `${width}`
    }
  }
}

export default commonSeletor
