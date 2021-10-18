<script lang='ts'>
import {defineComponent, reactive, toRefs} from 'vue'

export default defineComponent({
  props: {
    isActive: Boolean
  },
})
</script>

<template>
  <i :class="isActive ? 'el-icon-s-fold': 'el-icon-s-unfold'" />
</template>

<style scoped lang='scss'>
  
</style>