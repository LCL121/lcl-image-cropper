import style from '../../styleJson/main.scss.json'
import { createElement } from '../utils'

class CropBoxPointLineWrapper {
  public cropBoxPointLineWrapperMain: HTMLDivElement;
  public cropLineTop: HTMLSpanElement;
  public cropLineRight: HTMLSpanElement;
  public cropLineBottom: HTMLSpanElement;
  public cropLineLeft: HTMLSpanElement;
  public cropPoint1: HTMLSpanElement;
  public cropPoint2: HTMLSpanElement;
  public cropPoint3: HTMLSpanElement;
  public cropPoint4: HTMLSpanElement;
  public cropPoint5: HTMLSpanElement;
  public cropPoint6: HTMLSpanElement;
  public cropPoint7: HTMLSpanElement;
  public cropPoint8: HTMLSpanElement;

  public constructor () {
    // 四条边
    this.cropLineTop = createElement('span', [style['crop-line'], style['crop-line-top']])
    this.cropLineRight = createElement('span', [style['crop-line'], style['crop-line-right']])
    this.cropLineBottom = createElement('span', [style['crop-line'], style['crop-line-bottom']])
    this.cropLineLeft = createElement('span', [style['crop-line'], style['crop-line-left']])

    // 八个点
    this.cropPoint1 = createElement('span', [style['crop-point'], style['crop-point1']])
    this.cropPoint2 = createElement('span', [style['crop-point'], style['crop-point2']])
    this.cropPoint3 = createElement('span', [style['crop-point'], style['crop-point3']])
    this.cropPoint4 = createElement('span', [style['crop-point'], style['crop-point4']])
    this.cropPoint5 = createElement('span', [style['crop-point'], style['crop-point5']])
    this.cropPoint6 = createElement('span', [style['crop-point'], style['crop-point6']])
    this.cropPoint7 = createElement('span', [style['crop-point'], style['crop-point7']])
    this.cropPoint8 = createElement('span', [style['crop-point'], style['crop-point8']])

    this.cropBoxPointLineWrapperMain = createElement('div', [style['crop-box-point-line-wrapper']]) as HTMLDivElement
    this.cropBoxPointLineWrapperMain.append(
      this.cropLineTop,
      this.cropLineRight,
      this.cropLineBottom,
      this.cropLineLeft,
      this.cropPoint1,
      this.cropPoint2,
      this.cropPoint3,
      this.cropPoint4,
      this.cropPoint5,
      this.cropPoint6,
      this.cropPoint7,
      this.cropPoint8
    )
  }
}

export default CropBoxPointLineWrapper
