import CropMain from './ts/createElement/cropMain'
import PCSelector from './ts/pcSelector'
import MobileSelector from './ts/mobileSelector'
import CommonSeletor from './ts/commonSeletor'

// import './assets/css/reset.css'
import './assets/scss/main.scss'

/**
 * @class LCLImageCropper
 * @classdesc 创建 LCLImageCropper 对象
 */
class LCLImageCropper {
  private cropMain: CropMain;
  // 记录输出图片的宽高
  private resultWidth: number|'auto';
  private resultHeight: number|'auto';
  private fileType?: string;
  private fileName?: string;
  private blobUrl?: string;
  private proportion?: number;

  /**
   * 类初始化
   * @constructor
   * @param {HTMLElement} rootElemet 插件插入的节点
   * @param {string|File} imgSrc 图片来源
   * @param {number} resultWidth 输出图片的宽度
   * @param {number} resultHeight 输出图片的高度
   * @param {Boolean} pcIsZoomFree pc端是否自由缩放 默认值为 true
   * @param {Boolean} mobileIsZoomFree mobile端是否自由缩放 默认值为 true
   * @param {number|undefined} startWidth 初始显示的宽度，默认使用图片的一半宽度显示
   * @param {number|undefined} startHeight 初始显示的高度， 默认使用图片的一半高度显示
   * @param {string|undefined} fileType 输出图片的类型，默认使用原图片类型或image/jpeg，用于压缩
   * @param {string|undefined} fileName 输出的图片的名字，用于自动下载
   * @param {number} minWH 最小宽高 默认值为 20px
   */
  constructor(
    rootElemet: HTMLElement,
    imgSrc: string | File,
    resultWidth: number|'auto' = 'auto',
    resultHeight: number|'auto' = 'auto',
    pcIsZoomFree: Boolean = true,
    mobileIsZoomFree: Boolean = true,
    minWH: number = 20,
    startWidth?: number,
    startHeight?: number,
    fileType?: string,
    fileName?: string
  ) {
    this.resultWidth = resultWidth
    this.resultHeight = resultHeight
    this.fileType = fileType
    this.fileName = fileName
    this.cropMain = new CropMain(
      (width: number, height: number) => {
        if (startHeight) height = startHeight
        if (startWidth) width = startWidth
        this.bindEvent(minWH, pcIsZoomFree, mobileIsZoomFree, width / height, this.cropMain.getProportion())
      },
      startWidth,
      startHeight
    )

    if (imgSrc instanceof File) {
      if (!fileType) this.fileType = imgSrc.type
      if (!fileName) this.fileName = imgSrc.name
      const reader = new FileReader()
      reader.readAsDataURL(imgSrc)
      // 文件base64化，以便获知图片原始尺寸
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          this.cropMain.cropBottomBox.img.src = e.target.result as string
          this.cropMain.cropBox.cropBoxImgObj.img.src = e.target.result as string
          // 取消height的固定，使得加载完毕之后可以获取原尺寸（不然是获取到受style影响的尺寸）
          this.cropMain.cropBottomBox.cropBottomBoxMain.style.height = ''
          rootElemet.append(this.cropMain.cropMainMain)
        }
      }
    } else {
      this.cropMain.cropBottomBox.img.src = imgSrc
      this.cropMain.cropBox.cropBoxImgObj.img.src = imgSrc
      // 取消height的固定，使得加载完毕之后可以获取原尺寸（不然是获取到受style影响的尺寸）
      this.cropMain.cropBottomBox.cropBottomBoxMain.style.height = ''
      rootElemet.append(this.cropMain.cropMainMain)
    }
    this.cropMain.cropBottomBox.img.addEventListener('load', () => {
      this.proportion = this.cropMain.getProportion()
    })
  }

  /**
   * 绑定控制区域的元素
   * @method bindEvent
   * @private
   * @param {number} minWH 最小的宽高
   * @param {Boolean} pcIsZoomFree pc端是否自由缩放
   * @param {Boolean} mobileIsZoomFree mobile端是否自由缩放
   * @param {number} defaultAspectRatio 原始宽高比
   */
  private bindEvent(
    minWH: number,
    pcIsZoomFree: Boolean,
    mobileIsZoomFree: Boolean,
    defaultAspectRatio: number,
    proportion?: number
  ) {
    const cropBoxElement = this.cropMain.cropBox.cropBoxMain
    const imgElement = this.cropMain.cropBox.cropBoxImgObj.img
    const infoHeightElement = this.cropMain.cropBox.cropBoxInfoObj.infoHeight
    const infoWidthElement = this.cropMain.cropBox.cropBoxInfoObj.infoWidth
    const cropBoxPointLineWrapper = this.cropMain.cropBox.cropBoxPointLineWrapperObj

    // PC
    // 移动
    PCSelector.move(this.cropMain.cropBox.cropBoxMove, cropBoxElement, imgElement)
    // 向左上移动
    PCSelector.pointLeftAndTop(cropBoxPointLineWrapper.cropPoint1, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
    // 向右上移动
    PCSelector.pointRightAndTop(cropBoxPointLineWrapper.cropPoint3, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
    // 向左下移动
    PCSelector.pointLeftAndBottom(cropBoxPointLineWrapper.cropPoint6, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
    // 向右下移动
    PCSelector.pointRightAndBottom(cropBoxPointLineWrapper.cropPoint8, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)

    // Mobile
    // 移动
    MobileSelector.move(this.cropMain.cropBox.cropBoxMove, cropBoxElement, imgElement)
    // 向左上移动
    MobileSelector.pointLeftAndTop(cropBoxPointLineWrapper.cropPoint1, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
    // 向右上移动
    MobileSelector.pointRightAndTop(cropBoxPointLineWrapper.cropPoint3, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
    // 向左下移动
    MobileSelector.pointLeftAndBottom(cropBoxPointLineWrapper.cropPoint6, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
    // 向右下移动
    MobileSelector.pointRightAndBottom(cropBoxPointLineWrapper.cropPoint8, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)

    if (pcIsZoomFree) {
      // PC
      // 选择
      PCSelector.selectArea(this.cropMain.cropMask, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, proportion)
      // 向上移动
      PCSelector.lineAndPointTop(cropBoxPointLineWrapper.cropLineTop, cropBoxElement, imgElement, infoHeightElement, minWH, proportion)
      PCSelector.lineAndPointTop(cropBoxPointLineWrapper.cropPoint2, cropBoxElement, imgElement, infoHeightElement, minWH, proportion)
      // 向下移动
      PCSelector.lineAndPointBottom(cropBoxPointLineWrapper.cropLineBottom, cropBoxElement, imgElement, infoHeightElement, minWH, proportion)
      PCSelector.lineAndPointBottom(cropBoxPointLineWrapper.cropPoint7, cropBoxElement, imgElement, infoHeightElement, minWH, proportion)
      // 向左移动
      PCSelector.lineAndPointLeft(cropBoxPointLineWrapper.cropLineLeft, cropBoxElement, imgElement, infoWidthElement, minWH, proportion)
      PCSelector.lineAndPointLeft(cropBoxPointLineWrapper.cropPoint4, cropBoxElement, imgElement, infoWidthElement, minWH, proportion)
      // 向右移动
      PCSelector.lineAndPointRight(cropBoxPointLineWrapper.cropLineRight, cropBoxElement, imgElement, infoWidthElement, minWH, proportion)
      PCSelector.lineAndPointRight(cropBoxPointLineWrapper.cropPoint5, cropBoxElement, imgElement, infoWidthElement, minWH, proportion)
    } else {
      // PC
      // 向左上移动
      PCSelector.pointLeftAndTop(cropBoxPointLineWrapper.cropLineLeft, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
      PCSelector.pointLeftAndTop(cropBoxPointLineWrapper.cropPoint4, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
      // 向右上移动
      PCSelector.pointRightAndTop(cropBoxPointLineWrapper.cropLineTop, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
      PCSelector.pointRightAndTop(cropBoxPointLineWrapper.cropPoint2, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
      // 向左下移动
      PCSelector.pointLeftAndBottom(cropBoxPointLineWrapper.cropLineBottom, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
      PCSelector.pointLeftAndBottom(cropBoxPointLineWrapper.cropPoint7, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
      // 向右下移动
      PCSelector.pointRightAndBottom(cropBoxPointLineWrapper.cropLineRight, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
      PCSelector.pointRightAndBottom(cropBoxPointLineWrapper.cropPoint5, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
    }

    if (mobileIsZoomFree) {
      // Mobile
      // 选择
      MobileSelector.selectArea(this.cropMain.cropMask, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio)
      // 向上移动
      MobileSelector.lineAndPointTop(cropBoxPointLineWrapper.cropLineTop, cropBoxElement, imgElement, infoHeightElement, minWH, proportion)
      MobileSelector.lineAndPointTop(cropBoxPointLineWrapper.cropPoint2, cropBoxElement, imgElement, infoHeightElement, minWH, proportion)
      // 向下移动
      MobileSelector.lineAndPointBottom(cropBoxPointLineWrapper.cropLineBottom, cropBoxElement, imgElement, infoHeightElement, minWH, proportion)
      MobileSelector.lineAndPointBottom(cropBoxPointLineWrapper.cropPoint7, cropBoxElement, imgElement, infoHeightElement, minWH, proportion)
      // 向左移动
      MobileSelector.lineAndPointLeft(cropBoxPointLineWrapper.cropLineLeft, cropBoxElement, imgElement, infoWidthElement, minWH, proportion)
      MobileSelector.lineAndPointLeft(cropBoxPointLineWrapper.cropPoint4, cropBoxElement, imgElement, infoWidthElement, minWH, proportion)
      // 向右移动
      MobileSelector.lineAndPointRight(cropBoxPointLineWrapper.cropLineRight, cropBoxElement, imgElement, infoWidthElement, minWH, proportion)
      MobileSelector.lineAndPointRight(cropBoxPointLineWrapper.cropPoint5, cropBoxElement, imgElement, infoWidthElement, minWH, proportion)
    } else {
      // Mobile
      // 向左上移动
      MobileSelector.pointLeftAndTop(cropBoxPointLineWrapper.cropLineLeft, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
      MobileSelector.pointLeftAndTop(cropBoxPointLineWrapper.cropPoint4, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
      // 向右上移动
      MobileSelector.pointRightAndTop(cropBoxPointLineWrapper.cropLineTop, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
      MobileSelector.pointRightAndTop(cropBoxPointLineWrapper.cropPoint2, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
      // 向左下移动
      MobileSelector.pointLeftAndBottom(cropBoxPointLineWrapper.cropLineBottom, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
      MobileSelector.pointLeftAndBottom(cropBoxPointLineWrapper.cropPoint7, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
      // 向右下移动
      MobileSelector.pointRightAndBottom(cropBoxPointLineWrapper.cropLineRight, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
      MobileSelector.pointRightAndBottom(cropBoxPointLineWrapper.cropPoint5, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH, proportion)
    }
  }

  /**
   * 下载功能
   * @method download
   * @private
   */
  private download() {
    if (!this.blobUrl) {
      console.error(new Error('It must be parsed through getResult before download'))
      return this
    }

    const a = document.createElement('a')
    a.download = this.fileName || new Date().getTime().toString()
    a.href = this.blobUrl
    a.click()
  }

  /**
   * 获取裁剪的结果
   * @method getResult
   * @param {Function} callBack 回调函数，支持用户对解析的Blob进行操作
   * @param {Boolean} isDownLoad 是否自动下载
   */
  getResult(callBack?: (result: Blob) => void, isDownLoad?: Boolean): LCLImageCropper {
    const cropBox = this.cropMain.cropBox.cropBoxMain
    // const proportion = this.cropMain.getProportion()
    const imgShow = this.cropMain.cropBox.cropBoxImgObj.img

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (context) {
      // 图片剪裁的宽高及位置
      const currentImgW = parseFloat(cropBox.style.width) / this.proportion!
      const currentImgH = parseFloat(cropBox.style.height) / this.proportion!
      const regexp = /[0-9\.-]+/g
      const transform = cropBox.style.transform
      const list = transform.match(regexp)
      // canvas对图片进行缩放
      if (this.resultWidth === 'auto') {
        canvas.width = currentImgW
      } else {
        canvas.width = this.resultWidth
      }
      if (this.resultHeight === 'auto') {
        canvas.height = currentImgH
      } else {
        canvas.height = this.resultHeight
      }
      // 清除画布
      context.clearRect(0, 0, canvas.width, canvas.height)
      if (list) {
        const startX = Number(list[1]) / this.proportion!
        const startY = Number(list[2]) / this.proportion!
        // 图片处理
        context.drawImage(imgShow, startX, startY, currentImgW, currentImgH, 0, 0, canvas.width, canvas.height)
        // canvas转为blob
        canvas.toBlob((blob) => {
          if (blob) {
            if (callBack) {
              callBack(blob)
            }
            this.blobUrl = window.URL.createObjectURL(blob)
            if (isDownLoad) {
              this.download()
            }
          }
        }, this.fileType || 'image/jpeg')
      }
    }
    return this
  }

  /**
   * 销毁整个节点
   * @method destroy
   */
  destroy(): void {
    this.cropMain.cropMainMain.remove()
  }

  /**
   * 清空选取的范围
   * @method clear
   */
  clear() {
    const cropBoxElement = this.cropMain.cropBox.cropBoxMain
    const infoHeightElement = this.cropMain.cropBox.cropBoxInfoObj.infoHeight
    const infoWidthElement = this.cropMain.cropBox.cropBoxInfoObj.infoWidth
    CommonSeletor.clear(cropBoxElement, infoHeightElement, infoWidthElement)
    return this
  }

  /**
   * 选取所有范围
   * @method selectAll
   */
  selectAll() {
    const cropBoxElement = this.cropMain.cropBox.cropBoxMain
    const imgElement = this.cropMain.cropBox.cropBoxImgObj.img
    const infoHeightElement = this.cropMain.cropBox.cropBoxInfoObj.infoHeight
    const infoWidthElement = this.cropMain.cropBox.cropBoxInfoObj.infoWidth
    CommonSeletor.selectAll(cropBoxElement, infoHeightElement, infoWidthElement, imgElement, this.proportion)
    return this
  }
}

/**
 * 创建 LCLImageCropper
 * @function
 * @param {HTMLElement} rootElemet 插件插入的节点
 * @param {string|File} imgSrc 图片来源
 * @param {number} resultWidth 输出图片的宽度，默认auto
 * @param {number} resultHeight 输出图片的高度，默认auto
 * @param {Boolean} pcIsZoomFree pc端是否自由缩放 默认值为 true
 * @param {Boolean} mobileIsZoomFree mobile端是否自由缩放 默认值为 true
 * @param {number} minWH 最小宽高 默认值为 20px
 * @param {number|undefined} startWidth 初始显示的宽度，默认使用图片的一半宽度显示
 * @param {number|undefined} startHeight 初始显示的高度， 默认使用图片的一半高度显示
 * @param {string|undefined} fileType 输出图片的类型，默认使用原图片类型或image/jpeg，用于压缩
 * @param {string|undefined} fileName 输出的图片的名字，用于自动下载
 */
export default function (
  rootElemet: HTMLElement,
  imgSrc: string | File,
  options?: {
    resultWidth?: number,
    resultHeight?: number,
    pcIsZoomFree?: Boolean,
    mobileIsZoomFree?: Boolean,
    minWH?: number,
    startWidth?: number,
    startHeight?: number,
    fileType?: string,
    fileName?: string
  }
) {
  if (options) {
    return new LCLImageCropper(
      rootElemet,
      imgSrc,
      options.resultWidth,
      options.resultHeight,
      options.pcIsZoomFree,
      options.mobileIsZoomFree,
      options.minWH,
      options.startWidth,
      options.startHeight,
      options.fileType,
      options.fileName
    )
  } else {
    return new LCLImageCropper(
      rootElemet,
      imgSrc
    )
  }
}
