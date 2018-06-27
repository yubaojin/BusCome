// pages/linesShow/linesShow.js
var config = require('../../libs/config.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: "",
    station: "",
    lines: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var _this = this
    _this.setData({
      city: options.city,
      station: options.station
    })
    wx.setNavigationBarTitle({
      title: _this.data.station
    })
    _this.getStationList()
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
  getStationList() {
    var _this = this
    app.showLoading("拉取路线列表")
    // 调用接口
    wx.request({
      url: 'http://api.jisuapi.com/transit/station', //仅为示例，并非真实的接口地址
      data: {
        appkey: config.Config.busappkey,
        city: _this.data.city,
        station: _this.data.station
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("拉取线路中", res);
        var lines = res.data.result
        var transitnos = []
        var linestemp = []
        for (var i = 0; i < lines.length; i++) {
          if (transitnos.indexOf(lines[i].transitno) == -1) {
            transitnos.push(lines[i].transitno)
            linestemp.push(lines[i])
          }
        }
        _this.setData({
          lines: linestemp
        })
        console.log(_this.data.lines)

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        app.hideLoading()
        // console.log(res);
      }
    })
  },
  jumpLineDetail(e) {
    var _this = this
    var line = e.currentTarget.dataset.line
    var city = _this.data.city
    var station = _this.data.station
    wx.navigateTo({
      url: '../lineDetail/lineDetail?line=' + line + '&city=' + city + '&station=' + station
    })
  }
})