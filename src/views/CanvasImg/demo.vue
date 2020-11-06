<template>
  <div>
    <button @click="download">download</button>
    <div>
      <button @click="getImg">getImg</button>
      <img :src="canvasImgSrc" v-if='canvasImgSrc.length > 0' />
    </div>

    <canvas-img
      @myCanvas='getCanvas'
      :canvasData='canvasData'
      :imgInfo='imgInfo'
      />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import CanvasImg from './index.vue'

@Component({
  components: {
    CanvasImg
  }
})
export default class Tag1 extends Vue{
  private canvasData = [
    {
      name : '张三',
      title : '河南工商系统2020培训',
      beginTime : '2019-01-15',
      endTime : '2020-05-15',
      sealTime : '2020-05-15'
    },{
      name : '李四',
      title : '河南工商系统2020培训',
      beginTime : '2019-01-15',
      endTime : '05-15',
      sealTime : '2020-05-15'
    }
  ]
  private imgInfo = {
    school: 'dbs',
    type: 'jy'
  }

  private canvas = null
  
  private canvasImgSrc = ''

  mounted(){
    this.$nextTick(() => {
      this.getImg()
    })
  }
  
  // 获取CanvasImg实例， 以便调用其中的方法
  getCanvas(canvas){
    this.canvas = canvas
  }
  download(){
    console.log(this.canvas)
    this.canvas && this.canvas.downloadImg()
  }
  getImg(){
    this.canvasData = [{
      name : '张三',
      title : '河南工商系统2020培训培训',
      beginTime : '2019-01-15',
      endTime : '2020-05-15',
      sealTime : '2020-05-15'
    }]
    if (this.canvas){
      this.canvas.getCanvasImg().then(res => {
        this.canvasImgSrc = res
      })
    }
    
  }
}
</script>