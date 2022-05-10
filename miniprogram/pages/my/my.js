const app = getApp()
Page({
  data: {
    userInfoData: ""
  },
  onLoad: async function (options) {
    this.openid = await app.getOpenid()
  },
  onShow: function() {
    // wx.getStorage({
    //   key: 'usedrInfo',
    //   success (res) {
    //     console.log(res.data)
    //   },
    //   fail (err) {
    //     wx.navigateTo({
    //       url: `../auth/auth`
    //     })
    //   }
    // })
  },
  getUserProfile: function (e) {
    wx.getUserProfile({
      desc: '展示用户信息',
      success: res => {
        console.log(res)
        this.setData({
          userInfoData: res.userInfo
        })
        // this.onSaveUserInfo(res.userInfo)
      }
    })
  },
  onSaveUserInfo:function(userInfo){
    console.log(app.globalData.userInfo = userInfo)
    db.collection('user')
      .where({ _id: this.openid })
      .count()
      .then(res => {
        if (res.total > 0) {
          //doc.update
          db.collection('user').doc(this.openid).update({
            data: userInfo
          }).then(res => console.log(res))
        } else {
          //doc.add
          db.collection('user').doc(this.openid).add({
            data: userInfo
          }).then(res => console.log(res))
        }
      })
    wx.navigateBack()
  }
  // getInfo: function() {
  //   let code = '';
  //   wx.login({
  //     success:(res) => {
  //         code = res.code;
  //     }
  //   });
  //   // 获取用户信息
  //   wx.getUserProfile({
  //     lang: 'zh_CN',
  //     desc: '用户登录',
  //     success: (res) => {
  //       let loginParams = {
  //         code: code,
  //         encryptedData: res.encryptedData,
  //         iv: res.iv,
  //         rawData: res.rawData,
  //         signature: res.signature
  //       };
  //      console.log(JSON.parse(loginParams.rawData))
  //     },
  //     // 失败回调
  //     fail: () => {
  //       // 弹出错误
  //       wx.showToast({
  //         icon: 'none',
  //         title: '已拒绝小程序获取信息'
  //       });
  //     }
  //   });
  // }
})