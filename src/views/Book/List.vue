<template>
  <div>
    <el-form class="form" :model='form' label-width='50px'>
      <el-form-item class="input-item" label='链接'>
        <el-input v-model="form.bookUrl"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click="addBook">提交</el-button>
      </el-form-item>
    </el-form>

    <div class="nav-title">
      <span>小说列表</span>
      <div>
        <i :class="canDrag ? 'el-icon-circle-check' : 'el-icon-rank'" style="margin-right: 16px;"></i>
        <i class="el-icon-download" style="margin-right: 16px;" @click="updateListData"></i>
        <i :class="isDel ? 'el-icon-circle-check':'el-icon-delete'" @click="handleDel"></i>
      </div>
    </div>
    
    <div class="list-wrap" v-if="list.length>0" ref="list">
      <div 
        class="item-wrap" 
        v-for="(item, index) in list" 
        :key="item.id"
        @click="goCatalogPage(item.id)"
        :data-idx='index'
      >
        <div class="item">
          <el-image class="item-img" :src='item.img'></el-image>
          <span class="item-txt single-line-ellipsis">{{item.name}}</span>
          <i class="el-icon-delete item-del" v-show="isDel" @click.stop="delBook(index, item.id, item.name)"></i>
          <i class="item-num" v-if='!isDel && item.updateNum > 0'>{{item.updateNum}}</i>
        </div>
      </div>
    </div>
    <Loading v-if='loading'/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import * as BookModel from '@/api/Book'  
import {RequestResult} from '@/utils/request'

@Component
export default class BookList extends Vue{
  private form = {
    bookUrl: ''
  }
  private loading = false
  private list = []
  private isDel = false
  private canDrag = false

  crated(){
    this.getListData()
  }
  /**
   * 获取书本基本信息及未读章数
   */
  getListData() {
    this.loading = true
    BookModel.getBookList().then((result: RequestResult) => {
      if (result.code == 200){
        console.log(result.data)
        this.loading = false
        this.list = result.data
      }
    }).catch(err => {
      console.log(err)
      this.$message('未知错误')
    })
  }
  /**
   * 拉取更新小说
   */
  updateListData() {
    this.loading = true
    BookModel.updataBookList().then((result: RequestResult) => {
      if (result.code == 200){
        this.loading = false
        this.list = result.data
      }
    }).catch(err => {
      console.log(err)
      this.$message('未知错误')
    })
  }

  goCatalogPage (id: string) {
    !this.isDel && this.$router.push({name: 'book_catalog', params: {id}})
  }

  handleDel () {
    this.isDel = !this.isDel
  }

  /**
   * 删除小说
   */
  delBook(index: number, id: string, name: string){
    this.$confirm(`你确定不再追更《${name}》么`, '删除提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
        BookModel.delBook(id).then((result: RequestResult) => {
          if (result.code === 200){
            this.list.splice(index, 1)
          }
        }).catch(err => console.log(err))
      })
      .catch(() => console.log('you click cancel'))
  }

  /**
   * 添加小说
   */
  addBook() {
    this.loading = true
    BookModel.addBook({bookUrl: this.form.bookUrl}).then((result: RequestResult) => {
      if (result.code === 200){
        const res = result.data
        this.form.bookUrl = ''
        this.list.push({
          id: res.id,
          img: res.img,
          name: res.name,
          updateNum: 0
        })
      } else if (result.code === 10000){
        this.$message(result.message)
      }
      this.loading = false
    }).catch(err => {
      console.log(err)
      this.$message('未知错误')
    })
  }
}
</script>

<style lang="scss" scoped>
.form{
  display: flex;
  .input-item{
    width: 300px;
  }
}
.nav-title{
  width: 100%;
  font-size: 24px;
  margin: 16px 0;
  display:flex;
  justify-content: space-between;
}
.list-wrap{
  display: flex;
  flex-wrap: wrap;
  .item-wrap{
    flex: 1 0 160px;
    margin-bottom: 16px;
    display: flex;
    .item{
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .item-img{
      width: 144px;
      height: 192px;
    }
    .item-txt{
      width: 144px;
      margin-top: 8px;
      font-size: 15px;
      color: #333;
    }
    .item-del{
      position: absolute;
      right: -10px;
      top: -10px;
      background: rgba(255,255,255,0.8);
      padding: 5px;
      border-radius: 50%;
    }
    .item-num{
      position: absolute;
      right: -10px;
      top: -10px;
      padding: 5px;
      width: 15px;
      height: 15px;
      font-style: normal;
      color: #fff;
      background: rgb(245, 108, 108);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>