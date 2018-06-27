// pages/lineDetail/lineDetail.js
var app = getApp()
var config = require('../../libs/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    line: "",
    city: "",
    station: "",
    lineDetail: [],
    lineDetailListLength: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    console.log("线路细节页面参数", options)
    _this.setData({
      city: options.city,
      line: options.line,
      station: options.station
    })
    wx.setNavigationBarTitle({
      title: _this.data.line
    })
    _this.getDetail()
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
  getDetail() {
    var _this = this
    app.showLoading("拉取数据中")
    wx.request({
      url: 'http://api.jisuapi.com/transit/line', //仅为示例，并非真实的接口地址
      data: {
        appkey: config.Config.busappkey,
        city: _this.data.city,
        transitno: _this.data.line
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.result.length > 0) {
          var lineDetail = res.data.result[0]
          var lineDetailListLength = res.data.result[0].list.length
          lineDetail.startstation = lineDetail.list[0].station
          lineDetail.endstation = lineDetail.list[lineDetailListLength - 1].station
          _this.setData({
            lineDetail: lineDetail,
            lineDetailListLength: lineDetailListLength
          })
        } else {
          wx.showToast({
            title: '暂无该线路数据，清稍后再试',
            icon: 'success',
            duration: 2000
          })
          wx.navigateBack({
            delta: 1
          })
        }
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        app.hideLoading()
      }
    })
  }
})