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
      startPoint.clientY = e.touches[0].clientY
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

    imgElement.addEventListener('load', () => {
      cropBoxElementPosition = getTopAndLeft(cropBoxElement)
    })

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

  // 向上的线和点
  /**
   * 向上移动控制
   * @function lineAndPointTop
   * @param {HTMLElement} targetElement 被控制的元素
   * @param {HTMLElement} cropBoxElement
   * @param {HTMLImageElement} imgElement
   * @param {HTMLSpanElement} infoHeightElement
   * @param {number} MIN_W_H 最小的宽高
   */
  static lineAndPointTop(
    targetElement: HTMLElement,
    cropBoxElement: HTMLElement,
    imgElement: HTMLImageElement,
    infoHeightElement: HTMLSpanElement,
    MIN_W_H: number = 20,
    proportion?: number
  ) {
    let isMove = false
    let startY: number
    const defaultPoint = {
      clientX: 0,
      clientY: 0
    }
    let startHeight: number

    function lineAndPointTopEnd() {
      isMove = false

      window.removeEventListener('touchend', lineAndPointTopEnd)
      window.removeEventListener('touchmove', lineAndPointTopMove)
    }

    function lineAndPointTopMove(event: Event) {
      const e = event as TouchEvent
      if (isMove) {
        const moveY = -(e.touches[0].clientY - startY)
        let currentH = moveY + startHeight
        const imgH = parseFloat(imgElement.style.height)
        const maxY = imgH - parseFloat(cropBoxElement.style.height)
        const translateX = defaultPoint.clientX
        const translateY = defaultPoint.clientY - moveY
        if (currentH > imgH - translateY) currentH = imgH - translateY
        if ((translateY >= 0 && translateY <= maxY && currentH >= MIN_W_H) || (currentH < startHeight && currentH >= MIN_W_H)) {
          imgElement.style.transform = `translate3d(${-translateX}px, ${-translateY}px, 0px)`
          cropBoxElement.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px)`
          cropBoxElement.style.height = `${currentH}px`
          if (proportion) {
            infoHeightElement.innerHTML = `${Math.round(currentH / proportion)}`
          } else {
            infoHeightElement.innerHTML = `${Math.round(currentH)}`
          }
        }
      }
    }

    targetElement.addEventListener('touchstart', function (e) {
      const regexp = /[0-9\.-]+/g
      const transform = cropBoxElement.style.transform
      const list = transform.match(regexp)
      isMove = true
      startY = e.touches[0].clientY
      if (list) {
        defaultPoint.clientX = Number(list[1])
        defaultPoint.clientY = Number(list[2])
      }
      startHeight = parseFloat(cropBoxElement.style.height)

      window.addEventListener('touchend', lineAndPointTopEnd)
      window.addEventListener('touchmove', lineAndPointTopMove)
    }, { passive: true })
  }

  // 向下的线和点
  /**
   * 向下移动控制
   * @function lineAndPointBottom
   * @param {HTMLElement} targetElement 被控制的元素
   * @param {HTMLElement} cropBoxElement
   * @param {HTMLImageElement} imgElement
   * @param {HTMLSpanElement} infoHeightElement
   * @param {number} MIN_W_H 最小的宽高
   */
  static lineAndPointBottom(
    targetElement: HTMLElement,
    cropBoxElement: HTMLElement,
    imgElement: HTMLImageElement,
    infoHeightElement: HTMLSpanElement,
    MIN_W_H: number = 20,
    proportion?: number
  ) {
    let isMove = false
    let startY: number
    const defaultPoint = {
      clientX: 0,
      clientY: 0
    }
    let startHeight: number

    function lineAndPointBottomEnd() {
      isMove = false

      window.removeEventListener('touchend', lineAndPointBottomEnd)
      window.removeEventListener('touchmove', lineAndPointBottomMove)
    }

    function lineAndPointBottomMove(event: Event) {
      const e = event as TouchEvent
      if (isMove) {
        const moveY = -(e.touches[0].clientY - startY)
        let currentH = startHeight - moveY
        const imgH = parseFloat(imgElement.style.height)
        const translateY = defaultPoint.clientY
        if (currentH > imgH - translateY) currentH = imgH - translateY
        if (imgH - translateY >= currentH && currentH >= MIN_W_H) {
          cropBoxElement.style.height = `${currentH}px`
          if (proportion) {
            infoHeightElement.innerHTML = `${Math.round(currentH / proportion)}`
          } else {
            infoHeightElement.innerHTML = `${Math.round(currentH)}`
          }
        }
      }
    }

    targetElement.addEventListener('touchstart', function (e) {
      const regexp = /[0-9\.-]+/g
      const transform = cropBoxElement.style.transform
      const list = transform.match(regexp)
      isMove = true
      startY = e.touches[0].clientY
      if (list) {
        defaultPoint.clientX = Number(list[1])
        defaultPoint.clientY = Number(list[2])
      }
      startHeight = parseFloat(cropBoxElement.style.height)

      window.addEventListener('touchend', lineAndPointBottomEnd)
      window.addEventListener('touchmove', lineAndPointBottomMove)
    }, { passive: true })
  }

  // 向左的线和点
  /**
   * 向左移动控制
   * @function lineAndPointLeft
   * @param {HTMLElement} targetElement 被控制的元素
   * @param {HTMLElement} cropBoxElement
   * @param {HTMLImageElement} imgElement
   * @param {HTMLSpanElement} infoWidthElement
   * @param {number} MIN_W_H 最小的宽高
   */
  static lineAndPointLeft(
    targetElement: HTMLElement,
    cropBoxElement: HTMLElement,
    imgElement: HTMLImageElement,
    infoWidthElement: HTMLSpanElement,
    MIN_W_H: number = 20,
    proportion?: number
  ) {
    let isMove = false
    let startX: number
    const defaultPoint = {
      clientX: 0,
      clientY: 0
    }
    let startWidth: number

    function lineAndPointLeftEnd() {
      isMove = false

      window.removeEventListener('touchend', lineAndPointLeftEnd)
      window.removeEventListener('touchmove', lineAndPointLeftMove)
    }

    function lineAndPointLeftMove(event: Event) {
      const e = event as TouchEvent
      if (isMove) {
        const moveX = -(e.touches[0].clientX - startX)
        let currentW = moveX + startWidth
        const imgW = parseFloat(imgElement.style.width)
        const maxX = imgW - parseFloat(cropBoxElement.style.width)
        const translateX = defaultPoint.clientX - moveX
        const translateY = defaultPoint.clientY
        if (currentW > imgW - translateX) currentW = imgW - translateX
        if ((translateX >= 0 && translateX <= maxX && currentW >= MIN_W_H) || (currentW < startWidth && currentW >= MIN_W_H)) {
          imgElement.style.transform = `translate3d(${-translateX}px, ${-translateY}px, 0px)`
          cropBoxElement.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px)`
          cropBoxElement.style.width = `${currentW}px`
          if (proportion) {
            infoWidthElement.innerHTML = `${Math.round(currentW / proportion)}`
          } else {
            infoWidthElement.innerHTML = `${Math.round(currentW)}`
          }
        }
      }
    }

    targetElement.addEventListener('touchstart', function (e) {
      const regexp = /[0-9\.-]+/g
      const transform = cropBoxElement.style.transform
      const list = transform.match(regexp)
      isMove = true
      startX = e.touches[0].clientX
      if (list) {
        defaultPoint.clientX = Number(list[1])
        defaultPoint.clientY = Number(list[2])
      }
      startWidth = parseFloat(cropBoxElement.style.width)

      window.addEventListener('touchend', lineAndPointLeftEnd)
      window.addEventListener('touchmove', lineAndPointLeftMove)
    }, { passive: true })
  }

  // 向右的线和点
  /**
   * 向右移动控制
   * @function lineAndPointRight
   * @param {HTMLElement} targetElement 被控制的元素
   * @param {HTMLElement} cropBoxElement
   * @param {HTMLImageElement} imgElement
   * @param {HTMLSpanElement} infoWidthElement
   * @param {number} MIN_W_H 最小的宽高
   */
  static lineAndPointRight(
    targetElement: HTMLElement,
    cropBoxElement: HTMLElement,
    imgElement: HTMLImageElement,
    infoWidthElement: HTMLSpanElement,
    MIN_W_H: number = 20,
    proportion?: number
  ) {
    let isMove = false
    let startX: number
    const defaultPoint = {
      clientX: 0,
      clientY: 0
    }
    let startWidth: number

    function lineAndPointRightEnd() {
      isMove = false

      window.removeEventListener('touchend', lineAndPointRightEnd)
      window.removeEventListener('touchmove', lineAndPointRightMove)
    }

    function lineAndPointRightMove(event: Event) {
      const e = event as TouchEvent
      if (isMove) {
        const moveX = -(e.touches[0].clientX - startX)
        let currentW = startWidth - moveX
        const imgW = parseFloat(imgElement.style.width)
        const translateX = defaultPoint.clientX
        if (currentW > imgW - translateX) currentW = imgW - translateX
        if (imgW - translateX >= currentW && currentW >= MIN_W_H) {
          cropBoxElement.style.width = `${currentW}px`
          if (proportion) {
            infoWidthElement.innerHTML = `${Math.round(currentW / proportion)}`
          } else {
            infoWidthElement.innerHTML = `${Math.round(currentW)}`
          }
        }
      }
    }

    targetElement.addEventListener('touchstart', function (e) {
      const regexp = /[0-9\.-]+/g
      const transform = cropBoxElement.style.transform
      const list = transform.match(regexp)
      isMove = true
      startX = e.touches[0].clientX
      if (list) {
        defaultPoint.clientX = Number(list[1])
        defaultPoint.clientY = Number(list[2])
      }
      startWidth = parseFloat(cropBoxElement.style.width)

      window.addEventListener('touchend', lineAndPointRightEnd)
      window.addEventListener('touchmove', lineAndPointRightMove)
    }, { passive: true })
  }

  // 向左上的点
  /**
   * 向左上移动控制
   * @function pointLeftAndTop
   * @param targetElement 被控制的元素
   * @param cropBoxElement
   * @param imgElement
   * @param infoWidthElement
   * @param infoHeightElement
   * @param {number} defaultAspectRatio 默认缩放比例
   * @param MIN_W_H 最小的宽高
   */
  static pointLeftAndTop(
    targetElement: HTMLElement,
    cropBoxElement: HTMLElement,
    imgElement: HTMLImageElement,
    infoWidthElement: HTMLSpanElement,
    infoHeightElement: HTMLSpanElement,
    defaultAspectRatio: number,
    MIN_W_H: number = 20,
    proportion?: number
  ) {
    let isMove = false
    let startY: number
    let startX: number
    const defaultPoint = {
      clientX: 0,
      clientY: 0
    }
    let startHeight: number
    let startWidth: number
    let aspectRatio: number

    function pointLeftAndTopEnd() {
      isMove = false

      window.removeEventListener('touchend', pointLeftAndTopEnd)
      window.removeEventListener('touchmove', pointLeftAndTopMove)
    }

    function pointLeftAndTopMove(event: Event) {
      const e = event as TouchEvent
      if (isMove) {
        let moveY: number
        let moveX: number
        moveY = -(e.touches[0].clientY - startY)
        moveX = -(e.touches[0].clientX - startX)
        if (Math.abs(moveY) > Math.abs(moveX)) {
          moveX = moveY * aspectRatio
        } else {
          moveY = moveX / aspectRatio
          moveX = moveY * aspectRatio
        }
        const currentH = moveY + startHeight
        const currentW = moveX + startWidth
        const imgW = parseFloat(imgElement.style.width)
        const imgH = parseFloat(imgElement.style.height)
        const maxX = imgW - parseFloat(cropBoxElement.style.width)
        const maxY = imgH - parseFloat(cropBoxElement.style.height)
        const translateX = defaultPoint.clientX - moveX
        const translateY = defaultPoint.clientY - moveY
        if (currentH > imgH - translateY) return
        if (currentW > imgW - translateX) return
        if (
          (translateY >= 0 && translateY <= maxY && currentH >= MIN_W_H &&
            translateX >= 0 && translateX <= maxX && currentW >= MIN_W_H) ||
          (currentH < startHeight && currentH >= MIN_W_H &&
            currentW < startWidth && currentW >= MIN_W_H)
        ) {
          imgElement.style.transform = `translate3d(${-translateX}px, ${-translateY}px, 0px)`
          cropBoxElement.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px)`
          cropBoxElement.style.height = `${currentH}px`
          cropBoxElement.style.width = `${currentW}px`
          if (proportion) {
            infoHeightElement.innerHTML = `${Math.round(currentH / proportion)}`
            infoWidthElement.innerHTML = `${Math.round(currentW / proportion)}`
          } else {
            infoHeightElement.innerHTML = `${Math.round(currentH)}`
            infoWidthElement.innerHTML = `${Math.round(currentW)}`
          }
        }
      }
    }

    targetElement.addEventListener('touchstart', function (e) {
      const regexp = /[0-9\.-]+/g
      const transform = cropBoxElement.style.transform
      const list = transform.match(regexp)
      isMove = true
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      if (list) {
        defaultPoint.clientX = Number(list[1])
        defaultPoint.clientY = Number(list[2])
      }
      startHeight = parseFloat(cropBoxElement.style.height)
      startWidth = parseFloat(cropBoxElement.style.width)
      aspectRatio = defaultAspectRatio || startWidth / startHeight

      window.addEventListener('touchend', pointLeftAndTopEnd)
      window.addEventListener('touchmove', pointLeftAndTopMove)
    }, { passive: true })
  }

  // 向右上的点
  /**
   * 向右上移动控制
   * @function pointRightAndTop
   * @param targetElement 被控制的元素
   * @param cropBoxElement
   * @param imgElement
   * @param infoWidthElement
   * @param infoHeightElement
   * @param {number} defaultAspectRatio 默认缩放比例
   * @param MIN_W_H 最小的宽高
   */
  static pointRightAndTop(
    targetElement: HTMLElement,
    cropBoxElement: HTMLElement,
    imgElement: HTMLImageElement,
    infoWidthElement: HTMLSpanElement,
    infoHeightElement: HTMLSpanElement,
    defaultAspectRatio: number,
    MIN_W_H: number = 20,
    proportion?: number
  ) {
    let isMove = false
    let startY: number
    const defaultPoint = {
      clientX: 0,
      clientY: 0
    }
    let startHeight: number
    let startWidth: number
    let aspectRatio: number

    function pointRightAndTopEnd() {
      isMove = false

      window.removeEventListener('touchend', pointRightAndTopEnd)
      window.removeEventListener('touchmove', pointRightAndTopMove)
    }

    function pointRightAndTopMove(event: Event) {
      const e = event as TouchEvent
      if (isMove) {
        const moveY = -(e.touches[0].clientY - startY)
        const moveX = moveY * aspectRatio
        const currentH = moveY + startHeight
        const currentW = moveX + startWidth
        const imgW = parseFloat(imgElement.style.width)
        const imgH = parseFloat(imgElement.style.height)
        const maxX = imgW - parseFloat(cropBoxElement.style.width)
        const maxY = imgH - parseFloat(cropBoxElement.style.height)
        const translateX = defaultPoint.clientX
        const translateY = defaultPoint.clientY - moveY
        if (currentH > imgH - translateY) return
        if (currentW > imgW - translateX) return
        if (
          (translateY >= 0 && translateY <= maxY && currentH >= MIN_W_H &&
            translateX >= 0 && translateX <= maxX && currentW >= MIN_W_H) ||
          (currentH < startHeight && currentH >= MIN_W_H &&
            currentW < startWidth && currentW >= MIN_W_H)
        ) {
          imgElement.style.transform = `translate3d(${-translateX}px, ${-translateY}px, 0px)`
          cropBoxElement.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px)`
          cropBoxElement.style.height = `${currentH}px`
          cropBoxElement.style.width = `${currentW}px`
          if (proportion) {
            infoHeightElement.innerHTML = `${Math.round(currentH / proportion)}`
            infoWidthElement.innerHTML = `${Math.round(currentW / proportion)}`
          } else {
            infoHeightElement.innerHTML = `${Math.round(currentH)}`
            infoWidthElement.innerHTML = `${Math.round(currentW)}`
          }
        }
      }
    }

    targetElement.addEventListener('touchstart', function (e) {
      const regexp = /[0-9\.-]+/g
      const transform = cropBoxElement.style.transform
      const list = transform.match(regexp)
      isMove = true
      startY = e.touches[0].clientY
      if (list) {
        defaultPoint.clientX = Number(list[1])
        defaultPoint.clientY = Number(list[2])
      }
      startHeight = parseFloat(cropBoxElement.style.height)
      startWidth = parseFloat(cropBoxElement.style.width)
      aspectRatio = defaultAspectRatio || startWidth / startHeight

      window.addEventListener('touchend', pointRightAndTopEnd)
      window.addEventListener('touchmove', pointRightAndTopMove)
    }, { passive: true })
  }

  // 向左下的点
  /**
   * 向左下移动控制
   * @function pointLeftAndBottom
   * @param targetElement 被控制的元素
   * @param cropBoxElement
   * @param imgElement
   * @param infoWidthElement
   * @param infoHeightElement
   * @param {number} defaultAspectRatio 默认缩放比例
   * @param MIN_W_H 最小的宽高
   */
  static pointLeftAndBottom(
    targetElement: HTMLElement,
    cropBoxElement: HTMLElement,
    imgElement: HTMLImageElement,
    infoWidthElement: HTMLSpanElement,
    infoHeightElement: HTMLSpanElement,
    defaultAspectRatio: number,
    MIN_W_H: number = 20,
    proportion?: number
  ) {
    let isMove = false
    let startY: number
    const defaultPoint = {
      clientX: 0,
      clientY: 0
    }
    let startHeight: number
    let startWidth: number
    let aspectRatio: number

    function pointLeftAndBottomEnd() {
      isMove = false

      window.removeEventListener('touchend', pointLeftAndBottomEnd)
      window.removeEventListener('touchmove', pointLeftAndBottomMove)
    }

    function pointLeftAndBottomMove(event: Event) {
      const e = event as TouchEvent
      if (isMove) {
        const moveY = e.touches[0].clientY - startY
        const moveX = moveY * aspectRatio
        const currentH = moveY + startHeight
        const currentW = moveX + startWidth
        const imgW = parseFloat(imgElement.style.width)
        const imgH = parseFloat(imgElement.style.height)
        const maxX = imgW - parseFloat(cropBoxElement.style.width)
        const maxY = imgH - parseFloat(cropBoxElement.style.height)
        const translateX = defaultPoint.clientX - moveX
        const translateY = defaultPoint.clientY
        if (currentH > imgH - translateY) return
        if (currentW > imgW - translateX) return
        if (
          (translateY >= 0 && translateY <= maxY && currentH >= MIN_W_H &&
            translateX >= 0 && translateX <= maxX && currentW >= MIN_W_H) ||
          (currentH < startHeight && currentH >= MIN_W_H &&
            currentW < startWidth && currentW >= MIN_W_H)
        ) {
          imgElement.style.transform = `translate3d(${-translateX}px, ${-translateY}px, 0px)`
          cropBoxElement.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px)`
          cropBoxElement.style.height = `${currentH}px`
          cropBoxElement.style.width = `${currentW}px`
          if (proportion) {
            infoHeightElement.innerHTML = `${Math.round(currentH / proportion)}`
            infoWidthElement.innerHTML = `${Math.round(currentW / proportion)}`
          } else {
            infoHeightElement.innerHTML = `${Math.round(currentH)}`
            infoWidthElement.innerHTML = `${Math.round(currentW)}`
          }
        }
      }
    }

    targetElement.addEventListener('touchstart', function (e) {
      const regexp = /[0-9\.-]+/g
      const transform = cropBoxElement.style.transform
      const list = transform.match(regexp)
      isMove = true
      startY = e.touches[0].clientY
      if (list) {
        defaultPoint.clientX = Number(list[1])
        defaultPoint.clientY = Number(list[2])
      }
      startHeight = parseFloat(cropBoxElement.style.height)
      startWidth = parseFloat(cropBoxElement.style.width)
      aspectRatio = defaultAspectRatio || startWidth / startHeight

      window.addEventListener('touchend', pointLeftAndBottomEnd)
      window.addEventListener('touchmove', pointLeftAndBottomMove)
    }, { passive: true })
  }

  // 向右下的点
  /**
   * 向右下移动控制
   * @function pointRightAndBottom
   * @param targetElement 被控制的元素
   * @param cropBoxElement
   * @param imgElement
   * @param infoWidthElement
   * @param infoHeightElement
   * @param {number} defaultAspectRatio 默认缩放比例
   * @param MIN_W_H 最小的宽高
   */
  static pointRightAndBottom(
    targetElement: HTMLElement,
    cropBoxElement: HTMLElement,
    imgElement: HTMLImageElement,
    infoWidthElement: HTMLSpanElement,
    infoHeightElement: HTMLSpanElement,
    defaultAspectRatio: number,
    MIN_W_H: number = 20,
    proportion?: number
  ) {
    let isMove = false
    let startX: number
    let startY: number
    const defaultPoint = {
      clientX: 0,
      clientY: 0
    }
    let startHeight: number
    let startWidth: number
    let aspectRatio: number

    function pointRightAndBottomEnd() {
      isMove = false

      window.removeEventListener('touchend', pointRightAndBottomEnd)
      window.removeEventListener('touchmove', pointRightAndBottomMove)
    }

    function pointRightAndBottomMove(event: Event) {
      const e = event as TouchEvent
      if (isMove) {
        let moveX: number
        let moveY: number
        moveY = e.touches[0].clientY - startY
        moveX = e.touches[0].clientX - startX
        if (Math.abs(moveY) > Math.abs(moveX)) {
          moveX = moveY * aspectRatio
        } else {
          moveY = moveX / aspectRatio
          moveX = moveY * aspectRatio
        }
        const currentH = moveY + startHeight
        const currentW = moveX + startWidth
        const imgW = parseFloat(imgElement.style.width)
        const imgH = parseFloat(imgElement.style.height)
        const maxX = imgW - parseFloat(cropBoxElement.style.width)
        const maxY = imgH - parseFloat(cropBoxElement.style.height)
        const translateX = defaultPoint.clientX
        const translateY = defaultPoint.clientY
        if (currentH > imgH - translateY) return
        if (currentW > imgW - translateX) return
        if (
          (translateY >= 0 && translateY <= maxY && currentH >= MIN_W_H &&
            translateX >= 0 && translateX <= maxX && currentW >= MIN_W_H) ||
          (currentH < startHeight && currentH >= MIN_W_H &&
            currentW < startWidth && currentW >= MIN_W_H)
        ) {
          imgElement.style.transform = `translate3d(${-translateX}px, ${-translateY}px, 0px)`
          cropBoxElement.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px)`
          cropBoxElement.style.height = `${currentH}px`
          cropBoxElement.style.width = `${currentW}px`
          if (proportion) {
            infoHeightElement.innerHTML = `${Math.round(currentH / proportion)}`
            infoWidthElement.innerHTML = `${Math.round(currentW / proportion)}`
          } else {
            infoHeightElement.innerHTML = `${Math.round(currentH)}`
            infoWidthElement.innerHTML = `${Math.round(currentW)}`
          }
        }
      }
    }

    targetElement.addEventListener('touchstart', function (e) {
      const regexp = /[0-9\.-]+/g
      const transform = cropBoxElement.style.transform
      const list = transform.match(regexp)
      isMove = true
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      if (list) {
        defaultPoint.clientX = Number(list[1])
        defaultPoint.clientY = Number(list[2])
      }
      startHeight = parseFloat(cropBoxElement.style.height)
      startWidth = parseFloat(cropBoxElement.style.width)
      aspectRatio = defaultAspectRatio || startWidth / startHeight

      window.addEventListener('touchend', pointRightAndBottomEnd)
      window.addEventListener('touchmove', pointRightAndBottomMove)
    }, { passive: true })
  }
}

export default MobileSelector
