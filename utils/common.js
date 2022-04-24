/**
 * 功能：获取当前日期  默认格式'2015-06-23 08:00'
 * @param {String} type （年月日分隔符）
 * @param {Boolean} isSeconds （是否需要秒）
 */
function getNowFormatDate(type = '-', isSeconds = false) {
  const handleFormat = (format) => {
    return (format < 10 ? '0' + format : format)
  }
  const date = new Date()
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()
  month = handleFormat(month)
  day = handleFormat(day)
  hours = handleFormat(hours)
  minutes = handleFormat(minutes)
  seconds = handleFormat(seconds)
  let time = year + type + month + type + day +
    ' ' + hours + ':' + minutes
  if (isSeconds) {
    time = time + ':' + seconds
  }
  console.log(time)
  return time
}

/**
 * 功能：将单引号'转成两个单引号''
 * @param {String} str （字符串）
 */
function setSymbol(str) {
  const newStr = str.replace(/\'/g, '\'\'')
  console.log(newStr)
  return newStr
}
/**
 * 功能：根据指定key排序数组对象
 * @param {Array} arr (要排序的数组)
 * @param {String} key (指定的key)
 * @param {Boolean} ascending (是否是升序)
 */
 function arraySort(arr = [], key = 'id', ascending = true) {
  return arr.sort((a, b) => {
    if (ascending) return b[key] - a[key];
    if (!ascending) return a[key] - b[key];
  });
}

module.exports = {
  getNowFormatDate,
  setSymbol,
  arraySort
}