// pages/search/search.js
var app = getApp()
var config = require('../../libs/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: "",//当前城市
    line: "",//用户输入的线路
    lines: [] //搜索得到的线路集合
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.setData({
      city: options.city,
    })
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
  getLine() {
    var _this = this
    app.showLoading("搜索数据中")
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
        var lines = res.data.result
        var temp = []
        var linesTemp = []
        if (lines.length > 0) {
          for (var i = 0; i < lines.length; i++) {
            if (temp.indexOf(lines[i].transitno) == -1) {
              lines[i].startstation = lines[i].list[0].station;
              lines[i].endstation = lines[i].list[lines[i].list.length - 1].station
              temp.push(lines[i].transitno)
              linesTemp.push(lines[i]);
            }
          }
        }
        _this.setData({
          lines: linesTemp
        })
        console.log("搜索数据", _this.data.lines)
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        app.hideLoading()
      }
    })
  },
  setLine(e) {
    var _this = this
    var value = e.detail.value
    _this.setData({
      line: value
    })
  },
  search(e) {
    this.getLine()
  },
  jumpLineDetail(e) {
    var _this = this
    var line = e.currentTarget.dataset.line
    var station = e.currentTarget.dataset.station || ''
    var city = _this.data.city
    wx.navigateTo({
      url: '../lineDetail/lineDetail?line=' + line + '&city=' + city + '&station=' + station
    })
  },
})