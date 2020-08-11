<template>
  <div>
    <div class="tips-wrap">
      <div>1.在百度地图中获取编辑好的代码</div>
      <div>2.将代码复制到下面的输入框中</div>
      <div>3.点击确定按钮</div>
    </div>
    <div style="width:100%; height:770px; overflow:hidden">
      <div style="width: 100%; height:880px; margin: -70px 0 0 0">
        <iframe style='width: 100vw;height: 1040px' scrolling='no' src="http://api.map.baidu.com/lbsapi/createmap/index.html" frameborder="0"></iframe>
      </div>
    </div>
    <div style="width: 100%; height: 15px; background:#e8eefb"></div>
    <div class="title-wrap">请将上面复制的代码粘贴到输入框中</div>
    <div class="input-wrap">
      <el-input
        type='textarea'
        v-model='code'
        autosize='{minRows: 10}'
        placeholder="请粘贴上面复制的代码" 
      >
      </el-input>
      <el-button type='primary' plain size="mini">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class CollegeMap extends Vue{
  private code = ''
  
}
</script>

<style lang="scss" scoped>
.tips-wrap{
  padding: 10px;
  margin-bottom: 20px;
  font-size: 14px;
  display: inline-block;
  border:1px solid #409EFF;
}
.title-wrap{
  margin: 15px 0;
}
</style>