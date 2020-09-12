import CropMain from './ts/createElement/cropMain'
import PCSelector from './ts/pcSelector'
import MobileSelector from './ts/mobileSelector'
import CommonSeletor from './ts/commonSeletor'

import './assets/css/reset.css'
import './assets/scss/main.scss'

/**
 * @class LCLImageCropper
 * @classdesc 创建 LCLImageCropper 对象
 */
class LCLImageCropper {
  private cropMain: CropMain;
  // 记录输出图片的宽高
  private resultWidth: number;
  private resultHeight: number;
  private fileType?: string;
  private fileName?: string;
  private blobUrl?: string;

  /**
   * 类初始化
   * @constructor
   * @param {HTMLElement} rootElemet 插件插入的节点
   * @param {string|File} imgSrc 图片来源
   * @param {number} resultWidth 输出图片的宽度
   * @param {number} resultHeight 输出图片的高度
   * @param {number|undefined} defaultWidth 初始显示的默认宽度
   * @param {number|undefined} defaultHeight 初始显示的默认高度
   * @param {string|undefined} fileType 输出图片的类型
   * @param {string|undefined} fileName 输出图片的名字
   * @param {Boolean} isZoomFree 是否自由缩放
   * @param {number} minWH 最小宽高
   */
  constructor(
    rootElemet: HTMLElement,
    imgSrc: string | File,
    resultWidth: number,
    resultHeight: number,
    defaultWidth?: number,
    defaultHeight?: number,
    fileType?: string,
    fileName?: string,
    isZoomFree: Boolean = true,
    minWH: number = 20
  ) {
    this.resultWidth = resultWidth
    this.resultHeight = resultHeight
    this.fileType = fileType
    this.fileName = fileName
    this.cropMain = new CropMain(
      (width: number, height: number) => {
        this.bindEvent(minWH, isZoomFree, width / height)
      },
      defaultWidth,
      defaultHeight
    )

    if (imgSrc instanceof File) {
      this.fileType = imgSrc.type
      this.fileName = imgSrc.name
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
  }

  /**
   * 绑定控制区域的元素
   * @method bindEvent
   * @private
   * @param {number} minWH 最小的宽高
   * @param {Boolean} isZoomFree 是否自由缩放
   * @param {number} defaultAspectRatio 原始宽高比
   */
  private bindEvent(minWH: number, isZoomFree: Boolean, defaultAspectRatio: number) {
    const cropBoxElement = this.cropMain.cropBox.cropBoxMain
    const imgElement = this.cropMain.cropBox.cropBoxImgObj.img
    const infoHeightElement = this.cropMain.cropBox.cropBoxInfoObj.infoHeight
    const infoWidthElement = this.cropMain.cropBox.cropBoxInfoObj.infoWidth
    const cropBoxPointLineWrapper = this.cropMain.cropBox.cropBoxPointLineWrapperObj

    if (isZoomFree) {
      // PC
      // 移动
      PCSelector.move(this.cropMain.cropBox.cropBoxMove, cropBoxElement, imgElement)
      // 向上移动
      PCSelector.lineAndPointTop(cropBoxPointLineWrapper.cropLineTop, cropBoxElement, imgElement, infoHeightElement, minWH)
      PCSelector.lineAndPointTop(cropBoxPointLineWrapper.cropPoint2, cropBoxElement, imgElement, infoHeightElement, minWH)
      // 向下移动
      PCSelector.lineAndPointBottom(cropBoxPointLineWrapper.cropLineBottom, cropBoxElement, imgElement, infoHeightElement, minWH)
      PCSelector.lineAndPointBottom(cropBoxPointLineWrapper.cropPoint7, cropBoxElement, imgElement, infoHeightElement, minWH)
      // 向左移动
      PCSelector.lineAndPointLeft(cropBoxPointLineWrapper.cropLineLeft, cropBoxElement, imgElement, infoWidthElement, minWH)
      PCSelector.lineAndPointLeft(cropBoxPointLineWrapper.cropPoint4, cropBoxElement, imgElement, infoWidthElement, minWH)
      // 向右移动
      PCSelector.lineAndPointRight(cropBoxPointLineWrapper.cropLineRight, cropBoxElement, imgElement, infoWidthElement, minWH)
      PCSelector.lineAndPointRight(cropBoxPointLineWrapper.cropPoint5, cropBoxElement, imgElement, infoWidthElement, minWH)
      // 向左上移动
      PCSelector.pointLeftAndTop(cropBoxPointLineWrapper.cropPoint1, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH)
      // 向右上移动
      PCSelector.pointRightAndTop(cropBoxPointLineWrapper.cropPoint3, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH)
      // 向左下移动
      PCSelector.pointLeftAndBottom(cropBoxPointLineWrapper.cropPoint6, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH)
      // 向右下移动
      PCSelector.pointRightAndBottom(cropBoxPointLineWrapper.cropPoint8, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH)
    } else {
      // 移动
      PCSelector.move(this.cropMain.cropBox.cropBoxMove, cropBoxElement, imgElement)
      // 向左上移动
      PCSelector.pointLeftAndTop(cropBoxPointLineWrapper.cropPoint1, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH)
      PCSelector.pointLeftAndTop(cropBoxPointLineWrapper.cropLineLeft, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH)
      PCSelector.pointLeftAndTop(cropBoxPointLineWrapper.cropPoint4, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH)
      // 向右上移动
      PCSelector.pointRightAndTop(cropBoxPointLineWrapper.cropPoint3, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH)
      PCSelector.pointRightAndTop(cropBoxPointLineWrapper.cropLineTop, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH)
      PCSelector.pointRightAndTop(cropBoxPointLineWrapper.cropPoint2, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH)
      // 向左下移动
      PCSelector.pointLeftAndBottom(cropBoxPointLineWrapper.cropPoint6, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH)
      PCSelector.pointLeftAndBottom(cropBoxPointLineWrapper.cropLineBottom, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH)
      PCSelector.pointLeftAndBottom(cropBoxPointLineWrapper.cropPoint7, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH)
      // 向右下移动
      PCSelector.pointRightAndBottom(cropBoxPointLineWrapper.cropPoint8, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH)
      PCSelector.pointRightAndBottom(cropBoxPointLineWrapper.cropLineRight, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH)
      PCSelector.pointRightAndBottom(cropBoxPointLineWrapper.cropPoint5, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio, minWH)
    }
    // Mobile
    // 移动
    MobileSelector.move(this.cropMain.cropBox.cropBoxMove, cropBoxElement, imgElement)
    // 选择
    MobileSelector.selectArea(this.cropMain.cropMask, cropBoxElement, imgElement, infoWidthElement, infoHeightElement, defaultAspectRatio)
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
  getResult(callBack: (result: Blob) => void, isDownLoad?: Boolean): LCLImageCropper {
    if (!callBack) {
      console.error(new Error('Missing callBack parameter'))
      return this
    }

    const cropBox = this.cropMain.cropBox.cropBoxMain
    const proportion = this.cropMain.getProportion()
    const imgShow = this.cropMain.cropBox.cropBoxImgObj.img

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (context) {
      // canvas对图片进行缩放
      canvas.width = this.resultWidth
      canvas.height = this.resultHeight
      // 清除画布
      context.clearRect(0, 0, this.resultWidth, this.resultHeight)
      // 图片剪裁的宽高及位置
      const currentImgW = parseFloat(cropBox.style.width) / proportion
      const currentImgH = parseFloat(cropBox.style.height) / proportion
      const regexp = /[0-9\.-]+/g
      const transform = cropBox.style.transform
      const list = transform.match(regexp)
      if (list) {
        const startX = Number(list[1]) / proportion
        const startY = Number(list[2]) / proportion
        // 图片压缩
        context.drawImage(imgShow, startX, startY, currentImgW, currentImgH, 0, 0, this.resultWidth, this.resultHeight)
        // canvas转为blob并上传
        canvas.toBlob((blob) => {
          // 图片ajax上传
          if (blob) {
            callBack(blob)
            if (isDownLoad) {
              this.blobUrl = window.URL.createObjectURL(blob)
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
    CommonSeletor.selectAll(cropBoxElement, infoHeightElement, infoWidthElement, imgElement)
    return this
  }
}

export default function (
  rootElemet: HTMLElement,
  imgSrc: string | File,
  resultWidth: number,
  resultHeight: number,
  defaultWidth?: number,
  defaultHeight?: number,
  fileType?: string,
  fileName?: string,
  isZoomFree: Boolean = true,
  minWH: number = 20
) {
  return new LCLImageCropper(
    rootElemet,
    imgSrc,
    resultWidth,
    resultHeight,
    defaultWidth,
    defaultHeight,
    fileType,
    fileName,
    isZoomFree,
    minWH
  )
}