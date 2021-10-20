import { ElMessage, ElMessageBox } from 'element-plus'
import {ref, nextTick, h} from 'vue'
import {add, del, detail, edit} from '/@/api/sys/user'
import {ERR_CODE} from '/@/enums'

type TypeParams = 'add' | 'edit'

export function useDialog(){
  
  const actionType = ref('add')
  const loading = ref(false)
  const visible = ref(false)
  const title = ref('')
  const formData:any = ref({})
  const dialogFormRef = ref()
  const operationDataId = ref('')
  const buttonAct = ref(false)

  // 隐藏FormDialog
  function hideFormDialog(){
    visible.value = false
  }

  // 显示FormDialog  type:string  add|edit
  function showFormDialog(type: TypeParams) {
    const titleObj = {
      add: {
        title: '新增信息',
        func: _initFormDialogData
      }, 
      edit: {
        title: '编辑信息',
        func: getDetailData
      }
    }
    actionType.value = type
    title.value = titleObj[type].title
    titleObj[type].func()
    visible.value = true
  }

  function _initFormDialogData(){
    nextTick(() => {
      formData.value = {};
      dialogFormRef.value.formRef.resetFields()
    })

  }

  function getDetailData(){
    nextTick(async () => {
      try{
        loading.value = true
        dialogFormRef.value.formRef.clearValidate()
        const result = await detail(operationDataId.value)
        if (result.code === ERR_CODE.OK){
          const res = result.data
          formData.value = res
        } else{
          ElMessage({
            showClose: true,
            message: result.message,
            type: 'error'
          })
        }
      }catch(err){
        console.log(err)
      }finally{
        loading.value = false
      }
    })
  }


  // dialog的确定点击事件 
  function dialogSubmit (getListData: Function) {
    dialogFormRef.value.formRef.validate(async (valid: boolean) => {
      if (!valid) return false
      buttonAct.value = true
      actionType.value === 'add' ? await submitAddData(getListData) : await submitEditData(getListData)
      buttonAct.value = false
    })
  }

  // 提交 编辑数据
  async function submitEditData(getListData: Function){
    try{
      const result = await edit(formData.value)
      if (result.code === ERR_CODE.OK){
        getListData()
        hideFormDialog()
        ElMessage({
          showClose: true,
          message: '更新成功',
          type: 'success'
        })
      } else{
        ElMessage({
          showClose: true,
          message: result.message,
          type: 'error'
        })
      }
    }catch(err){
      console.log('edit err', err)
      ElMessage({
        showClose: true,
        message: '更新失败',
        type: 'error'
      })
    }
  }
  
  // 提交 更新数据
  async function submitAddData(getListData: Function){
    try{
      const result = await add(formData.value)
      if (result.code === ERR_CODE.OK){
        getListData()
        hideFormDialog()
        ElMessage({
          showClose: true,
          message: '新增成功',
          type: 'success'
        })
      } else{
        ElMessage({
          showClose: true,
          message: result.message,
          type: 'error'
        })
      }
    }catch(err){
      console.log('add err',err)
      ElMessage({
        showClose: true,
        message: '新增失败',
        type: 'error'
      })
    }
  }

  function remListDataOneFn({id}: {id: string}, getListData: Function){
    ElMessageBox.confirm(
      h('p', '确定要删除这条数据么?'),
      '删除警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
      .then(() => delListData(id, getListData))
      .catch(() => ElMessage({type: 'info', message: '取消删除', showClose: true}))
  }

  function delListData(id: string, getListData: Function) {
    del(id).then(result => {
      if (result.code == ERR_CODE.OK){
        getListData()
        ElMessage({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
      } else {
        ElMessage({
          showClose: true,
          message: result.message,
          type: 'error'
        })
      }
    })
  }

  function getTableSetFn({id}: {id: string}, type: TypeParams){
    operationDataId.value = id
    showFormDialog(type)
  }


  return {
    actionType,
    loading,
    visible,
    title,
    formData,
    dialogFormRef,
    operationDataId,
    showFormDialog,
    dialogSubmit,
    hideFormDialog,
    buttonAct,

    remListDataOneFn,
    getTableSetFn,
  }
}