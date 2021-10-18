<script lang="ts">
import {computed, defineComponent, reactive, ref} from 'vue'
import {useRoute} from 'vue-router'
import {routes} from '/@/router'
import {filterRoutes} from '/@/utils/menu'
import sidebarItem from './sidebarItem.vue'

export default defineComponent({
  components: {sidebarItem},
  props: {
    isCollapse: Boolean,
  },
  setup(props, context){
    let newRoutes = filterRoutes(JSON.parse(JSON.stringify(routes)))
    
    const route = useRoute()
    const activeMenu = computed(() => {
      const {meta, path} = route
      return meta.activeMenu ? meta.activeMenu : path
    })

    return {
      newRoutes,
      activeMenu,
    }
  }
})
</script>

<template>
  <el-scrollbar>
    <el-menu
      class="el-menu-vertical-demo"
      :default-active='activeMenu'
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item
        v-for="route in newRoutes"
        :key="route.path"
        :item='route'
        :base-path='route.path'
        :is-collapse='isCollapse' 
      />
    </el-menu>
  </el-scrollbar>
</template>

<style scoped>
.el-menu{
  min-height: 100vh;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>

