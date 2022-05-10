import dayjs from 'dayjs'

const utils = {}
utils.getSimpleText = function (html) {
  const re1 = new RegExp("<.+?>", "g") //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
  const msg = html.replace(re1, '') //执行替换成空字符
  return msg
}
utils.format = function (time, formatType) {
  return dayjs(time).format(formatType || 'YYYY-MM-DD')
}
export default utils