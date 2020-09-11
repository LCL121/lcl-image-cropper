import style from '../styleJson/test.scss.json'
import { createElement } from '../ts/utils'

class InputFileButton {
  public inputFileButtonMain: HTMLDivElement;
  public button: HTMLDivElement;
  public input: HTMLInputElement;

  public constructor(elem: HTMLElement) {
    this.inputFileButtonMain = createElement('div') as HTMLDivElement
    this.button = createElement('div', [style['get-picture-button']]) as HTMLDivElement
    this.input = createElement('input', [style['input-file']]) as HTMLInputElement
    this.button.addEventListener('click', () => {
      this.input.click()
    })
    this.button.innerHTML = '+'
    this.input.type = 'file'
    this.input.accept = 'image/*'
    this.inputFileButtonMain.append(this.button, this.input)
    elem.append(this.inputFileButtonMain)
  }
}

export default InputFileButton
