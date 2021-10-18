
<script lang="ts" setup>
import {reactive, ref, toRefs} from 'vue'
import {ERR_CODE} from '/@/enums'
import {ElMessage} from 'element-plus'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

let form = reactive({
  username: '',
  password: ''
})

const store = useStore()
const router = useRouter()

const submit = async () => {
  const result = await store.dispatch('user/login', form)
  if (result.code == ERR_CODE.OK) {
    ElMessage.success({showClose: true, message: '登录成功'})
    router.push({name: 'hello'})
  } else {
    ElMessage.error({showClose: true, message: result.message})
  }
}
</script>

<template>
  <div class='content'>
    <el-form :model='form' label-width='80px' class="form">
      <el-form-item label='用户名'>
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label='密  码'>
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <div class="btn-wrap">
        <el-button class="btn" type='primary' @click="submit">登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped lang='scss'>
.content{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #a0cfff;
}
.form {
  padding: 20px;
  width: 400px;
  height: 220px;
  background: #fff;
  .btn-wrap{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .btn{
      width: 100%;
    }
  }
}
</style>