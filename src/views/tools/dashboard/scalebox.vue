<script lang='ts'>
import {defineComponent, reactive, toRefs, ref, onMounted} from 'vue'
import Screen from './content.vue'
export default defineComponent({
  components: {Screen},
  props: {
    width: {
      type: Number,
      default: 1920,
    },
    height: {
      type: Number,
      default: 1080
    }
  },
  setup(props) {
    const scaleBoxRef = ref()

    function getScale(){
      let ww = window.innerWidth / props.width
      let wh = window.innerHeight / props.height
      return Math.min(ww, wh)
    }

    function setScale(){
      scaleBoxRef.value.style.setProperty("--scale", getScale());
    }

    onMounted(() => {
      setScale()
      window.addEventListener('resize', setScale)
    })

    return {
      scaleBoxRef,

    }
  }
})
</script>

<template>
  <div class="wrap">
    <div class="scale-box" ref="scaleBoxRef" :style="{width, hegiht}">

    </div>
  </div>
</template>

<style scoped lang='scss'>
  .wrap{
    background: #03133f; // 背景颜色
    width: 100%;
    height: 5000px;
  }
  .scale-box{
     /* transform: scale(var(--scale)) translate(-50%, -50%); */
  transform: scale(var(--scale)) translate(-50%, 0);
  display: flex;
  height: 100%;
  flex-direction: column;
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  /* top: 50%; */
  transition: 0.3s;
  z-index: 999;
  }
</style>