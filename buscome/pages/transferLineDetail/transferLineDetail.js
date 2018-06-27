// pages/transferLineDetail/transferLineDetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    transit: null,
    start: null,
    end: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.setDatt(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  setDatt(options) {
    var _this = this
    app.showLoading("加载中")
    var transit = JSON.parse(options.transit)
    var start = JSON.parse(options.start)
    var end = JSON.parse(options.end)

    //设置标题
    wx.setNavigationBarTitle({
      title: start.name + ' - ' + end.name
    })

    for (var i = 0; i < transit.segments.length; i++) {
      var bus = transit.segments[i].bus
      var buslines = bus.buslines
      if (buslines.length > 0) {//判断是否有公交一项
        var busline = {}
        if (buslines.length > 0) {
          busline = buslines[0]
        }
        //处理巴士显示名字
        busline.name = busline.name.substring(0, busline.name.indexOf('('))
        bus.busline = busline
        bus.type = 1 //1为公交
        if (buslines.length > 0 && busline.type == "地铁线路") {
          bus.type = 2 //2为地铁
        }
      }
    }
    _this.setData({
      transit: transit,
      start: start,
      end: end
    })
    app.hideLoading()
    console.log("++++", transit)
  },
  jumpLineMap(e) {
    console.log(e)
    var start = e.currentTarget.dataset.start
    var end = e.currentTarget.dataset.end
    var transit = e.currentTarget.dataset.transit
    wx.navigateTo({
      url: '../transferLineDetailMap/transferLineDetailMap?start=' + JSON.stringify(start) + '&end=' + JSON.stringify(end) + '&transit=' + JSON.stringify(transit)
    })
  }
})