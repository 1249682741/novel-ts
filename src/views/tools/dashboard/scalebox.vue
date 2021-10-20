<script lang='ts'>
import {defineComponent, reactive, toRefs, ref, onMounted, onUnmounted} from 'vue'
import Screen from './screen.vue'
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
      let newScale = getScale()
      scaleBoxRef.value.style.setProperty("transform", `scale(${newScale}) translate(-50%, 0)`);
    }

    onMounted(() => {
      setScale()
      window.addEventListener('resize', setScale)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', setScale)
    })

    return {
      scaleBoxRef,
    }
  }
})
</script>

<template>
  <div class="scale-wrap">
    <div class="scale-box" ref="scaleBoxRef" :style="{width, height}">
      <Screen />
    </div>
  </div>
</template>

<style scoped lang='scss'>
  .scale-wrap{
    background: #03133f; // 背景颜色
    width: 100%;
    height: 5000px;
  }
  .scale-box{
  /* transform: scale(var(--scale)) translate(-50%, -50%); */
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