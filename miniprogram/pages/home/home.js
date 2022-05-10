import utils from '../../utils/index'
Page({
  data: {
    nowDate: '',
    skeletionLoading: true,
    searchText: '',
    carouselList: [],
    informationList: [],
    total: 0,
    isHasData: true,
    pageObj: {
      page: 1,
      size: 6
    }
  },
  onShareAppMessage() {
    return {
      title: '活动线报助手，每天不定时更新最新线报',
      imageUrl: '../../images/logo.png'
    }
  },
  onLoad: async function () {
    this.setData({
      nowDate: utils.format(new Date(), 'YYYY-MM-DD')
    })
    await this.getCarouselList()
    await this.getInformationList()
  },
  // 监听用户下拉刷新事件
  onPullDownRefresh: async function () {
    const data = this.data
    this.setData({
      total: 0,
      isHasData: true,
      pageObj: {
        page: 1,
        size: 6
      },
      informationList: []
    })
    await this.getCarouselList()
    await this.getInformationList()
    wx.stopPullDownRefresh()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const self = this
    if (self.data.informationList.length >= self.data.total) {
      this.setData({
        isHasData: false
      })
      return
    }
    self.getInformationList()
  },
  getCarouselList: function () {
    wx.cloud.callFunction({
      name: 'carousel',
    }).then(res => {
      this.setData({
        carouselList: res.result.list
      })
    }).catch(err => {
      console.log(err)
    })
  },
  getInformationList: function () {
    const self = this
    wx.cloud.callFunction({
      name: 'information',
      data: self.data.pageObj
    }).then(res => {
      const list = res.result.list
      let newList = []
      if (list && list.length) {
        self.data.pageObj.page++
        list.forEach(v => {
          v.updateDate = utils.format(v._updateTime, 'YYYY-MM-DD')
          v.updateTime = utils.format(v._updateTime, 'HH:mm')
          v.article_content = utils.getSimpleText(v.article_content)
        })
        newList = [...self.data.informationList, ...list]
      }
      self.setData({
        informationList: newList,
        total: res.result.total,
        skeletionLoading: false
      })
    }).catch(err => {
      console.log(err)
    })
  },
  jumpDetailPage: function(e) {
    wx.navigateTo({
      url: `../article/article?id=${e.currentTarget.dataset.id}`
    })
  }
  // search: function () {
  //   wx.cloud.callFunction({
  //     name: 'search',
  //   }).then(res => {
  //     this.setData({
  //       informationList: res.result.list
  //     })
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // },
})