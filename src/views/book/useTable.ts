import {ref, reactive, toRefs, toRef, onMounted, h} from 'vue'
import {list} from '/@/api/sys/user'
import {GetListDataParams, Page} from '/@/types/table'
import {ERR_CODE} from '/@/enums'
import {ElMessage} from 'element-plus'

export function useTable(){

  const tableLoading = ref(false)
  const tableData = ref([])

  onMounted(() => {
    getListData()
  })

  const pageLimit = reactive({
    page: 1,
    size: 10,
    total: 0,
  })

  let formClone = {}


  function getListData({form, limit}: GetListDataParams = {}){
    let limitParams = {...pageLimit, ...limit}

    let formParams = form ? form : formClone
    formClone = formParams

    tableLoading.value = true
    list({
      ...formParams,
      ...limitParams
    }).then((result) => {
      if (result.code == ERR_CODE.OK){
        const {list, page, size, total} = result.data
        tableData.value = list
        pageLimit.total = total
        pageLimit.page = page
        pageLimit.size = size
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
    ...toRefs(pageLimit),
  }
} 

