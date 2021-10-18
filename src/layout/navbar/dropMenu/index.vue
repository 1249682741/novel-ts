<script lang='ts'>
import {defineComponent, reactive, toRefs} from 'vue'
import Avatar from '/@/assets/avatar-b.png'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'


export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    function logout(){
      store.dispatch('user/logout')
    }

    return {
      avatarImg: Avatar,
      logout
    }
  }
})
</script>

<template>
  <el-dropdown>
    <div class="row-wrap">
      <el-avatar around :src='avatarImg' />
      <i class="icon el-icon-arrow-down el-icon--right"></i>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang='scss'>
  .row-wrap{
    display: flex;
    flex-direction: row;
    align-items: center;
    .icon{
      margin: 0 0 0 10px;
    }
  }
</style>