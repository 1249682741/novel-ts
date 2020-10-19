const data = [
  {
    id: '0',
    code: '002',
    name: 'name2',
    children: []
  },
  {
    id: '1',
    code: '001',
    name: 'name1',
    children: [{
      id: '11',
      code: '0011',
      name: 'name1-1'
    }, {
      id: '12',
      code: '0012',
      name: 'name1-2'
    }]
  },
  {
    id: '2',
    code: '002',
    name: 'name2',
    children: []
  }
]

let result = []
deepFirstSearch(data, [], item => item['id'] == '1')

// 深度优先算法
// 
function deepFirstSearch(data: Array<object>, result: Array<object>, conditionFn: Function){
  if (typeof conditionFn != 'function') return 
  for(let item of data){
    let flag = false
    result.push(item)
    if (conditionFn()){
      flag = true
    }
    if (item['children'].length > 0){
      result.push({...result.pop(), children: []})
      deepFirstSearch(item['children'], result, conditionFn)
    } else if (!flag){
      result.pop
    }
  }
}