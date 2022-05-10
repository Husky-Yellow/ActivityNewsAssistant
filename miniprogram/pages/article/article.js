// miniprogram/pages/article/article.js
import utils from '../../utils/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleInfo: null,
    skeletionLoading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInformationList(options)
  },
  onShareAppMessage() {
    return {
      title: this.data.articleInfo.article_title,
      imageUrl: this.data.articleInfo.article_cover
    }
  },
  getInformationList: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'articleInfo',
      data: {
        id: options.id
      }
    }).then(res => {
      wx.hideLoading()
      const data = JSON.parse(JSON.stringify(res.result.data))
      data.updateTime = utils.format(data._updateTime, 'YYYY-MM-DD HH:mm')
      this.setData({
        skeletionLoading: false,
        articleInfo: data
      })
    }).catch(err => {
      console.log(err)
    })
  },
  previewImage:function() {
    wx.previewImage({
      current: this.data.articleInfo.article_cover,
      urls: [this.data.articleInfo.article_cover]
    })
  }

})