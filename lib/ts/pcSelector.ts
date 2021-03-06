import { getTopAndLeft } from './utils'

interface Position {
  top: number;
  left: number;
}

class PCSelector {
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
      const e = event as MouseEvent
      if (isMove) {
        // X 轴方向的移动
        let translateX = e.clientX - startPoint.clientX + defaultPoint.clientX
        // 图片的宽度 - 当前截取的宽度
        const maxX = parseFloat(imgElement.style.width) - parseFloat(cropBoxElement.style.width)
        if (translateX > maxX) {
          translateX = maxX
        }
        if (translateX < 0) {
          translateX = 0
        }
        // X 轴方向的移动
        let translateY = e.clientY - startPoint.clientY + defaultPoint.clientY
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

    function moveUp() {
      isMove = false

      window.removeEventListener('mousemove', moveMove)
      window.removeEventListener('mouseup', moveUp)
    }

    moveElement.addEventListener('mousedown', function (event: Event) {
      const e = event as MouseEvent
      const regexp = /[0-9\.-]+/g
      const transform = cropBoxElement.style.transform
      const list = transform.match(regexp)
      isMove = true
      startPoint.clientX = e.clientX
      startPoint.clientY = e.clientY
      if (list) {
        defaultPoint.clientX = Number(list[1])
        defaultPoint.clientY = Number(list[2])
      }

      window.addEventListener('mousemove', moveMove)
      window.addEventListener('mouseup', moveUp)
    })
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
    defaultAspectRatio: number,
    proportion?: number
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
      const e = event as MouseEvent
      if (isMove) {
        let currenttranslateX = translateX
        let currenttranslateY = translateY
        let currentW = e.pageX - startPosition.left
        let currentH = e.pageY - startPosition.top
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
        if (proportion) {
          infoHeightElement.innerHTML = `${Math.round(currentH / proportion)}`
          infoWidthElement.innerHTML = `${Math.round(currentW / proportion)}`
        } else {
          infoHeightElement.innerHTML = `${Math.round(currentH)}`
          infoWidthElement.innerHTML = `${Math.round(currentW)}`
        }
      }
    }

    function selectUp() {
      isMove = false

      window.addEventListener('mousemove', selectMove)
      window.addEventListener('mouseup', selectUp)
    }

    rangeElement.addEventListener('mousedown', function (event: Event) {
      const e = event as MouseEvent
      const currentPosition: Position = {
        top: e.pageY,
        left: e.pageX
      }
      if (PCSelector.isInRange(cropBoxElementPosition, currentPosition)) {
        isMove = true
        startPosition = currentPosition
        translateX = currentPosition.left - cropBoxElementPosition.left
        translateY = currentPosition.top - cropBoxElementPosition.top

        window.addEventListener('mousemove', selectMove)
        window.addEventListener('mouseup', selectUp)
      }
    })
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

    function lineAndPointTopUp() {
      isMove = false

      window.removeEventListener('mouseup', lineAndPointTopUp)
      window.removeEventListener('mousemove', lineAndPointTopMove)
    }

