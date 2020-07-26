<template>
  <el-container>
    <el-main class="wrap"> 
      <el-form 
        :model="form" 
        :rules='rules' 
        status-icon 
        ref="loginForm" 
        size="small" 
        label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" clearable ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input show-password v-model="form.password" clearable ></el-input>
        </el-form-item>
      </el-form>
      <el-button class="btn" type='primary' @click="submit" width='120px'>登录</el-button>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {isValidUsername, isValidPassword} from '@/utils/validate'
import { ElForm } from 'element-ui/types/form'
import * as UserModel from '@/api/User'
import {RequestResult} from '@/utils/request'

@Component
export default class Login extends Vue{
  private form = {
    username: '',
    password: ''
  }
  private rules = {
    username: [{validator: this.validateUsername, trigger: 'blur'}],
    password: [{validator: this.validatePassword, trigger: 'blur'}]
  }

  private validateUsername(rule: any, value: string, callback: Function){
    if (!isValidUsername(value)){
      callback(new Error('Please enter the correct user name'))
    } else {
      callback()
    }
  }

  private validatePassword(rule: any, value: string, callback: Function){
    if (!isValidPassword(value)){
      callback(new Error('Please enter the correct password'))
    } else {
      callback()
    }
  }

  private submit (){
    (this.$refs.loginForm as ElForm).validate((valid: boolean) => {
      console.log(valid)
      if (valid){
        UserModel.login({
          username: this.form.username,
          password: this.form.password
        }).then((result: RequestResult) => {
          if (result.code == 200){
            this.$message('ok')
          }
        })
      } else {
        return false
      }
    })
  }

} 
</script>

<style lang="scss" scoped>
  .wrap{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>