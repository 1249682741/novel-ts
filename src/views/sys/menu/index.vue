<script lang='ts' setup>
  import {reactive, toRefs, ref, onMounted, computed, h} from 'vue'
  import FormComponent from '/@/components/Form/index.vue'
  import TableComponent from '/@/components/Table/index.vue'
  import {useTable} from './useTable'
  import {useDialog} from './useDialog'
  import {typeOpts, isShowOpts} from './constant'
  import {getObjFromArr} from '/@/utils/index'
import { createTableColRender, createBtnRender } from '/@/utils/table'

  const {tableLoading, tableData, getListData} = useTable()
  const {
    actionType,
    loading: dialogLoading,
    visible,
    title,
    formData,
    dialogFormRef,
    operationDataId,
    showFormDialog,
    buttonAct,
    dialogSubmit,
    hideFormDialog,
    remListDataOneFn,
    getTableSetFn,
  } = useDialog()
  
  // 列表的搜索条件
  const form = ref({})
  const searchFromConfig = ref([
    {label: '菜单名称', prop: 'name', type: 'text', },
    {label: '菜单名称', prop: 'name', type: 'text', },
    {label: '菜单名称', prop: 'name', type: 'text', },
    {label: '菜单名称', prop: 'name', type: 'text', },
  ])

  // 定义类型转换
  const typeObj = getObjFromArr(typeOpts)

  // 类型的渲染
  const typeRender = () => {
    const defaultRender = (scope: any) => {
      let type = scope.row.type
      const spanTxt = h('span', {}, typeObj[type])
      return [spanTxt]
    }
    return createTableColRender({label: '类型'}, {default: defaultRender})
  }

  // 操作按钮的渲染
  const tableBtnRender = () => {
    const defaultRender = (scope: any) => {
      const editBtn = createBtnRender({tooltipContent: '编辑', icon: 'el-icon-edit', isRender: true, onClick: () => getTableSetFn(scope.row, 'edit')})
      const delBtn = createBtnRender({tooltipContent: '删除', icon: 'el-icon-delete', isRender: true, onClick: () => remListDataOneFn(scope.row, getListData)})
      return [editBtn, delBtn]
    }
    return createTableColRender({label: "操作", align: "center", width: "70"}, {default: defaultRender})
  }

  // 列表表格渲染
  const tableConfig = ref([
    {label: '菜单名称', prop: 'name'},
    {render: typeRender},
    {label: '路由权限', prop: 'router'},
    {label: '排序', prop: 'sort'},
    {render: tableBtnRender},
  ])
  
  // 弹窗配置
  const formDialogConfig = computed(() =>[
    {label: '菜单名称', prop: 'name', type: 'text',},
    {label: '前端路由', prop: 'router', type: 'text',},
    {label: '接口权限', prop: 'permission', type: 'text',},
    {label: '文件路径', prop: 'path', type: 'text',},
    {label: '菜单排序', prop: 'sort', type: 'text',},
    {label: '类型', prop: 'type', type: 'radio', opts: typeOpts},
    {label: '是否显示', prop: 'isShow', type: 'radio', opts: isShowOpts},
    {label: '所属菜单', prop: 'pid', type: 'tree', treeData: tableData.value, defaultTreeProps: {label: 'name'}, handleNodeClick},
  ])

  function handleNodeClick({id}: {id: string}){
    formData.value.pid = id
  }

</script>

<template>
  <div>
    <div class="header-btn-wrap">
      <el-button size="mini" type="primary" plain icon="el-icon-plus" @click="showFormDialog('add')">新增</el-button>
    </div>

    <form-component v-model:form='form' :config='searchFromConfig'>
      <template #after>
        <el-button plain type='primary' size='mini' icon="el-icon-search" @click="getListData({form})">查询</el-button>
      </template>
    </form-component>
  </div>

  <table-component 
    :data='tableData' 
    :loading='tableLoading'
    row-key='id'
    :tree-props="{ children: 'children', hasChildren: 'hasChild' }"
    :show-pagination='false'
    :table-config='tableConfig'
  >
  </table-component>

  <!-- 新增编辑 --> 
  <el-dialog 
    :title="title"
    v-model="visible"
    :close-on-click-modal='false'
    width="500px"
  >
    <form-component
      ref='dialogFormRef'
      v-loading='dialogLoading'
      v-model:form='formData'
      :config='formDialogConfig'
      :inline='false'
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hideFormDialog" size="mini">取 消</el-button>
        <el-button
          plain
          type="primary"
          size="mini"
          @click="dialogSubmit(getListData)"
          :disabled="buttonAct"
          :loading="buttonAct"
        >确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>