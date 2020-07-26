function getBirthdayFromId (id){
  let day = id.substr(6,8)
  return day.substr(0,4)+'-'+day.substr(4,2)+'-'+day.substr(6,2)
}

function compareAge(birthday) {
  let birth = Date.parse(birthday);
  let eDate = Date.parse("2017-09-01")
  return birth < eDate
}

// let studentBirthday = getBirthdayFromId('441223201706170434')
// if (!compareAge(studentBirthday)) {
//   console.log("报名的幼儿必须是在2017年9月1日前出生")
//   return
// }


const isValidUsername = (str) => /\w{6,}/.test(str)