    function lineAndPointTopMove(event: Event) {
      const e = event as MouseEvent
      if (isMove) {
        const moveY = -(e.clientY - startY)
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

    targetElement.addEventListener('mousedown', function (e) {
      const regexp = /[0-9\.-]+/g
      const transform = cropBoxElement.style.transform
      const list = transform.match(regexp)
      isMove = true
      startY = e.clientY
      if (list) {
        defaultPoint.clientX = Number(list[1])
        defaultPoint.clientY = Number(list[2])
      }
      startHeight = parseFloat(cropBoxElement.style.height)

      window.addEventListener('mouseup', lineAndPointTopUp)
      window.addEventListener('mousemove', lineAndPointTopMove)
    })
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

    function lineAndPointBottomUp() {
      isMove = false

      window.removeEventListener('mouseup', lineAndPointBottomUp)
      window.removeEventListener('mousemove', lineAndPointBottomMove)
    }

    function lineAndPointBottomMove(event: Event) {
      const e = event as MouseEvent
      if (isMove) {
        const moveY = -(e.clientY - startY)
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

    targetElement.addEventListener('mousedown', function (e) {
      const regexp = /[0-9\.-]+/g
      const transform = cropBoxElement.style.transform
      const list = transform.match(regexp)
      isMove = true
      startY = e.clientY
      if (list) {
        defaultPoint.clientX = Number(list[1])
        defaultPoint.clientY = Number(list[2])
      }
      startHeight = parseFloat(cropBoxElement.style.height)

      window.addEventListener('mouseup', lineAndPointBottomUp)
      window.addEventListener('mousemove', lineAndPointBottomMove)
    })
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

    function lineAndPointLeftUp() {
      isMove = false

      window.removeEventListener('mouseup', lineAndPointLeftUp)
      window.removeEventListener('mousemove', lineAndPointLeftMove)
    }

    function lineAndPointLeftMove(event: Event) {
      const e = event as MouseEvent
      if (isMove) {
        const moveX = -(e.clientX - startX)
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

    targetElement.addEventListener('mousedown', function (e) {
      const regexp = /[0-9\.-]+/g
      const transform = cropBoxElement.style.transform
      const list = transform.match(regexp)
      isMove = true
      startX = e.clientX
      if (list) {
        defaultPoint.clientX = Number(list[1])
        defaultPoint.clientY = Number(list[2])
      }
      startWidth = parseFloat(cropBoxElement.style.width)

      window.addEventListener('mouseup', lineAndPointLeftUp)
      window.addEventListener('mousemove', lineAndPointLeftMove)
    })
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

    function lineAndPointRightUp() {
      isMove = false

      window.removeEventListener('mouseup', lineAndPointRightUp)
      window.removeEventListener('mousemove', lineAndPointRightMove)
    }

    function lineAndPointRightMove(event: Event) {
      const e = event as MouseEvent
      if (isMove) {
        const moveX = -(e.clientX - startX)
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

    targetElement.addEventListener('mousedown', function (e) {
      const regexp = /[0-9\.-]+/g
      const transform = cropBoxElement.style.transform
      const list = transform.match(regexp)
      isMove = true
      startX = e.clientX
      if (list) {
        defaultPoint.clientX = Number(list[1])
        defaultPoint.clientY = Number(list[2])
      }
      startWidth = parseFloat(cropBoxElement.style.width)

      window.addEventListener('mouseup', lineAndPointRightUp)
      window.addEventListener('mousemove', lineAndPointRightMove)
    })
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

    function pointLeftAndTopUp() {
      isMove = false

      window.removeEventListener('mouseup', pointLeftAndTopUp)
      window.removeEventListener('mousemove', pointLeftAndTopMove)
    }

    function pointLeftAndTopMove(event: Event) {
      const e = event as MouseEvent
      if (isMove) {
        let moveY: number
        let moveX: number
        moveY = -(e.clientY - startY)
        moveX = -(e.clientX - startX)
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

    targetElement.addEventListener('mousedown', function (e) {
      const regexp = /[0-9\.-]+/g
      const transform = cropBoxElement.style.transform
      const list = transform.match(regexp)
      isMove = true
      startX = e.clientX
      startY = e.clientY
      if (list) {
        defaultPoint.clientX = Number(list[1])
        defaultPoint.clientY = Number(list[2])
      }
      startHeight = parseFloat(cropBoxElement.style.height)
      startWidth = parseFloat(cropBoxElement.style.width)
      aspectRatio = defaultAspectRatio || startWidth / startHeight

      window.addEventListener('mouseup', pointLeftAndTopUp)
      window.addEventListener('mousemove', pointLeftAndTopMove)
    })
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

    function pointRightAndTopUp() {
      isMove = false

      window.removeEventListener('mouseup', pointRightAndTopUp)
      window.removeEventListener('mousemove', pointRightAndTopMove)
    }

    function pointRightAndTopMove(event: Event) {
      const e = event as MouseEvent
      if (isMove) {
        const moveY = -(e.clientY - startY)
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

    targetElement.addEventListener('mousedown', function (e) {
      const regexp = /[0-9\.-]+/g
      const transform = cropBoxElement.style.transform
      const list = transform.match(regexp)
      isMove = true
      startY = e.clientY
      if (list) {
        defaultPoint.clientX = Number(list[1])
        defaultPoint.clientY = Number(list[2])
      }
      startHeight = parseFloat(cropBoxElement.style.height)
      startWidth = parseFloat(cropBoxElement.style.width)
      aspectRatio = defaultAspectRatio || startWidth / startHeight

      window.addEventListener('mouseup', pointRightAndTopUp)
      window.addEventListener('mousemove', pointRightAndTopMove)
    })
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

    function pointLeftAndBottomUp() {
      isMove = false

      window.removeEventListener('mouseup', pointLeftAndBottomUp)
      window.removeEventListener('mousemove', pointLeftAndBottomMove)
    }

    function pointLeftAndBottomMove(event: Event) {
      const e = event as MouseEvent
      if (isMove) {
        const moveY = e.clientY - startY
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

    targetElement.addEventListener('mousedown', function (e) {
      const regexp = /[0-9\.-]+/g
      const transform = cropBoxElement.style.transform
      const list = transform.match(regexp)
      isMove = true
      startY = e.clientY
      if (list) {
        defaultPoint.clientX = Number(list[1])
        defaultPoint.clientY = Number(list[2])
      }
      startHeight = parseFloat(cropBoxElement.style.height)
      startWidth = parseFloat(cropBoxElement.style.width)
      aspectRatio = defaultAspectRatio || startWidth / startHeight

      window.addEventListener('mouseup', pointLeftAndBottomUp)
      window.addEventListener('mousemove', pointLeftAndBottomMove)
    })
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

    function pointRightAndBottomUp() {
      isMove = false

      window.removeEventListener('mouseup', pointRightAndBottomUp)
      window.removeEventListener('mousemove', pointRightAndBottomMove)
    }

    function pointRightAndBottomMove(event: Event) {
      const e = event as MouseEvent
      if (isMove) {
        let moveX: number
        let moveY: number
        moveY = e.clientY - startY
        moveX = e.clientX - startX
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

    targetElement.addEventListener('mousedown', function (e) {
      const regexp = /[0-9\.-]+/g
      const transform = cropBoxElement.style.transform
      const list = transform.match(regexp)
      isMove = true
      startX = e.clientX
      startY = e.clientY
      if (list) {
        defaultPoint.clientX = Number(list[1])
        defaultPoint.clientY = Number(list[2])
      }
      startHeight = parseFloat(cropBoxElement.style.height)
      startWidth = parseFloat(cropBoxElement.style.width)
      aspectRatio = defaultAspectRatio || startWidth / startHeight

      window.addEventListener('mouseup', pointRightAndBottomUp)
      window.addEventListener('mousemove', pointRightAndBottomMove)
    })
  }
}

export default PCSelector
