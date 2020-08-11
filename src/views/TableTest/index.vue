<template>
  <div>
    <Table :tableData='tableData' :tableConf='tableConf'></Table>
    <Pagination 
      :page.sync='limitQuery.current' 
      :limit.sync='limitQuery.size'
      :total='pageTotal'
      @pagination='getListData'
    />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import Table from '@/components/Table/index.vue'
import Pagination from '@/components/Pagination/index.vue'

@Component({components: {Table, Pagination}})
export default class TableTest extends Vue{
  private tableData = []
  private tableConf = [{
    prop: 'index',
    label: 'index'
  }]

  private limitQuery = {current: 1, size: 10}
  private pageTotal = 100
  private data = []

  created(){
    this.data = Array.from({length: 100}).map((item, index) => {
      return {
        index
      }
    })
    this.$nextTick(() => {
      console.log(this.limitQuery)
      this.getListData()
    })
  
  }

  getListData(){
    const data = Object.assign({}, this.limitQuery)
    this.tableData = this._getData(data)
  }

  _getData(data){
    return this.data.filter((item, index) => index < data.current * data.size && index >= (data.current - 1) * data.size)
  }
}
</script>