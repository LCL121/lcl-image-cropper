import InputFileButton from './other/inputFileButton'
import LCLImageCropper from './index'

import './assets/scss/test.scss'

class Test {
  private inputFileButton: InputFileButton;
  private file?: File;
  private reader: FileReader;
  private base64?: string;

  constructor(inputElementParent: HTMLElement) {
    this.inputFileButton = new InputFileButton(inputElementParent)
    this.reader = new FileReader()

    this.imgLoad()
  }

  imgLoad() {
    // 监听文件的选择
    this.inputFileButton.input.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement
      if (target && target.files) {
        this.file = target.files[0]
        if (this.file.size < 1024 * 1024) {
          // 选择的文件是图片
          if (this.file.type.indexOf('image') === 0) {
            this.reader.readAsDataURL(this.file)
          }
        }
      }
    })

    // 文件base64化，以便获知图片原始尺寸
    this.reader.onload = (e) => {
      if (e.target && e.target.result) {
        this.base64 = e.target.result as string

        if (this.file) {
          const a = LCLImageCropper(
            document.body,
            this.base64,
            214,
            300
          )
          // 测试清空功能
          const button1 = document.createElement('button')
          button1.innerHTML = 'clear'
          button1.onclick = () => {
            a.clear()
          }
          document.body.append(button1)

          // 测试获取功能
          const button2 = document.createElement('button')
          button2.innerHTML = 'getResult'
          button2.onclick = () => {
            a.getResult((blob: Blob) => {
              console.log(blob)
            })
          }
          document.body.append(button2)

          // 测试选择所有功能
          const button4 = document.createElement('button')
          button4.innerHTML = 'selectAll'
          button4.onclick = () => {
            a.selectAll()
          }
          document.body.append(button4)

          // 测试下载功能
          // const button5 = document.createElement('button')
          // button5.innerHTML = 'download'
          // button5.onclick = () => {
          //   a.download()
          // }
          // document.body.append(button5)

          // 测试销毁功能
          const button3 = document.createElement('button')
          button3.innerHTML = 'destroy'
          button3.onclick = () => {
            a.destroy()
            button1.remove()
            button2.remove()
            button3.remove()
            button4.remove()
            // button5.remove()
          }
          document.body.append(button3)
        }
      }
    }
  }
}

new Test(document.body)

export default Test
