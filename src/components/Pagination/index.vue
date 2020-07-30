<template>
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :page-sizes="[10, 15, 20, 30, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component
export default class Pagination extends Vue {
  @Prop({required: true}) total!: number
  @Prop({default: 1}) page !: number
  @Prop({default: 10}) limit !: number

  get currentPage () {
    return this.page
  }
  set currentPage (val) {
    this.$emit("update:page", val);
  }

  get pageSize() {
    return this.limit;
  }
  set pageSize(val) {
    this.$emit("update:limit", val);
  }

  handleSizeChange(val){
    this.$emit('pagination', {page: this.currentPage, limit: val})
  }

  handleCurrentChange(val){
    this.$emit("pagination", { page: val, limit: this.pageSize });
  }
}
</script>