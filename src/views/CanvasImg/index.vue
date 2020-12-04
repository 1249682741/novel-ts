<template>
  <canvas 
    ref="myCanvas" 
    :width='canvasStyle.width' 
    :height="canvasStyle.height" 
    style="width: 0;height: 0"></canvas>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator' 
import {toZipDownload} from '@/utils/download'
import JYImg from './jy.jpg'
import JYCoverImg from './jyfm.jpg'
import YXImg from './yx.jpg'
import YXCoverImg from './yxfm.jpg'

export interface ImgInfo {
  school: string;
  type: string
}

export interface canvasData {
  name: string,
  title: string,
  beginTime: string,
  endTime: string,
  sealTime: string
}

@Component
export default class CanvasImg extends Vue{
  @Prop({required: true}) private canvasData !: Array<canvasData>
  @Prop({required: true}) imgInfo !: ImgInfo
  @Prop({default: 'cover'}) private coverImgName: string
  @Prop({default: 'certificate'}) private certificateImgName: string

  private ctx: CanvasRenderingContext2D | null
  private canvasStyle = {width: 300, height: 300}
  private coverImg :string
  private certificateImg :string

  @Watch('imgInfo', {immediate: true, deep: true})
  initImg(val){
    const obj = {
      'dbs': {
        'jy': {cover: JYCoverImg, certificate: JYImg},
        'yx': {cover: YXCoverImg, certificate: YXImg}
      }
    }
    this.coverImg = obj[val.school][val.type].cover
    this.certificateImg = obj[val.school][val.type].certificate
  }

  mounted(){
    this.ctx = (this.$refs['myCanvas'] as HTMLCanvasElement).getContext('2d')
    this.$emit('myCanvas', this)
  }
  public downloadImg() {
    // 每次下载前重置 imgDataPromise
    let imgDataPromise = []
    // 由于点击下载按钮是DOM可能未完成渲染。 因而使用$nextTick等DOM渲染完成再执行任务
    this.$nextTick(() => {
      imgDataPromise.push(this.drawCover(this.coverImg))
      this.canvasData.forEach(item => {
        imgDataPromise.push(this[`${this.imgInfo.school}_${this.imgInfo.type}_drawCertificate`](this.certificateImg, item.name, item.title, item.beginTime, item.endTime, item.sealTime))
      })
      toZipDownload(imgDataPromise, `${this.coverImgName}.png`, `${this.certificateImgName}.png`)
    })
  }
  // 获取cover图片
  public getCoverImg(){
    return this.coverImg
  }

  // 获取canvas图片
  public getCanvasImg(){
    return new Promise((resolve,reject) => {
      try{
        this[`${this.imgInfo.school}_${this.imgInfo.type}_drawCertificate`](this.certificateImg, this.canvasData[0].name, this.canvasData[0].title, this.canvasData[0].beginTime, this.canvasData[0].endTime, this.canvasData[0].sealTime, true)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      }catch(err){
        reject(err)
      }
    })
  }

  private drawCover (imgSrc: string) {
    return new Promise((resolve) => {
      const img = new Image()
      img.src = imgSrc
      img.onload = () => {
        this._initCanvasSize(img)
        // 由于可能修改了canvas的宽高。所以用$nextTick等canvas DOM的宽高更新了再进行绘画
        this.$nextTick(() => {
          this.ctx.drawImage(img, 0, 0)
          return (this.$refs['myCanvas'] as HTMLCanvasElement).toBlob((blob) => {
            resolve({
              imgData: blob
            })
          }, 'image/jpg')
        })
      }
    })
  }
  /**
   * 画大别山结业证书信息
   * @param imgSrc 结业证书背景图片
   * @param name 被授予证书人姓名
   * @param title 培训项目 maxLen 19
   * @param beginTime 项目开始时间 xxxx-xx-xx
   * @param endTime 项目结束时间 xx-xx
   * @param sealTime 证书盖章时间 xxxx-xx-xx
   */
  private dbs_jy_drawCertificate(imgSrc: string, name: string, title: string, beginTime: string, endTime: string, sealTime: string, toImage: boolean = false) {
    return new Promise((resolve) => {
      const img = new Image()
      img.src= imgSrc
      img.onload = () => {
        this._initCanvasSize(img)
        this.$nextTick(() => {

          const maxLenObj= {name: 88, title:  420}
          this.ctx.drawImage(img, 0, 0)
          this.ctx.font = 'normal normal bold 22px Arial'
          this.ctx.textAlign = 'right'

          const y1 = 278

          // this._drawTxt(name, maxLenObj.name, 135, y1)
          this._fixFontSize(name, maxLenObj.name)
          this.ctx.fillText(name, 135, y1)

          this.ctx.font = 'normal normal bold 22px Arial'
          this.ctx.fillText(beginTime.substr(0, 4), 274, y1)
          this.ctx.fillText(beginTime.substr(5, 2), 328, y1)
          this.ctx.fillText(beginTime.substr(8, 2), 375, y1)
          this.ctx.fillText(endTime.substr(5, 2), 460, y1)
          this.ctx.fillText(endTime.substr(8, 2), 508, y1)

          const y2 = 320
          // this._fixFontSize(title, maxLenObj.title)
          // this.ctx.fillText(title, 475, y2)
          this._drawTxt(title, maxLenObj.title, 475, y2)

          const y3 = 478
          this.ctx.font = 'normal normal bold 22px Arial'
          this.ctx.fillText(sealTime.substr(0, 4), 534, y3)
          this.ctx.fillText(sealTime.substr(5, 2), 580,  y3)
          this.ctx.fillText(sealTime.substr(8, 2), 625,  y3)

          if (toImage) {
            return resolve((this.$refs['myCanvas'] as HTMLCanvasElement).toDataURL('image/png'))
          } else {
            return (this.$refs['myCanvas'] as HTMLCanvasElement).toBlob((blob) => {
              resolve({
                name,
                imgData: blob
              })
            }, 'image/jpg')
          }
        })
      }
    })
  }

