<script lang='ts'>
import {defineComponent, h} from 'vue'
import {crateTableDefaultRender, crateTableColRender} from '/@/utils/table'

interface ITableConfig {
  attrOrProp: object,
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
      const {attrOrProp, render} = item      
      return render ? render() : crateTableColRender(attrOrProp)
    })
  },
})
</script>