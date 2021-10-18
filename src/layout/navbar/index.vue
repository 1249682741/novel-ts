<script lang='ts'>
import {defineComponent, reactive, ref, toRefs} from 'vue'
import hamburger from "./hamburger/index.vue"
import breadcrumb from "./breadcrumb/index.vue"
import dropMenu from "./dropMenu/index.vue"

export default defineComponent({
  components: { hamburger, breadcrumb, dropMenu},
  props: {
    isActive: Boolean,
  },
  emits: ['toggleClick'],
  setup(props, context) {
    function toggleClick(){
      context.emit('toggleClick')
    }

    return {
      toggleClick,
    }
  }
})
</script>

<template>
  <div class="wrap row-wrap">
    <div class="row-wrap">
      <hamburger :is-active='isActive' @click="toggleClick" />
      <breadcrumb class="breadcrumb-wrap"/>
    </div>
    <drop-menu />
  </div>
</template>

<style scoped lang='scss'>
  .row-wrap{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .wrap{
    padding: 8px 16px;
    justify-content: space-between;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  }
  .breadcrumb-wrap{
    margin: 0 0 0 10px;
  }
</style>