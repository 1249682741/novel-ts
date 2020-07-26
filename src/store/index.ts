import Vue from 'vue'
import Vuex from 'vuex'
import { ITagsViewState } from './module/tags-view'

Vue.use(Vuex)

export interface RootState {
  tagsView: ITagsViewState;
}

export default new Vuex.Store<RootState>({})

// export default new Vuex.Store({
//   state: {
//     bookList: []
//   },
//   mutations: {
//     setBookList(state, bookList){
//       state.bookList = bookList
//     }
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
