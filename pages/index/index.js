//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    text: '',
    imageLists: []
  },
  fabu_text(e){
    this.setData({
      text: e.detail.value
    })
  },
  addImage(){
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        const tempFilePath = res.tempFilePaths[0];
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime()+'.png', // 上传至云端的路径
          filePath: tempFilePath, // 小程序临时文件路径
          success: res => {
            var lists = that.data.imageLists;
            lists.push(res.fileID)
            that.setData({
              imageLists: lists
            })
          },
          fail: console.error
        })
      }
    })
  },
  closeImage(e){
    let fileid = e.currentTarget.dataset.fileid;
    let that = this;
    wx.cloud.deleteFile({
      fileList: [fileid],
      success: res => {
        let imagelists = that.data.imageLists;
        let index = imagelists.indexOf(fileid);
        imagelists.splice(index,1);
        that.setData({
          imageLists: imagelists
        })
      },
      fail: console.error
    })
  },
  saveData(){
    let that = this;
    wx.cloud.callFunction({
      name: "saveData",
      data: {
        text: that.data.text,
        fileIDs: that.data.imageLists
      },
      success(res){
        wx.showToast({
          title: '发表成功',
          icon: 'success',
          duration: 2000
        })
        that.setData({
          text: '',
          imageLists: []
        })
      }
    })
  }
})
