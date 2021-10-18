import {Storage, SliderBarKey} from '/@/utils/storage'


type State = {
  sidebar: Boolean,
}

const state = () => {
  return {
    sidebar: Storage.get(SliderBarKey) !== 'closed',
  }
}

const mutations= {
  toggleSidebar(state: State){
    state.sidebar = !state.sidebar
    Storage.set(SliderBarKey, state.sidebar ? 'opened': 'closed')
  }
}

const actions = {

}

export default {
  namespaced: true, 
  state, 
  mutations,
  actions,
}