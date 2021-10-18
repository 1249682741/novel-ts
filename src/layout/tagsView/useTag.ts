import path from 'path';
import { computed, ref, watch, nextTick} from 'vue'
import { RouteRecordRaw, useRoute } from "vue-router"
import { useStore } from "vuex";
import { ITagView } from '/@/store/tagsView';
import { routes } from '/@/router'
import { moveToTarget } from "./useScrollBar";

export function initTag(){
  const store = useStore()
  const route = useRoute()
  
  const affixTags = ref([])
  
  // 记录访问记录
  const visitedView = computed(()=> store.state.tagsView.visitedViews)
  // 监听路由发生变化时的操作
  watch(route, () => {
    addTags()
    moveToCurrentTag()
  })


  const tagWrapRef = ref()
  function moveToCurrentTag(){
    nextTick(() => {
      let tagList = tagWrapRef.value.children
      for(const tag of tagList){
        let tagPath = (tag as HTMLElement).getAttribute('data-path')
        let tagFullPath = (tag as HTMLElement).getAttribute('data-fullPath')
        if (tagPath == route.path){
          // scrollbar 滑动到tag的那个未知
          // >>> todo
          moveToTarget(tag, tagList)
          // 当页面的参数不一致的时候 则更新数据
          if (tagFullPath != route.fullPath){
            store.dispatch('tagsView/updateVisitedView', route)
          }
          break
        }
      }
    })
  }

  function isAffix(tag: ITagView){
    return tag.meta && tag.meta.affix
  }

  function closeSelectedTag(){

  }
  
  function initTags(){
    affixTags.value = filterAffixTags(routes)
    for(const tag of affixTags.value){
      tag.name && store.dispatch('tagsView/addVisitedView')
    }
  }
  
  function filterAffixTags(routes: RouteRecordRaw[], basePath:string = '/'){
    let tags: ITagView[] = []
    routes.forEach(route => {
      if (route.meta && route.meta.affix) {
        const tagPath = path.resolve(basePath, route.path)
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: {...route.meta}
        })
      }
      if (route.children) {
        const childTags = filterAffixTags(route.children, route.path)
        if (childTags.length) {
          tags = [...tags, ...childTags]
        }
      }
    })
    return tags
  }
  
  function addTags(){
    const {name} = route
    name && store.dispatch('tagsView/addView', route)
  }
  
  function isActive(curRouter: ITagView){
    return  curRouter.path == route.path
  }
  
  return {
    visitedView,
    tagWrapRef,
    isAffix,
    closeSelectedTag,
    initTags,
    addTags,
    isActive,
  }
}

