import style from '../../styleJson/main.scss.json'
import { createElement } from '../utils'

class CropBoxImg {
  public cropBoxImgMain: HTMLDivElement;
  public img: HTMLImageElement;

  constructor () {
    this.cropBoxImgMain = createElement('div', [style['crop-box-img']]) as HTMLDivElement
    this.img = createElement('img') as HTMLImageElement
    this.cropBoxImgMain.append(this.img)
  }
}

export default CropBoxImg
