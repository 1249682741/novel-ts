/**
 * 正则表达式验证手机号码/固定电话
 * @param mobile string
 * @returns true|false
 */
export const validMobile = (mobile: string) => /^1[3|4|5|6|7|8|9]\d{9}$/.test(mobile) || /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(mobile)

/**
 * 验证两次输入的密码是否相同
 * @param pwd1 
 * @param pwd2 
 * @returns true|false
 */
export const validPasswordIsSame = (pwd1: string, pwd2: string) => {
  if (!pwd1 || !pwd2){
    return false
  }
  return pwd1 === pwd2
} 

/**
 * 正则表达式验证身份证号码
 * @param card string 15位数字|18位数组|17位数字+（x|X）
 * @returns true|false
 */
export const validIdentificationCard = (card: string) => /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(card)

/**
 * 正则表达式验证军官证
 * @param card 
 * 规则： 军/兵/士/文/职/广/（其他中文） + "字第" + 4到8位字母或数字 + "号"
 * 样本： 军字第2001988号, 士字第P011816X号
 */
export const validOffcialCard = (card: string) =>  /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/.test(card)

/**
 * 电子邮箱的校验
 * @param email string
 * @returns true|false
 */
export const validEmail = (email: string) => /^\w+([-_.]\w+)*@(\w+[-_.])+\w{2,4}$/.test(email)

/**
 * 强弱密码校验
 * 1、长度8-20位
 * 2、必须包含数字
 * 3、必须包含字母
 * 4、最小连续位数为4：Abcd、abcd、1234不允许
 * 5、可以包含常用特殊字符
 * 6、键盘横向方向规则
 * 7、键盘斜线方向规则
 */
export const validPwd = (pwd: string) => {
  let regex = /(?=.*[0-9])(?=.*[a-zA-Z]).{8,20}/
  // 字母连续规则
  let strReg = /(a(?=b)|b(?=c)|c(?=d)|d(?=e)|e(?=f)|f(?=g)|g(?=h)|h(?=i)|i(?=j)|j(?=k)|k(?=l)|l(?=m)|m(?=n)|n(?=o)|o(?=p)|p(?=q)|q(?=r)|r(?=s)|s(?=t)|t(?=u)|u(?=v)|v(?=w)|w(?=x)|x(?=y)|y(?=z)|z(?=a)){3}[a-z]/i
  // 数字连续规则
  let numReg = /(0(?=1)|1(?=2)|2(?=3)|3(?=4)|4(?=5)|5(?=6)|6(?=7)|7(?=8)|8(?=9)|9(?=0)){3}\d/
  // 键盘字母横向连续规则
  let keyboardHorizontalReg = /(q(?=w)|w(?=e)|e(?=r)|r(?=t)|t(?=y)|y(?=u)|u(?=i)|i(?=o)|o(?=p)|p(?=q) |a(?=s)|s(?=d)|d(?=f)|f(?=g)|g(?=h)|h(?=j)|j(?=k)|k(?=l)|l(?=a) | z(?=x)|x(?=c)|c(?=v)|v(?=b)|b(?=n)|n(?=m)|m(?=z)){3}[a-z]/i
  // 多个相同字母、数字规则
  let sameReg = /(\w)\1{3}/i

  /**
   * 键盘斜线的4个字符是否在pwd里面
   */
  function isStrInSlope(pwd: string){
    let keyboardSlopeArr = ["1qaz", "2wsx", "3edc", "4rfv", "5tgb", "6yhn", "7ujm", "8ik,","9ol.", "0p;/", "=[;.", "-pl,", "0okm", "9ijn", "8uhb", "7ygv", "6tfc", "5rdx", "4esz"]
    return keyboardSlopeArr.some(v => pwd.toLowerCase().indexOf(v) > -1)
  }

  if (regex.test(pwd)){
    if (sameReg.test(pwd)) {
      return '密码不能含有连续4位相同的数字或字母'
    } else if (strReg.test(pwd)){
      return '密码不能含有4位连续的字母'
    } else if (numReg.test(pwd)){
      return '密码不能含有4位连续的数字'
    } else if (keyboardHorizontalReg.test(pwd)){
      return '密码不能含有4位键盘横向方向连续的字母'
    } else if (isStrInSlope(pwd)){
      return '密码不能含有4位键盘斜向方向连续的字符'
    }
    return ''
  }
  return '您的密码复杂度太低（密码中必须包含字母、数字），请重新设置密码'
}

/**
 * 判断是否是外链
 * @param path 
 */
export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)
