import style from '../../styleJson/main.scss.json'
import { createElement } from '../utils'

class CropBottomBox {
  public cropBottomBoxMain: HTMLDivElement;
  public img: HTMLImageElement;

  constructor () {
    this.cropBottomBoxMain = createElement('div', [style['crop-bottom-box']]) as HTMLDivElement
    this.img = createElement('img') as HTMLImageElement
    this.cropBottomBoxMain.append(this.img)
  }
}

export default CropBottomBox
