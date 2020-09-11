import style from '../../styleJson/main.scss.json'
import { createElement } from '../utils'

class CropBoxInfo {
  public cropBoxInfoMain: HTMLDivElement;
  public infoWidth: HTMLSpanElement;
  public infoHeight: HTMLSpanElement;

  constructor () {
    this.cropBoxInfoMain = createElement('div', [style['crop-box-info']]) as HTMLDivElement
    this.infoWidth = createElement('span')
    this.infoHeight = createElement('span')
    this.cropBoxInfoMain.append(this.infoWidth, document.createTextNode(' x '), this.infoHeight)
  }
}

export default CropBoxInfo
