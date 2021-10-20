<script lang='ts' setup>
  import {reactive, toRefs, ref, onMounted, computed, h, resolveComponent} from 'vue'
  import FormComponent from '/@/components/Form/index.vue'
  import TableComponent from '/@/components/Table/index.vue'
  import {useTable} from './useTable'
  import {useDialog} from './useDialog'
  import {crateTableDefaultRender, createBtnRender} from '/@/utils/table'

  const {tableLoading, tableData, getListData, page, size, total} = useTable()
  const {
    actionType,
    loading: dialogLoading,
    visible,
    title,
    formData: formDialogData,
    dialogFormRef,
    operationDataId,
    showFormDialog,
    buttonAct,
    dialogSubmit,
    hideFormDialog,
    remListDataOneFn,
    getTableSetFn,
  } = useDialog()
  
  const form = ref({})
  const searchFromConfig = ref([
    {label: '书名', prop: 'name', type: 'text', },
  ])


  const formDialogConfig = computed(() =>[
    {label: '用户名', prop: 'name', type: 'text',},
    {label: '密码', prop: 'router', type: 'text',},
    {label: '接口权限', prop: 'permission', type: 'text',},
  ])

  function handleNodeClick({id}: {id: string}){
    formDialogData.value.pid = id
  }

  const tableBtnRender = () => {
    const defaultRender = (scope: any) => {
      const editBtn = createBtnRender({tooltipContent: '编辑', icon: 'el-icon-edit', isRender: true, onClick: () => getTableSetFn(scope.row, 'edit')})
      const delBtn = createBtnRender({tooltipContent: '删除', icon: 'el-icon-delete', isRender: true, onClick: () => remListDataOneFn(scope.row, getListData)})
      return [editBtn, delBtn]
    }
    return crateTableDefaultRender({label: "操作", align: "center", width: "70"}, defaultRender)
  }

  const authRender = () => {
    const defaultRender = (scope: any) => {

    }
    return crateTableDefaultRender({}, defaultRender)
  }

  const tableConfig = ref([
    {attrOrProp: {label: '用户名', prop: 'username'}},
    {render: tableBtnRender},
  ])

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
    :page='page'
    :size='size'
    :total='total'
    :table-config='tableConfig'
    :get-list-data='getListData'
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
      v-model:form='formDialogData'
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