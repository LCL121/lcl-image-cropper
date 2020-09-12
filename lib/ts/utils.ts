export const createElement = (name: string, classes?: string[]): HTMLElement => {
  const elem = document.createElement(name)
  if (classes) {
    for (const item of classes) {
      elem.classList.add(item)
    }
  }
  return elem
}

export const getTopAndLeft = (element: HTMLElement | null) => {
  let top = 0
  let left = 0
  while (element) {
    top += element.offsetTop
    left += element.offsetLeft
    element = element.parentElement
  }
  return {
    top,
    left
  }
}
