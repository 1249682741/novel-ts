<template>
<div>
  <el-table
    :data="tableData"
    :border="true"
    size="mini"
    header-row-class-name="table-title"
    style="width: 100%"
    max-height="500"
    :default-sort="{ prop: 'date', order: 'descending' }"
  >
    <el-table-column
      v-for="(item, index) in tableConf"
      :prop='item.prop'
      :key="index"
      show-overflow-tooltip
      :sortable="item.sortable"
      :label="item.label"
    >
      <template slot-scope='scope'>
        <template v-html='renderHtml()'></template>  
      </template>  
    </el-table-column>
    <!-- <el-table-column show-overflow-tooltip label="操作" align="center" fixed="right" width="70">
      <div slot-scope="scope">
        <el-tooltip placement="top" effect="light">
          <div slot="content">编辑</div>
          <el-button
            icon="el-icon-edit"
            type="text"
            @click="getTableSetFn(scope.row.id)"
            size="mini"
          ></el-button>
        </el-tooltip>
        <el-tooltip placement="top" effect="light">
          <div slot="content">删除</div>
          <el-button
            icon="el-icon-delete"
            type="text"
            @click="remListDataOneFn(scope.row.id)"
            size="mini"
          ></el-button>
        </el-tooltip>
      </div>
    </el-table-column> -->
  </el-table>
</div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import Pagination from '@/components/Pagination/index.vue'
@Component({
  components: {Pagination}
})
export default class extends Vue {
  @Prop({required: true}) tableData 
  @Prop({required: true}) tableConf

  // 自定义渲染表格
  renderTableCell({row}, {prop, renderHtml}){
    console.log(prop, renderHtml)
    if (renderHtml && typeof renderHtml === 'function'){
      return renderHtml(row)
    }
    return row[prop]
  }

  renderHtml(){
    console.log(123)
    return 123
  }
}
</script>