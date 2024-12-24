/** 校验身份证号码格式 */
export function isIdNum(idNum) {
  // 18 位身份证号码的正则表达式
  let regIdNum = /^\d{6}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/
  // 如果通过该验证，说明身份证格式正确，但准确性还需计算
  if (regIdNum.test(idNum)) {
    let idNumWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2) // 将前 17 位加权因子保存在数组里
    let idNumY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2) // 这是除以 11 后，可能产生的 11 位余数、验证码，也保存成数组
    let idNumWiSum = 0 // 用来保存前 17 位各自乖以加权因子后的总和
    for (let i = 0; i < 17; i++) {
      idNumWiSum += idNum.substring(i, i + 1) * idNumWi[i]
    }
    let idNumMod = idNumWiSum % 11 // 计算出校验码所在数组的位置
    let idNumLast = idNum.substring(17) // 得到最后一位身份证号码

    // 如果等于 2，则说明校验码是 10，身份证号码最后一位应该是 X
    if (idNumMod == 2) {
      if (idNumLast == 'X' || idNumLast == 'x') {
        return true
      } else {
        return false
      }
    } else {
      // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
      if (idNumLast == idNumY[idNumMod]) {
        return true
      } else {
        return false
      }
    }
  } else {
    return false
  }
}
