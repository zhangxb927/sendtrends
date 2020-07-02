// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let text = event.text;
  let fileIDs = event.fileIDs;
  let DB = cloud.database().collection('list');
  DB.add({
    data: {
      text: text,
      fileIDs: fileIDs
    }
  })
}