import {TokenKey, Storage} from '/@/utils/storage'
import {login} from '/@/api/login'
import {ERR_CODE} from '../enums'
import {ElMessage} from 'element-plus'
import { ActionContext } from 'vuex'
import router from '../router'

type State = {
  token: string
}

const state = () => {
  return {
    token: Storage.get(TokenKey),
  }
}
const mutations = {
  setToken(state: State, token: string){
    state.token = token
    Storage.set(TokenKey, token)
  },
}
const actions = {
  async login({commit}: ActionContext<State, any>, form: object) {
    try{
      const result:any = await login(form)
      if (result.code == ERR_CODE.OK){
        const {token} = result.data
        commit('setToken', token)
      } else {
        ElMessage.error({message: result.message, showClose: true})
      }
      return Promise.resolve(result)
    }catch(err){
      return Promise.reject(err)
    }
  },
  logout({commit}: ActionContext<State, any>){
    commit('setToken', null)
    router.push({name: 'login'})
  }
}

export default {
  namespaced: true,
  state, 
  mutations,
  actions,
}