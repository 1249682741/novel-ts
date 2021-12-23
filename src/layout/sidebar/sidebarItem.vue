<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import { isExternal } from '/@/utils/validate'
import sidebarItemLink from './sidebarItemLink.vue'
export default defineComponent({
  name: 'sidebarItem',
  components: {sidebarItemLink},
  props: {
    isCollapse: Boolean,
    item: {
      type: Object,
      default: () => {}
    },
    basePath: {
      type: String,
      default: ''
    },
    isFirstLevel: {
      type: Boolean,
      default: true
    }
  },
  setup(props:any){
    const {item, basePath} = toRefs(props)    

    const alwaysShowRootMenu = computed(() => item.value.meta && item.value.meta.alwayShow) 

    const showingChildNumber = computed(() => {
      if (!item.value.children || !item.value.children.length) return 0
      const showingChildren = item.value.children.filter((item: any) => !(item.meta && item.meta.hidden))
      return showingChildren.length
    })

    const theOnlyOneChild = computed(() => {
      if (showingChildNumber.value > 1) return null
      if (item.value.children){
        for(const child of item.value.children){
          if(!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }
      // if there is no children, return itself with path resolve,
      // becase this.basePath already contains item's path informataion
      return {...item.value, path: ''}
    })

    function resolvePath(routePath: string){
      if (isExternal(routePath)){
        return routePath
      }
      if (isExternal(basePath.value)){
        return basePath.value
      }
      if (!routePath) return basePath.value
      return `${basePath.value}/${routePath}`
    }
    
    return {
      alwaysShowRootMenu,
      theOnlyOneChild,
      resolvePath,
    }
  }
})
</script>

<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[isCollapse ? 'simple-mode' : 'full-mode', {'first-level': isFirstLevel}]"
  >
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <sidebar-item-link v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{'submenu-title-noDropdown': isFirstLevel}"
        > 
          <i v-if="theOnlyOneChild.meta.icon" class="icon" :class="theOnlyOneChild.meta.icon"/>
          <template #title>
            <span v-if="theOnlyOneChild.meta.title">{{theOnlyOneChild.meta.title}}</span>
          </template>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <el-sub-menu v-else popper-append-to-body :index="resolvePath(item.path)">
      <template #title>
        <i v-if="item.meta && item.meta.icon" class="icon" :class="item.meta.icon"></i>
        <span v-if="item.meta && item.meta.title">{{item.meta.title}}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item='child'
          :is-collapse='isCollapse' 
          :base-path='resolvePath(child.path)'
          :is-first-level="false"
          class="nest-menu"
        />
      </template>
    </el-sub-menu>
  </div>
</template>


<style lang="scss">
/*隐藏文字*/
.el-menu--collapse .el-sub-menu__title span {
  display: none;
}

/*隐藏 > */
.el-menu--collapse .el-sub-menu__title .el-sub-menu__icon-arrow {
  display: none;
}

.el-submenu.is-active > .el-submenu__title {
  color: $subMenuActiveText !important;
}

.full-mode {
  .nest-menu .el-submenu>.el-submenu__title,
  .el-submenu .el-menu-item {
    min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
  span{
    margin: 0 0 0 5px;
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      &>.el-submenu__title {
        padding: 0px !important;

        .el-submenu__icon-arrow {
          display: none;
        }

        &>span {
          visibility: hidden;
        }
      }
    }
  }
  span{
    margin: 0 0 0 5px;
  }
}
</style>