import CropBoxPointLineWrapper from './cropBoxPointLineWrapper'
import CropBoxImg from './cropBoxImg'
import CropBoxInfo from './cropBoxInfo'
import { createElement } from '../utils'
import style from '../../styleJson/main.scss.json'

class CropBox {
  public cropBoxMain: HTMLDivElement;
  public cropBoxImgObj: CropBoxImg;
  public cropBoxMove: HTMLDivElement;
  public cropBoxInfoObj: CropBoxInfo;
  public cropBoxPointLineWrapperObj: CropBoxPointLineWrapper;

  constructor () {
    this.cropBoxMain = createElement('div', [style['crop-box']]) as HTMLDivElement
    this.cropBoxImgObj = new CropBoxImg()
    this.cropBoxMove = createElement('div', [style['crop-box-move']]) as HTMLDivElement
    this.cropBoxInfoObj = new CropBoxInfo()
    this.cropBoxPointLineWrapperObj = new CropBoxPointLineWrapper()

    this.cropBoxMain.append(
      this.cropBoxImgObj.cropBoxImgMain,
      this.cropBoxMove,
      this.cropBoxInfoObj.cropBoxInfoMain,
      this.cropBoxPointLineWrapperObj.cropBoxPointLineWrapperMain
    )
  }
}

export default CropBox
