<template>
  <canvas 
    ref="myCanvas" 
    :width='canvasStyle.width' 
    :height="canvasStyle.height" 
    style="width: 0;height: 0"></canvas>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator' 
import JYImg from './jy.jpg'
import JYCoverImg from './jyfm.jpg'
import {toZipDownload} from '@/utils/download'

@Component
export default class extends Vue{
  @Prop({required: true}) private nameArr !: Array<string>
  @Prop({required: true}) private title !: string
  @Prop({required: true}) private beginTime !: string
  @Prop({required: true}) private endTime !: string
  @Prop({required: true}) private sealTime !: string
  @Prop({default: 'jy'}) imgType !: string
  @Prop({default: 'cover'}) private coverImgName: string
  @Prop({default: 'certificate'}) private certificateImgName: string

  
  private coverImg: string
  private certificateImg: string
  private ctx: CanvasRenderingContext2D | null
  private imgDataPromise = []
  private canvasStyle = {width: 300, height: 300}

  @Watch('imgType', {immediate:true})
  initImgPath(val){
    const imgInfo = {
      'jy': {
        coverImg: JYCoverImg,
        certificateImg: JYImg
      }
    }
    if (Object.prototype.hasOwnProperty.call(imgInfo, val)){
      this.coverImg = imgInfo[val].coverImg
      this.certificateImg = imgInfo[val].certificateImg
    } else {
      console.warn("the imgType prop of [CanvasImg] component is in 'jy' ")
    }
  }
  mounted(){
    this.$emit('myCanvas', this)
  }
  public downloadImg() {
    // 每次下载前重置 imgDataPromise
    this.imgDataPromise = []
    // 由于点击下载按钮是DOM可能未完成渲染。 因而使用$nextTick等DOM渲染完成再执行任务
    this.$nextTick(() => {
      console.log(2)
      this.ctx = (this.$refs['myCanvas'] as HTMLCanvasElement).getContext('2d')
      this.imgDataPromise.push(this.drawCover(this.coverImg))
      this.nameArr.forEach(name => {
        this.imgDataPromise.push(this.drawCertificate(this.certificateImg, name, this.title, this.beginTime, this.endTime, this.sealTime))
      })
      toZipDownload(this.imgDataPromise, `${this.coverImgName}.png`, `${this.certificateImgName}.png`)
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
   * 画结业证书信息
   * @param imgSrc 结业证书背景图片
   * @param name 被授予证书人姓名
   * @param title 培训项目 maxLen 19
   * @param beginTime 项目开始时间 xxxx-xx-xx
   * @param endTime 项目结束时间 xx-xx
   * @param sealTime 证书盖章时间 xxxx-xx-xx
   */
  private drawCertificate(imgSrc: string, name: string, title: string, beginTime: string, endTime: string, sealTime: string) {
    return new Promise((resolve) => {
      const img = new Image()
      img.src= imgSrc
      img.onload = () => {
        this._initCanvasSize(img)
        this.$nextTick(() => {
          this.ctx.drawImage(img, 0, 0)
          this.ctx.font = 'normal normal bold 22px Arial'
          this.ctx.textAlign = 'end'

          const y1 = 278
          this._fixFontSize(name, 'name')
          this.ctx.fillText(name, 135, 278)

          this.ctx.font = 'normal normal bold 22px Arial'
          this.ctx.fillText(beginTime.substr(0, 4), 274, y1)
          this.ctx.fillText(beginTime.substr(5, 2), 328, y1)
          this.ctx.fillText(beginTime.substr(8, 2), 375, y1)
          this.ctx.fillText(endTime.substr(0, 2), 460, y1)
          this.ctx.fillText(endTime.substr(3, 2), 508, y1)

          const y2 = 320
           this._fixFontSize(title, 'title')
          this.ctx.fillText(title, 475, y2)
          
          const y3 = 478
          this.ctx.font = 'normal normal bold 22px Arial'
          this.ctx.fillText(sealTime.substr(0, 4), 534, y3)
          this.ctx.fillText(sealTime.substr(5, 2), 580,  y3)
          this.ctx.fillText(sealTime.substr(8, 2), 625,  y3)

          return (this.$refs['myCanvas'] as HTMLCanvasElement).toBlob((blob) => {
            resolve({
              name,
              imgData: blob
            })
          }, 'image/jpg')
        })
      }
    })
  }
  /**
   * 检查txt长度时候超出最大长度， 是的话就fontSize递归-1
   */
  private _fixFontSize(txt: string, type: string){
    const maxLenObj= {name: 88, title:  420}
    if (Object.prototype.hasOwnProperty.call(maxLenObj, type)){
      const font = this.ctx.font.split(' ')
      if (this.ctx.measureText(txt).width >= maxLenObj[type]){
        const fontSize = parseInt(font[1]) - 1
        this.ctx.font = `normal normal ${font[0]} ${fontSize}px ${font[2]}`
        this._fixFontSize(txt, type)
      } else {
        return 
      }
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