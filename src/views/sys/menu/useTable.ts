import {ref, reactive, toRefs, toRef, onMounted, h} from 'vue'
import {del, list} from '/@/api/sys/menu'
import {GetListDataParams, Page} from '/@/types/table'
import {ERR_CODE} from '/@/enums'
import {ElMessage, ElMessageBox} from 'element-plus'

export function useTable(){

  const tableLoading = ref(false)
  const tableData = ref([])

  onMounted(() => {
    getListData()
  })

  let formClone = {}
  function getListData({form}: GetListDataParams = {}){
    
    let formParams = form ? form : formClone
    formClone = formParams

    tableLoading.value = true
    list({
      ...formParams,
    }).then((result) => {
      if (result.code == ERR_CODE.OK){
        const res = result.data

        tableData.value = res
      } else{
        ElMessage({
          showClose: true,
          message: result.message,
          type: 'error'
        })
      }
      tableLoading.value = false
    }).catch(err => {
      console.log(err)
    })
  }

  return {
    tableLoading,
    tableData,
    getListData,
  }
} 

