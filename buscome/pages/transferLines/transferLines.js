// pages/transferLines/transeferLines.js
var app = getApp()
var config = require('../../libs/config.js');
var amap = require('../../libs/amap/amap-wx.js');
var Amap;
var QQMapWX = require('../../libs/qqmap/qqmap-wx.js');
var qqmap;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    locationInfo: {},//当前地理位置信息
    start: {},//起点
    end: {},//终点
    transits: [],//查询线路
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    //设置好起始点和终点
    _this.setData({
      start: JSON.parse(options.start),
      end: JSON.parse(options.end)
    })
    var start = _this.data.start
    var end = _this.data.end
    //设置标题
    wx.setNavigationBarTitle({
      title: start.name + ' - ' + end.name
    })

    Amap = new amap.AMapWX({
      key: config.Config.amapkey
    });
    qqmap = new QQMapWX({
      key: config.Config.qqmapkey
    })

    //得到地理位置信息
    _this.getLocationInfo()

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
  //标签栏切换
  changeType(e) {
    var _this = this
    var type = parseInt(e.currentTarget.dataset.type)
    _this.setData({
      type: type
    })
    _this.getBusLines()
  },
  getBusLines() {
    var _this = this
    app.showLoading("加载线路中")
    var locationInfo = _this.data.locationInfo
    var start = _this.data.start
    var end = _this.data.end
    Amap.getTransitRoute({
      origin: start.longitude + ',' + start.latitude,
      destination: end.longitude + ',' + end.latitude,
      city: locationInfo.city,
      strategy: _this.data.type, //0：最快捷模式;1：最经济模式;2：最少换乘模式;3：最少步行模式;5：不乘地铁模式
      success: function (data) {
        console.log("当前线路结果", data)
        var transits = data.transits
        if (transits.length > 0) {
          for (var i = 0; i < transits.length; i++) {
            var transit = transits[i];
            var segments = transit.segments
            var title = [];//显示标题
            var type = 2; //1位公交 2位地铁 只要有公交就显示公交 没有公交就显示地铁
            //循环段落
            for (var j = 0; j < segments.length; j++) {
              var buslines = segments[j].bus.buslines
              //如果是公交 值type位1
              if (buslines.length > 0 && buslines[0].type == "普通公交线路") {
                type = 1
              }
              //得到展示标题
              //标题展示长度
              var len = 3 //限制标题长度
              if (buslines.length > 0) {
                title.push(buslines[0].name.substring(0, buslines[0].name.indexOf('(')))
              }
            }
            var name = title.join("->")
            transits[i].title = name
            transits[i].type = type
            transits[i].duration = parseInt(parseInt(transits[i].duration) / 60)
          }
          _this.setData({
            transits: transits
          })
          app.hideLoading()
        } else {
          app.hideLoading()
          wx.showToast({
            title: '没有找到合适的乘车方案,请更换地址',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function (info) {
        console.log(info)
        app.hideLoading()
      }
    })
  },
  /**
   * 得到经纬度和城市
   */
  getLocationInfo() {
    var _this = this
    app.showLoading("拉取路线列表")
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var locationInfo = _this.data.locationInfo
        locationInfo.latitude = res.latitude
        locationInfo.longitude = res.longitude
        // 调用接口
        qqmap.reverseGeocoder({
          location: {
            latitude: locationInfo.latitude,
            longitude: locationInfo.longitude
          },
          success: function (res) {
            // console.log("地址", res)
            locationInfo.city = res.result.address_component.city
            locationInfo.address = res.result.formatted_addresses.recommend
            _this.setData({
              locationInfo: locationInfo
            })
            _this.getBusLines()
          },
          fail: function (res) {
            console.log(res);
            app.hideLoading(locationInfo)
          },
          complete: function (res) {
            // complete
            // console.log(_this.data.locationInfo)
            app.hideLoading()
          }
        })
      }
    })
  },
  jumpTransferLineDetail(e) {
    var _this = this
    var start = _this.data.start
    var end = _this.data.end
    var transit = e.currentTarget.dataset.transit
    wx.navigateTo({
      url: '../transferLineDetail/transferLineDetail?transit=' + JSON.stringify(transit) + '&start=' + JSON.stringify(start) + '&end=' + JSON.stringify(end)
    })
  }
})