  private dbs_yx_drawCertificate(imgSrc: string, name: string, title: string, beginTime: string, endTime: string, sealTime: string, toImage: boolean = false) {
    return new Promise((resolve) => {
      const img = new Image()
      img.src= imgSrc
      img.onload = () => {
        this._initCanvasSize(img)
        this.$nextTick(() => {

          const maxLenObj= {name: 100, title:  268}
          this.ctx.drawImage(img, 0, 0)
          this.ctx.font = 'normal normal bold 22px Arial'
          this.ctx.textAlign = 'right'

          const y1 = 274
          // this._drawTxt(title, maxLenObj.name, 139, y1)
          this._fixFontSize(name, maxLenObj.name)
          this.ctx.fillText(name, 139, y1)

          this.ctx.font = 'normal normal bold 22px Arial'
          this.ctx.fillText(beginTime.substr(0, 4), 274, y1)
          this.ctx.fillText(beginTime.substr(5, 2), 332, y1)
          this.ctx.fillText(beginTime.substr(8, 2), 382, y1)
          this.ctx.fillText(endTime.substr(5, 2), 462, y1)
          this.ctx.fillText(endTime.substr(8, 2), 512, y1)

          const y2 = 316
          this._drawTxt(title, maxLenObj.title, 362, y2)
          // this._fixFontSize(title, maxLenObj.title)
          // this.ctx.fillText(title, 362, y2)
          
          const y3 = 496
          this.ctx.font = 'normal normal bold 22px Arial'
          this.ctx.fillText(sealTime.substr(0, 4), 583, y3)
          this.ctx.fillText(sealTime.substr(5, 2), 631,  y3)
          this.ctx.fillText(sealTime.substr(8, 2), 673,  y3)

          if (toImage) {
            return resolve((this.$refs['myCanvas'] as HTMLCanvasElement).toDataURL('image/png'))
          } else {
            return (this.$refs['myCanvas'] as HTMLCanvasElement).toBlob((blob) => {
              resolve({
                name,
                imgData: blob
              })
            }, 'image/jpg')
          }
        })
      }
    })
  }

  /**
   * 检查txt长度时候超出最大长度， 是的话就fontSize递归-1
   */
  private _fixFontSize(txt: string, len: number){
    const font = this.ctx.font.split(' ')
    if (this.ctx.measureText(txt).width > len){
      const fontSize = parseInt(font[1]) - 1
      this.ctx.font = `normal normal ${font[0]} ${fontSize}px ${font[2]}`
      this._fixFontSize(txt, len)
    } else {
      return 
    }
  }

  private _drawTxt(txt: string, len: number, x: number, y:number){
    let txtWidth = this.ctx.measureText(txt).width
    if (txtWidth >= len){
      this._fixFontSize(txt, len)
      this.ctx.fillText(name, x, y)
    }else{
      let letterSpacing = this._fixLettrSpace(txt, len, 0, txtWidth)
      letterSpacing = letterSpacing > 0 ? letterSpacing : 0.1
      let arrText = txt.split('')
      let align = this.ctx.textAlign || 'left';
      let actualWidth = txtWidth + (letterSpacing - 0.1) * (txt.length - 1)
      // 根据水平对齐方式确定第一个字符的坐标
      if (align == 'center') {
          x = x - actualWidth / 2
      } else if (align == 'right') {
          x = x - actualWidth
      }
      // 临时修改为文本左对齐
      this.ctx.textAlign = 'left'
      // 开始逐字绘制
      arrText.forEach(letter => {
          var letterWidth = this.ctx.measureText(letter).width
          this.ctx.fillText(letter, x, y)
          // 确定下一个字符的横坐标
          x = x + letterWidth + letterSpacing
      })
      this.ctx.textAlign = align
    }
  }



  private _fixLettrSpace(txt: string, len: number,letterSpacing: number = 0, originWidth: number){
    // 应用letterSpacing占据宽度
    var actualWidth = originWidth + letterSpacing * (txt.length - 1)
    if (actualWidth < len){
      return this._fixLettrSpace(txt, len, letterSpacing + 0.1, originWidth)
    }else{
      return letterSpacing
    }
  }
  

  /**
   * 根据图片大小 动态改变canvas画布大小
   * @param img HTMLImageElement 
   */
  private _initCanvasSize (img: HTMLImageElement) {
    if (this.canvasStyle.width != img.width || this.canvasStyle.height != img.height){
      this.canvasStyle = {
        width: img.width,
        height: img.height
      }
    }
  }
}
</script>