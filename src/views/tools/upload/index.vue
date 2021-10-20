<script lang='ts' setup>
  import {reactive, toRefs, ref} from 'vue'
  import Upload from '/@/utils/upload'
  
  /**
   * 分片上传大致思路
   * 通过File.slice() 函数对内容进行分片，
   * 然后通过 串行|并行 的方式进行上传分片即可。 
   * 等所有的分片上传完成后， 发送一个merge请求， 通知后端去合并所有分片。 生成文件，返回上传后的文件路径
   */

  const url = ref('')
  
  async function importFile({file}:any){
    // 串行
    // const result = await Upload.serial(file)

    // 并行
    const result = await Upload.parallel(file)
    console.log(result);
    url.value = result
  }

</script>

<template>
  <div>
    <span>分片上传</span>
    <el-upload
      class='upload-btn'
      action=''
      :show-file-list='false'
      :multiple='false'
      :http-request='importFile'
    >
      <el-button
        size="mini"
        type="primary"
        plain
        icon="el-icon-upload2"
        >导入</el-button>
    </el-upload>
  </div>
  <p><a :href="url" v-show="url">上传的文件</a></p>
</template>