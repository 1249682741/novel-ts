<template>
  <div>
    tag1
    <button @click="download">download</button>
    <canvas-img
      @myCanvas='getCanvas'
      :nameArr='nameArr' 
      :title="title"
      :beginTime='beginTime'
      :endTime='endTime'
      :sealTime='sealTime'
      :imgType='imgType'
      />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import CanvasImg from '@/views/CanvasImg/index.vue'
import { VueClass } from 'vue-class-component/lib/declarations'
@Component({
  components: {
    CanvasImg
  }
})
export default class Tag1 extends Vue{
  private nameArr = ['张三','李四','王五']
  private title = '河南工商系统2020培训'
  private beginTime = '2019-01-15'
  private endTime = '05-15'
  private sealTime = '2020-05-15'
  private imgType = 'jy'
  private canvas = null
  
  getCanvas(canvas){
    this.canvas = canvas
  }
  download(){
    console.log(this.canvas)
    this.canvas && this.canvas.downloadImg()
  }
}
</script>