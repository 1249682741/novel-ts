<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import sidebar from './sidebar/index.vue'
import navbar from './navbar/index.vue'
import tagsView from './tagsView/index.vue'
import { useStore } from "vuex"

export default defineComponent({
  components: {sidebar, navbar, tagsView},
  setup() {
    const store = useStore()

    let data = reactive({
      isActive: computed(() => store.state.appSetting.sidebar) 
    })

    function toggleClick(){
      store.commit('appSetting/toggleSidebar')
    }

    return {
      ...toRefs(data),
      toggleClick,
    }
  },
})
</script>

<template>
  <div class="layout" :class="{active: isActive}">
    <sidebar class="layout-left" :is-collapse='isActive'/>

    <div class="layout-right">
      <navbar :is-active='isActive' @toggle-click='toggleClick'/>
      <tags-view class="tags-view-wrap" />
      <main class="main-wrap">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.layout {
  width: 100vw;
  display: flex;
  flex-direction: row;
  .layout-left {
    flex: 0 0 auto;
    transition: width 0.28s;
  }
  .layout-right {
    flex: 1;
    transition: all 0.28s;
    overflow: hidden;

    .tags-view-wrap{
      width: 100%;
      height: 34px;
      background: #fff;
      border-bottom: 1px solid #d8dce5;
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
    }
    .main-wrap{
      padding: 16px;
    }
  }
}


</style>