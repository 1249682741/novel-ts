<script lang='ts'>
import {computed, defineComponent, onMounted, reactive, ref, watch,} from 'vue'
import * as useScrollBar from './useScrollBar'
import * as useTag from './useTag'
import * as useMenu from './useMenu'

import { useRoute } from "vue-router"
import { ITagView } from '/@/store/tagsView'
import { useStore } from 'vuex'


export default defineComponent({
  setup() {
    const {visible, closeMenu, openMenu} = useMenu
    const {scrollbarRef, handleWheelScroll, handleScroll} = useScrollBar
    // 由于使用useState, 要调用方法, 确保useState是在setup调用
    const {tagWrapRef, visitedView, isActive, isAffix, closeSelectedTag, initTags, addTags} = useTag.initTag()

    onMounted(() => {
      initTags()
      addTags()
    })

    return {
      visitedView,
      tagWrapRef,
      isActive,
      isAffix,
      closeSelectedTag,
      openMenu,

      scrollbarRef,
      handleWheelScroll,
      handleScroll: handleScroll(closeMenu),
    }
  }
})
</script>

<template>
<div class="tags-view-container">
  <el-scrollbar 
    ref="scrollbarRef"
    class='tags-view-wrapper'
    @wheel='handleWheelScroll'
    @scroll='handleScroll'
  >
    <div class="row-wrap" ref='tagWrapRef'>
      <router-link
        :data-path='tag.path'
        :data-fullPath='tag.fullPath'
        tag="div"
        v-for="tag of visitedView" 
        :key="tag.path"
        :to="{path: tag.path, query: tag.query, fullPath: tag.fullPath}"
        class="tags-view-item"
        :class="isActive(tag) ? 'active' : ''"
        @click.middle="!isAffix(tag)?closeSelectedTag(tag):''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.meta.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </div>
  </el-scrollbar>
</div>
</template>

<style scoped lang='scss'>
  .row-wrap{
    display: flex;
    flex-direction: row;
  }

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;

        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
</style>