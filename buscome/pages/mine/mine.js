var app = getApp()
// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    refresh: true,
    interval: 30
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.setUserInfo()
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
    this.setUserInfo()
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
  setUserInfo() {
    var _this = this
    //加载用户信息类
    if (_this.data.userInfo == null) {
      _this.setData({
        userInfo: app.globalData.userInfo
      })
    }
  },
  switchChange: function (e) {
    this.setData({
      refresh: e.detail.value
    })
    app.globalData.refresh = e.detail.value
  },
  sliderChange(e) {
    this.setData({
      interval: e.detail.value
    })
    app.globalData.interval = e.detail.value
  }
})