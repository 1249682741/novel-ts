import SparkMD5 from 'spark-md5'
import {uploadFragment, merge} from '/@/api/tools/upload'

const PRE_FILE_SIZE = 1024 * 1024 * 5 // 每个分片的大小
const PARALLEL_NUM = 3 // 分片请求的最大串行数量

class Upload {
  static instance:Upload|null = null

  /**
   * 通过计算文件内容, 得到文件专属的md5
   * @param file 
   */
  getFileMD5(file: File){
    return new Promise((resolve, reject) => {
      const spark = new SparkMD5.ArrayBuffer()
      const fileReader = new FileReader()
      fileReader.onload = (e: any) => {
        spark.append(e.target.result)
        resolve(spark.end())
      }
      fileReader.onerror = () => reject()
      fileReader.readAsArrayBuffer(file)
    })
  }

  /**
   * 分片
   * @param file 
   */
  async createFileChunk(file: File){
    try{
      const fileHash = await this.getFileMD5(file)
      let count = 0, chunkPromiseList:Function[] = []
      let {size} = file
      for(let i = 0; i < size; i+=PRE_FILE_SIZE){
        let chunk = file.slice(i, Math.min(i + PRE_FILE_SIZE, size))
        let chunkName = `${fileHash}_${count++}`
        chunkPromiseList.push(this.genUploadReq({chunk, chunkName, fileHash}))
      }
      return {chunkPromiseList, fileHash}
    }catch(err){console.log(err)}
  }

  /**
   * 串行发起分片请求
   * @param file 
   */
  async serial(file: File){
    const result = await this.createFileChunk(file)
    if (!result) return
    const {chunkPromiseList, fileHash} = result

    let regResult = /\w+$/.exec(file.name)
    let suffix =  regResult ? regResult[0]: ''

    const send:any = async () => {
      try{
        if (!chunkPromiseList.length) {
          const mergeResult = await this.merge({fileHash, suffix})
          return mergeResult
        } 
        let request = chunkPromiseList[0]
        await request()
        chunkPromiseList.shift()
        return send()
      } catch(err) {
        return err
      }
    }
    return send()
  }

  /**
   * 并行发起分片请求
   * @param file 
   */
  async parallel(file: File){
    const result = await this.createFileChunk(file)
    if (!result) return
    const {chunkPromiseList, fileHash} = result

    let regResult = /\w+$/.exec(file.name)
    let suffix =  regResult ? regResult[0]: ''

    let curRequestList:Function[] = []

    const send:any = async () => {
      try{
        while(curRequestList.length < PARALLEL_NUM && chunkPromiseList.length){
          let request = chunkPromiseList.shift() as Function
          curRequestList.push(request)
          await request()
          curRequestList.splice(curRequestList.indexOf(request), 1) 
          return send()
        }
        if (curRequestList.length == 0 && chunkPromiseList.length == 0) {
          return await this.merge({fileHash, suffix})
        }
      }catch(err) {
        console.log(err);
        return err
      }
    }
    return send()
  }


  /**
   * 上传的请求
   * @param param
   */
  genUploadReq({fileHash, chunk, chunkName}:any) {
    return () => {
      let formData = new FormData()
      formData.append('fileHash', fileHash as string)
      formData.append('chunk', chunk)
      formData.append('chunkName', chunkName)
      return uploadFragment(formData).then(res => res)
    }
  }

  /**
   * 可以合并分片的请求
   * @param param
   */
  async merge({fileHash, suffix}:any){
    if (!(fileHash && suffix)) return
    const data = {
      fileHash: fileHash,
      suffix: suffix
    }
    const result = await merge(data)
    if (result.status == 0){
      return result.data
    }
  }

  static getInstance() {
    return this.instance ? this.instance : (this.instance = new Upload(), this.instance)
  }
}

export default Upload.getInstance()
