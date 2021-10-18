<script lang='ts'>
import {defineComponent, reactive, ref, toRefs, watch} from 'vue'
import { RouteLocationMatched, useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    let breadcrumbList = ref([] as RouteLocationMatched[])

    let route = useRoute()
    watch(() => route.matched, getBreadcrumb)

    function getBreadcrumb(){
      // 过滤出有title的匹配的路由
      breadcrumbList.value = route.matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }
    
    getBreadcrumb()

    return {
      breadcrumbList
    }
  }
})
</script>

<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="item in breadcrumbList" :key="item">{{item.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang='scss'>
  
</style>