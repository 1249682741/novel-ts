<script lang='ts'>
import {defineComponent, reactive, toRefs, ref, watch} from 'vue'
import useValidate from './useValidate'

export default defineComponent({
  props: {
    isInline: {
      type: Boolean,
      default: true
    },
    config: {
      type: Object,
      default: () => []
    },
    form: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['update:form'],
  setup(props, context) {

    const formRef = ref()

    return {
      formRef,
      ...toRefs(useValidate)
    }
  }
})
</script>

<template>
  <el-form ref='formRef' :inline='isInline' :model="form">
    <slot name='before' />
    <el-form-item v-for="item in config" :key="item.prop" :label='item.label'>
      <el-input
        v-if="isInput(item.type)"
        v-model="form[item.prop]" 
        :type='item.type'
        :placeholder="item.placeholder || ''" 
        rows='1'
        autosize
        clearable
        size='mini'
      />

      <el-select 
        v-if="isSelect(item.type)"
        v-model="form[item.prop]"
      >
        <el-option
          v-for="o in item.opts"
          :key="o[item.optValue || 'value']"
          :label="o[item.optLabel || 'label']"
          :value="o[item.optValue || 'value']"
        ></el-option>
      </el-select>

      <el-radio-group 
        v-if="isRadio(item.type)"
        v-model="form[item.prop]"
      >
        <el-radio 
          v-for="o in item.opts"
          :key="o[item.optValue || 'value']"
          :label="o[item.optValue || 'value']"
        >
          {{o[item.optLabel || 'label']}}
        </el-radio>
      </el-radio-group>

      <el-tree 
        v-if="isTree(item.type)"
        :data='item.treeData'
        :props="item.defaultTreeProps" 
        @node-click="item.handleNodeClick" 
      />
    </el-form-item>
    <slot name='after' />
  </el-form>
</template>

<style scoped lang='scss'>
  
</style>