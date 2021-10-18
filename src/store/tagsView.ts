import { RouteLocationNormalizedLoaded, RouteRecordName } from 'vue-router'
import { ActionContext } from 'vuex'
import {Storage, VisitedViewsKey, CachedViewsKey} from '/@/utils/storage'

export interface ITagView extends Partial<RouteLocationNormalizedLoaded> {
  title ?: string | unknown
}

type State = {
  visitedViews: ITagView[],
  cachedViews: RouteRecordName[]
}

const state = () => {
  return {
    visitedViews: Storage.get(VisitedViewsKey, '[]'),
    cachedViews: Storage.get(CachedViewsKey, '[]'),
  }
}

const mutations= {
  // visited
  ADD_VISITED_VIEW(state: State, view: ITagView){
    if(state.visitedViews.some(v => v.path == view.path)) return
    state.visitedViews.push({...view, title: view.meta && view.meta.title || 'no-name'})
  },
  DEL_VISITED_VIEW(state: State, view: ITagView){
    for(const [i, v] of state.visitedViews.entries()){
      if (v.path == view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  // 删除 固定tags 外的所有tag
  DEL_OTHERS_VISITED_VIEWS(state: State, view: ITagView) {
    let affixTags = state.visitedViews.filter(tag => tag.meta && tag.meta.affix)
    state.visitedViews = affixTags
  },
  DEL_ALL_VISITED_VIEWS(state: State, view: ITagView) {
    let affixTags = state.visitedViews.filter(tag => tag.meta && tag.meta.affix)
    state.visitedViews = affixTags
  },
  // 这个干嘛的?
  UPDATE_VISITED_VIEW(state: State, view: ITagView) {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  },

  // cached
  Add_CACHED_VIEW(state: State, view: ITagView){
    const {name} = view
    if (!name) return
    if (state.cachedViews.includes(name)) return
    !(view.meta && view.meta.noChache) && state.cachedViews.push(name)
  },
  DEL_CACHED_VIEW(state: State, view: ITagView){
    const {name} = view
    if (!name) return
    const idx = state.cachedViews.indexOf(name)
    idx > -1 && state.cachedViews.splice(idx, 1)
  },
  DEL_OTHERS_CACHED_VIEWS(state: State, view: ITagView) {
    const {name} = view
    if (!name) return 
    const idx = state.cachedViews.indexOf(name)
    state.cachedViews = idx > -1 ? state.cachedViews.slice(idx, idx + 1): []
  },
  DEL_ALL_CACHED_VIEWS(state: State, view: ITagView) {
    state.cachedViews = []
  },

}

const actions = {
  addView({commit}: ActionContext<State, any>, view: ITagView){
    commit('ADD_VISITED_VIEW', view)
    commit('Add_CACHED_VIEW', view)
  },
  addVisitedView({commit}: ActionContext<State, any>, view: ITagView) {
    commit('ADD_VISITED_VIEW')
  },
  delView({commit}: ActionContext<State, any>, view: ITagView) {
    commit('DEL_VISITED_VIEW')
    commit('DEL_CACHED_VIEW')
  },
  delCachedView({commit}: ActionContext<State, any>, view: ITagView) {
    commit('DEL_CACHED_VIEW')
  },
  delOthersViews({commit}: ActionContext<State, any>, view: ITagView) {
    commit('DEL_OTHERS_VISITED_VIEWS')
    commit('DEL_OTHERS_CACHED_VIEWS')
  },
  delAllViews({commit}: ActionContext<State, any>, view: ITagView) {
    commit('DEL_ALL_VISITED_VIEWS')
    commit('DEL_ALL_CACHED_VIEWS')
  },
  updateVisitedView({commit}: ActionContext<State, any>, view: ITagView) {
    commit('UPDATE_VISITED_VIEW')
  },
}

export default {
  namespaced: true, 
  state, 
  mutations,
  actions,
}