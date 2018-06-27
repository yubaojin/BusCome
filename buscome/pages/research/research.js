// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap/qqmap-wx.js');
var qqmap;
var config = require('../../libs/config.js');
var app = getApp()
// pages/research/research.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationInfo: {},
    stationList: [],
    type: "1",
    markers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    // 实例化API核心类
    qqmap = new QQMapWX({
      key: config.Config.qqmapkey
    })
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getLocationInfo()
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
            _this.getStationList()
          },
          fail: function (res) {
            console.log(res);
            app.hideLoading(locationInfo)
          },
          complete: function (res) {
            // complete
            // console.log(_this.data.locationInfo)
          }
        })
      }
    })
  },
  getStationList() {
    var _this = this
    // 调用接口
    var locationInfo = _this.data.locationInfo
    wx.request({
      url: 'http://api.jisuapi.com/transit/nearby', //周围地址接口
      data: {
        appkey: config.Config.busappkey,
        city: locationInfo.city,
        address: locationInfo.address
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var stationList = res.data.result
        for (var i = 0; i < stationList.length; i++) {
          var temp = []
          for (var j = 0; j < stationList[i].lines.length; j++) {
            var line = stationList[i].lines[j]
            var newLine = line.substring(0, line.indexOf('('))
            if (temp.indexOf(newLine) == -1) {
              temp.push(newLine)
            }
          }
          stationList[i].lines = temp
        }
        _this.setData({
          stationList: stationList
        })
        //设置标记点
        _this.setMapMarkers()
        console.log(_this.data.stationList)
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        app.hideLoading()
        // console.log(res);
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
  jumpLinesShow(e) {
    var _this = this
    console.log(e)
    var station = e.currentTarget.dataset.station
    var city = _this.data.locationInfo.city
    wx.navigateTo({
      url: '../linesShow/linesShow?station=' + station + '&city=' + city
    })
  },
  jumpLineDetail(e) {
    var _this = this
    var line = e.currentTarget.dataset.line
    var station = e.currentTarget.dataset.station
    var city = _this.data.locationInfo.city
    wx.navigateTo({
      url: '../lineDetail/lineDetail?line=' + line + '&city=' + city + '&station=' + station
    })
  },
  jumpSearch(e) {
    var _this = this
    var city = _this.data.locationInfo.city
    wx.navigateTo({
      url: '../search/search?city=' + city
    })
  },
  changeType(e) {
    var _this = this
    var type = e.currentTarget.dataset.type
    _this.setData({
      type: type
    })
  },
  setMapMarkers() {
    var _this = this
    var stationList = _this.data.stationList
    for (var i = 0; i < stationList.length; i++) {
      (function (i) {
        wx.request({
          url: 'http://api.map.baidu.com/geoconv/v1/', //仅为示例，并非真实的接口地址
          data: {
            ak: config.Config.bmapkey,
            coords: stationList[i].lng + ',' + stationList[i].lat,
            from: 5, //百度地图采用的经纬度坐标;
            to: 3 //国测局（gcj02）坐标;
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            // console.log(res)
            var lnglat = res.data.result[0]
            var marker = {}
            marker.iconPath = '../../imgs/location.png'
            marker.id = i
            marker.latitude = lnglat.y
            marker.longitude = lnglat.x
            marker.width = 20
            marker.height = 20
            marker.callout = {
              content: stationList[i].station,
              color: 'red',
              bgColor: '#fcfcfc',
              padding: 3,
              fontSize: 18,
              borderRadius: 10,
              display: 'BYCLICK',
              textAlign: 'left'
            }
            var markers = _this.data.markers
            markers.push(marker)
            _this.setData({
              markers: markers
            })
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            // console.log(res);
          }
        })
      })(i)
    }
  },
  callouttap(e) {
    console.log(e)
    var _this = this
    var id = e.markerId
    var stationList = _this.data.stationList
    var station = stationList[id].station
    e.currentTarget.dataset.station = station
    _this.jumpLinesShow(e)
  }
})