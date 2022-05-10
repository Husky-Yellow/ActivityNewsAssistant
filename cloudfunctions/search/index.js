// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  const _ = db.command
  const res = await db.collection('article_list')
    .aggregate()
    .match(
      _.or([
        {
          article_title: db.RegExp({
            regexp: event.searchVal,
            options: 'i',
          }),
        },
        {
          article_content: db.RegExp({
            regexp: event.searchVal,
            options: 'i',
          })
        }
      ])
    )
    .project({
      article_cover: 1,
      article_title: 1,
      article_content: 1
    })
    .end()
  return res
}