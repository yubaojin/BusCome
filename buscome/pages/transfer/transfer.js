// pages/transfer/transfer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: null,
    end: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  chooseLocation(e) {
    var _this = this
    var type = e.currentTarget.dataset.type
    wx.chooseLocation({
      success(res) {
        if (res.name) {
          var obj = {}
          obj.name = res.name
          obj.title = res.name
          //标题限制长度
          var len = 8
          if (res.name.length > len) {
            obj.title = res.name.substring(0, len) + '...'
          }
          obj.longitude = res.longitude
          obj.latitude = res.latitude
          if (type == "start") {
            _this.setData({
              start: obj
            })
          } else if (type == "end") {
            _this.setData({
              end: obj
            })
          }
        }
        //判断是否该跳入查询页面
        _this.jumpToTransferLines()
      },
      fail(res) {
        console.log(res)
      },
      complete(res) {
        // console.log(res)
      }
    })
  },
  //判断是否该跳入查询页面
  jumpToTransferLines() {
    var _this = this
    var start = _this.data.start
    var end = _this.data.end
    if (start && end) {
      wx.navigateTo({
        url: '../transferLines/transferLines?start=' + JSON.stringify(start) + "&end=" + JSON.stringify(end)
      })
    }
  }
})