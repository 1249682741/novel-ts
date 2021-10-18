<script setup lang="ts">
import { log } from 'util'
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
const router = useRouter()

const spanRef = ref()
const spanParentRef = ref()

onMounted(() => {
  console.log(spanParentRef.value.children)
  console.log(spanRef);
})


</script>

<template>
  <div>Hello World</div>
  <div ref='spanParentRef'>
    <span ref="spanRef" v-for="item in 20" :key="item">{{item}}</span>
  </div>
</template>