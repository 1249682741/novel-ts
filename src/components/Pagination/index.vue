<script lang='ts'>
import {defineComponent, reactive, toRefs, ref} from 'vue'

export default defineComponent({
  props: {
    total: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 10,
    }
  },
  emits: ['pagination'],
  setup(props, context) {
    function handleSizeChange(val: number) {
      context.emit('pagination', {page: props.page, size: val})
    }

    function handleCurrentChange(val: number) {
      context.emit("pagination", {page: val, size: props.size });
    }

    return {
      handleSizeChange,
      handleCurrentChange,
    }
  }
})
</script>

<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :page-size="size"
    :page-sizes="[10, 30, 50, 100]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  />
</template>