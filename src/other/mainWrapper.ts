import style from '../styleJson/test.scss.json'
import { createElement } from '../ts/utils'

class MainWrapper {
  public mainWrapperMain: HTMLDivElement;
  public mainMask: HTMLDivElement;
  public title: HTMLDivElement;
  public option: HTMLDivElement;
  public main: HTMLDivElement;
  public bottom: HTMLDivElement;

  constructor() {
    this.mainWrapperMain = createElement('div', [style['main-wrapper']]) as HTMLDivElement
    this.title = createElement('div', [style['main-title']]) as HTMLDivElement
    this.title.innerHTML = '上传图片'
    this.option = createElement('div') as HTMLDivElement
    this.main = createElement('div') as HTMLDivElement
    this.bottom = createElement('div') as HTMLDivElement

    this.mainMask = createElement('div', [style['main-mask']]) as HTMLDivElement

    this.mainWrapperMain.append(this.title, this.option, this.main, this.bottom)

    document.body.append(this.mainMask, this.mainWrapperMain)
  }
}

export default MainWrapper
