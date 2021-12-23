<script lang='ts'>
import {defineComponent} from 'vue'
import {createTableColRender} from '/@/utils/table'

interface ITableConfig {
  render?: Function
}

export default defineComponent({
  props: {
    tableConfig: {
      type: Array,
      default: () => []
    }
  },
  render(){
    return (this.tableConfig as ITableConfig[]).map((item) => {
      const {render} = item      
      return render ? render() : createTableColRender(item)
    })
  },
})
</script>