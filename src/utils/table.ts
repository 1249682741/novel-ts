import {h, resolveComponent } from 'vue'

/**
 * 创建自定义el-table-column内容
 * @param attrOrProp el-talbe-column上的各种属性
 * @param render default插槽中的内容
 */
export const createTableColRender = (attrOrProp: Object = {}, render: Object | null = null) => h(resolveComponent('el-table-column'), attrOrProp, render)

interface createBtnRenderSettingParam {
  tooltipContent: string
  icon: string
  onClick: Function
  isRender?: boolean // 判断是否渲染 默认true
}

/**
 * 创建操作按钮
 * @param scope 插槽的接收参数
 * @param setting 
 */
export const createBtnRender = (setting: createBtnRenderSettingParam) => {
  const {tooltipContent, icon, onClick, isRender = true} = setting
  return h(
    resolveComponent('el-tooltip'), 
    {placement: "top", effect: "light", content: tooltipContent}, 
    () => h(resolveComponent('el-button'), {type: 'text', size: 'mini', icon, onClick}, null)
  )
}