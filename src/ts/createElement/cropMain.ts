import CropBottomBox from './cropBottomBox'
import CropBox from './cropBox'
import style from '../../styleJson/main.scss.json'
import { createElement } from '../utils'

class CropMain {
  public cropMainMain: HTMLDivElement;
  public cropBottomBox: CropBottomBox;
  public cropMask: HTMLDivElement;
  public cropBox: CropBox;
  private proportion?: number;

  constructor(callBack: (width: number, height: number) => void, startWidth?: number, startHeight?: number) {
    this.cropMainMain = createElement('div', [style['crop-main']]) as HTMLDivElement
    this.cropBottomBox = new CropBottomBox()
    this.cropMask = createElement('div', [style['crop-mask']]) as HTMLDivElement
    this.cropBox = new CropBox()

    this.cropMainMain.append(
      this.cropBottomBox.cropBottomBoxMain,
      this.cropMask,
      this.cropBox.cropBoxMain
    )

    // base64地址图片加载完毕后
    // 展示
    this.cropBottomBox.img.addEventListener('load', (e) => {
      const cropBox = this.cropBox.cropBoxMain
      const imgShow = this.cropBox.cropBoxImgObj.img
      const imgBottom = this.cropBottomBox.img
      const imageInfoWidth = this.cropBox.cropBoxInfoObj.infoWidth
      const imageInfoHeight = this.cropBox.cropBoxInfoObj.infoHeight
      const target = e.target as HTMLImageElement

      const originImgHeight = target.height
      // height 固定初始化时 300px
      const aspectRatio = target.height / 300
      const width = target.width / aspectRatio
      cropBox.style.left = `${Math.floor((500 - width) / 2)}px`
      cropBox.style.width = `${startWidth || Math.floor(width / 2)}px`
      cropBox.style.height = `${startHeight || 150}px`
      cropBox.style.transform = 'translate3d(0px, 0px, 0px)'
      if (screen.width < 500) {
        this.cropMainMain.style.width = `${screen.width}px`
        cropBox.style.left = `${Math.floor((screen.width - width) / 2)}px`
      }
      imgShow.style.width = `${width}px`
      imgShow.style.height = '300px'
      imgShow.style.transform = 'translate3d(0px, 0px, 0px)'
      imgBottom.style.height = '300px'
      this.proportion = target.height / originImgHeight
      callBack(target.width, target.height)
      imageInfoHeight.innerHTML = `${Math.round((startHeight || 150) / this.proportion)}`
      imageInfoWidth.innerHTML = `${Math.round((startWidth || Math.floor(width / 2)) / this.proportion)}`
    })
  }

  getProportion () {
    if (this.proportion) {
      return this.proportion
    } else {
      return 0
    }
  }
}

export default CropMain
