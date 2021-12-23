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
    showPagination: {type: Boolean, default: true},
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
  <el-table border size='mini' max-height='480' v-bind="$attrs" >
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
