import { getTopAndLeft } from './utils'

interface Position {
  top: number;
  left: number;
}

class MobileSelector {
  // 移动
  /**
   * 移动控制
   * @function move
   * @param {HTMLElement} moveElement 被控制的移动元素
   * @param {HTMLElement} cropBoxElement
   * @param {HTMLImageElement} imgElement
   */
  static move(
    moveElement: HTMLElement,
    cropBoxElement: HTMLElement,
    imgElement: HTMLImageElement
  ) {
    // 判断是否按下
    let isMove = false
    // 记录每次鼠标按下的起点
    const startPoint = {
      clientX: 0,
      clientY: 0
    }
    // 记录每次鼠标按下时，box的位置
    const defaultPoint = {
      clientX: 0,
      clientY: 0
    }

    function moveMove(event: Event) {
      const e = event as TouchEvent
      if (isMove) {
        // X 轴方向的移动
        let translateX = e.touches[0].clientX - startPoint.clientX + defaultPoint.clientX
        // 图片的宽度 - 当前截取的宽度
        const maxX = parseFloat(imgElement.style.width) - parseFloat(cropBoxElement.style.width)
        if (translateX > maxX) {
          translateX = maxX
        }
        if (translateX < 0) {
          translateX = 0
        }
        // X 轴方向的移动
        let translateY = e.touches[0].clientY - startPoint.clientY + defaultPoint.clientY
        // 图片的高度 - 当前截取的高度
        const maxY = parseFloat(imgElement.style.height) - parseFloat(cropBoxElement.style.height)
        if (translateY > maxY) {
          translateY = maxY
        }
        if (translateY < 0) {
          translateY = 0
        }

        // 图片反方向移动保持自身位置不变
        imgElement.style.transform = `translate3d(${-translateX}px, ${-translateY}px, 0px)`
        cropBoxElement.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px)`
      }
    }

    function moveEnd() {
      isMove = false

      window.removeEventListener('touchmove', moveMove)
      window.removeEventListener('touchend', moveEnd)
    }

    moveElement.addEventListener('touchstart', function (event: Event) {
      const e = event as TouchEvent
      const regexp = /[0-9\.-]+/g
      const transform = cropBoxElement.style.transform
      const list = transform.match(regexp)
      isMove = true
      startPoint.clientX = e.touches[0].clientX
      startPoint.clientY = e.touches[0].clientX
      if (list) {
        defaultPoint.clientX = Number(list[1])
        defaultPoint.clientY = Number(list[2])
      }

      window.addEventListener('touchmove', moveMove)
      window.addEventListener('touchend', moveEnd)
    }, { passive: true })
  }

  /**
   * 选择控制
   * @method selectArea
   * @param {HTMLElement} rangeElement
   * @param {HTMLElement} cropBoxElement
   * @param {HTMLImageElement} imgElement
   * @param {HTMLSpanElement} infoHeightElement
   * @param {HTMLSpanElement} infoWidthElement
   * @param {number} defaultAspectRatio 默认缩放比例
   */
  static selectArea(
    rangeElement: HTMLElement,
    cropBoxElement: HTMLElement,
    imgElement: HTMLImageElement,
    infoHeightElement: HTMLSpanElement,
    infoWidthElement: HTMLSpanElement,
    defaultAspectRatio: number
  ) {
    let isMove = false
    // 可选范围开始位置
    let cropBoxElementPosition: Position
    // 点击开始位置
    let startPosition: Position
    let translateX: number
    let translateY: number

    imgElement.onload = () => {
      cropBoxElementPosition = getTopAndLeft(cropBoxElement)
    }

    function selectMove(event: Event) {
      const e = event as TouchEvent
      if (isMove) {
        let currenttranslateX = translateX
        let currenttranslateY = translateY
        let currentW = e.touches[0].pageX - startPosition.left
        let currentH = e.touches[0].pageY - startPosition.top
        if (currentH < 0) {
          currentH = -currentH
          currenttranslateY = translateY - currentH
        }
        if (currentW < 0) {
          currentW = -currentW
          currenttranslateX = translateX - currentW
        }
        const maxW = parseFloat(imgElement.style.width) - currenttranslateX
        const maxH = parseFloat(imgElement.style.height) - currenttranslateY
        if (currentW > maxW || currentH > maxH) return
        if (currenttranslateX < 0 || currenttranslateY < 0) return

        imgElement.style.transform = `translate3d(${-currenttranslateX}px, ${-currenttranslateY}px, 0px)`
        cropBoxElement.style.transform = `translate3d(${currenttranslateX}px, ${currenttranslateY}px, 0px)`
        cropBoxElement.style.height = `${currentH}px`
        cropBoxElement.style.width = `${currentW}px`
        infoHeightElement.innerHTML = `${Math.round(currentH)}`
        infoWidthElement.innerHTML = `${Math.round(currentW)}`
      }
    }

    function selectEnd() {
      isMove = false

      window.addEventListener('touchmove', selectMove)
      window.addEventListener('touchend', selectEnd)
    }

    rangeElement.addEventListener('touchstart', function (event: Event) {
      const e = event as TouchEvent
      const currentPosition: Position = {
        top: e.touches[0].pageY,
        left: e.touches[0].pageX
      }
      if (MobileSelector.isInRange(cropBoxElementPosition, currentPosition)) {
        isMove = true
        startPosition = currentPosition
        translateX = currentPosition.left - cropBoxElementPosition.left
        translateY = currentPosition.top - cropBoxElementPosition.top

        window.addEventListener('touchmove', selectMove)
        window.addEventListener('touchend', selectEnd)
      }
    }, { passive: true })
  }

  /**
   * 判断点击点是否在某个范围内
   * @param {Position} range
   * @param {Position} current
   */
  private static isInRange(range: Position, current: Position) {
    if (current.left < range.left) return false
    if (current.top < range.top) return false
    return true
  }
}

export default MobileSelector
