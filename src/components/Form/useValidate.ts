import {reactive} from 'vue'

const validRegObj = {
  isInput: /text/,
  isSelect: /select/,
  isRadio: /radio/,
  isTree: /tree/,
}


function genValidFn(){
  let funcObj:any = reactive({})
  for(const [k, r] of Object.entries(validRegObj)){
    funcObj[k] = (type:string) => r.test(type)
  }
  return funcObj
}

export default genValidFn()