<script lang="ts">
import {defineComponent} from 'vue'
import { isExternal } from '/@/utils/validate'
export default defineComponent({
  props: {
    to: {
      required: true
    }
  },
  setup(){
    return {
      isExternal
    }
  },
})
</script>

<template>
  <a v-if="isExternal(to)" :href="to" target="_blank">
    <slot />
  </a>
  
  <router-link v-else :to='to'>
    <slot />
  </router-link>
</template>