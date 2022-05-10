// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const total = (await db.collection('article_list').count()).total; //总数
  const list = (await db.collection('article_list')
  .orderBy('_updateTime', 'desc')
  .skip((event.page - 1) * event.size) // 跳过结果集中的前 10 条，从第 11 条开始返回
  .limit(event.size) // 限制返回数量为 10 条
  .get()).data

  return {
    list: list,
    total: total
  }
}