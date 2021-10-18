<script lang='ts' setup>
  import {reactive, toRefs, ref, onMounted, computed} from 'vue'
  import FormComponent from '/@/components/Form/index.vue'
  import TableComponent from '/@/components/Table/index.vue'
  import {useTable} from './useTable'
  import {useDialog} from './useDialog'
  import {typeOpts} from './constant'
  import {getObjFromArr} from '/@/utils'

  const {tableLoading, tableData, getListData} = useTable()
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
    {label: '菜单名称', prop: 'name', type: 'text', },
  ])

  const typeObj = ref(getObjFromArr(typeOpts))
  

  const formDialogConfig = computed(() =>[
    {label: '菜单名称', prop: 'name', type: 'text',},
    {label: '前端路由', prop: 'router', type: 'text',},
    {label: '接口权限', prop: 'permission', type: 'text',},
    {label: '菜单排序', prop: 'sort', type: 'text',},
    {label: '类型', prop: 'type', type: 'radio', opts: typeOpts},
    {label: '所属菜单', prop: 'pid', type: 'tree', treeData: tableData.value, defaultTreeProps: {label: 'name'}, handleNodeClick},
  ])

  function handleNodeClick({id}: {id: string}){
    formDialogData.value.pid = id
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
    :show-pagination='false'>
    <el-table-column show-overflow-tooltip prop="name" label="菜单名称"></el-table-column>
      <el-table-column prop="type" label="类型" width="68">
        <template #default='scope'>
          <el-tag
            :type="scope.row.type == '0' ? '' : 'warning'"
            disable-transitions
          >
            {{ typeObj[scope.row.type]}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="router" label="路由权限"></el-table-column>
      <el-table-column show-overflow-tooltip sortable prop="sort" label="排序"></el-table-column>
      <el-table-column label="操作" align="center" width="70">
        <template #default="scope">
          <el-tooltip placement="top" effect="light" content='编辑'>
            <el-button
              icon="el-icon-edit"
              type="text"
              @click="getTableSetFn(scope.row, 'edit')"
              size="mini"
            ></el-button>
          </el-tooltip>
          <el-tooltip placement="top" effect="light" content='删除'>
            <el-button
              icon="el-icon-delete"
              type="text"
              @click="remListDataOneFn(scope.row)"
              size="mini"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
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