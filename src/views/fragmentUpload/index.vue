<template>
  <el-upload 
    class='upload-btn'
    action='' 
    :show-file-list='showFileList' 
    :multiple='multiple' 
    :before-upload="beforeUpload" 
    :http-request="importFile"
    :on-remove="onRemove"
    :file-list.sync="fileList"
    >
    <el-button size="mini" type="primary" plain icon="el-icon-upload2">{{btnName}}</el-button>
  </el-upload>
</template>

<script>
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import SparkMD5 from 'spark-md5'
import axios from 'axios'
import { login } from '@/api/User'

@Component
export default class extends Vue{
  @Prop() showFileList
  @Prop({default: false}) multiple
  @Prop() fileList
  @Prop() btnName


  fileHash = ''
  total = 0
  suffix = ''

  beforeUpload(file){
    if (/\.(pdf|xlsx|xls|doc|docx)$/i.test(file.name)) return true
    this.$message({ showClose: true, message: '请上传Pdf|Excel|Word文件', type: 'error'})
    return false
  }

  request = (url, data, headers = {}) => axios({
    url,
    method: 'post',
    data,
    headers,
  }).then(res => {
    if (res.status == 200) {
      return Promise.resolve(res.data)
    }
    return Promise.reject(res)
  })

  getFileMD5(file){
    return new Promise((resolve, reject) => {
      const spark = new SparkMD5.ArrayBuffer()
      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        spark.append(e.target.result)
        resolve(spark.end())
      }
      fileReader.onerror = () => reject('')
      fileReader.readAsArrayBuffer(file)
    })
  }

  async fragmentFile(file){
    const FRAGMENT_FILE_SIZE = 1024 * 1024 * 10
    let fileHash = await this.getFileMD5(file)
    let suffix = /\w+$/.exec(file.name)[0]
    let chunkList = [], total = 0
    // 开始切片
    for(let i = 0; i < file.size; i = i + FRAGMENT_FILE_SIZE){
      const tmp = file.slice(i, Math.min(i+FRAGMENT_FILE_SIZE, file.size))
      chunkList.push({
        chunk: tmp,
        chunkName: `${fileHash}_${total++}`
      })
    }
    this.fileHash = fileHash
    this.total = total
    this.suffix = suffix
    return {
      fileHash,
      chunkList,
    }
  }

  async importFile({file}){
    let result = await this.fragmentFile(file)
    const {fileHash, chunkList} = result
    let requestList = chunkList.map((item, index) => {
      return () => {
        let {chunk, chunkName} = item
        let formData = new FormData()
        formData.append('fileHash', fileHash)
        formData.append('chunk', chunk)
        formData.append('chunkName', chunkName)
        return this.request('http://localhost:3000/upload', formData).then(res => {
          console.log('request', res);
          return res
        })
      }
    })

    const send = () => {
      if(requestList.length > 0){
        let req = requestList[0]
        req().then(() => {
          requestList.shift()
          send()
        })
      } else {
        this.merger()
      }
    }

    send()
  }

  async merger(){
    let formData = new FormData()
    const result = await this.request('http://localhost:3000/merger', {
      fileHash: this.fileHash,
      suffix: this.suffix,
      total: this.total
    })
    console.log(result);
  }

  onRemove(){}
}
</script>