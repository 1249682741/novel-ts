import {createStore} from 'vuex'
import { default as user} from './user'
import { default as appSetting} from './appSetting'
import { default as tagsView} from './tagsView'

const store  = createStore({
  modules: {
    appSetting,
    tagsView,
    user,
  }
})

export default store