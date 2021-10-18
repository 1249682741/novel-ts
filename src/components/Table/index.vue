<script lang='ts'>
import {defineComponent, reactive, toRefs, ref} from 'vue'
import Pagination from '/@/components/Pagination/index.vue'
import { Page } from '/@/types/table'
import CreateCol from './createCol.vue'

export default defineComponent({
  components: {Pagination, CreateCol},
  props: {
    total: {type: Number, default: 0},
    page: {type: Number, default: 1},
    size: {type: Number, default: 10},
    loading: {type: Boolean, default: false},
    data: {type: Array, default: () => []},
    showPagination: {type: Boolean, default: true},
    treeProps: {type: Object, default: {}},
    rowKey: {type: String, default: ''},
    tableConfig: {type: Array, default: () => []},
    getListData: {type: Function, default: () => {}}
  },
  setup(props, context) {
    
    function pagination(limit: Page){
      props.getListData({limit})
    }

    return {
      pagination,
    }
  }
})
</script>

<template>
  <el-table :lading='loading' :data='data' border size='mini' :tree-props='treeProps' :row-key='rowKey' max-height='480'>
    <slot>
      <CreateCol :table-config='tableConfig'/>
    </slot>
  </el-table>
  <Pagination v-if="showPagination" class="mt20" :total='total' :page='page' :size='size' @pagination='pagination'/>
</template>

<style lang="scss" scoped>
.mt20{
  margin: 20px 0 0;
}
</style>
