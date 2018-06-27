// pages/transferLineDetailMap/transferLineDetailMap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: null,
    end: null,
    transit: null,
    markers: [],
    polyline: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this

    var start = JSON.parse(options.start)
    var end = JSON.parse(options.end)
    var transit = JSON.parse(options.transit)

    console.log("+++++", transit)

    var markers = _this.data.markers
    var polyline = _this.data.polyline

    //设置标题
    wx.setNavigationBarTitle({
      title: start.name + ' - ' + end.name
    })

    //起点
    var marker = {}
    marker.iconPath = '../../imgs/pos.png'
    marker.latitude = start.latitude
    marker.longitude = start.longitude
    marker.width = 35
    marker.height = 35
    markers.push(marker)
    //终点
    var marker = {}
    marker.iconPath = '../../imgs/poe.png'
    marker.latitude = end.latitude
    marker.longitude = end.longitude
    marker.width = 35
    marker.height = 35
    markers.push(marker)


    for (var x = 0; x < transit.segments.length; x++) {
      var segment = transit.segments[x]
      //是否存在步行
      if (segment.walking && segment.walking != {}) {
        //将行走的步骤曲线相加
        for (var y = 0; y < segment.walking.steps.length; y++) {
          var line = {}
          var points = []
          var step = segment.walking.steps[y].polyline
          var stepArr = step.split(";")
          for (var i = 0; i < stepArr.length; i++) {
            var p = stepArr[i]
            var point = {}
            point.longitude = p.split(",")[0]
            point.latitude = p.split(",")[1]
            points.push(point)
          }
          line.points = points
          //步行的颜色
          line.color = '#666666'
          line.width = 5
          line.dottedLine = true
          polyline.push(line)
        }
      }
      //是否存在公交或者地铁
      if (segment.bus.buslines.length > 0) {
        //公交或者地铁曲线
        var bus = segment.bus
        var busline = bus.busline

        //加入始末位置图标
        var marker = {}
        marker.iconPath = bus.type == 1 ? '../../imgs/bus.png' : '../../imgs/subway.png'
        marker.latitude = busline.departure_stop.location.split(",")[1]
        marker.longitude = busline.departure_stop.location.split(",")[0]
        marker.width = 25
        marker.height = 25
        markers.push(marker)
        //终点
        var marker = {}
        marker.iconPath = bus.type == 1 ? '../../imgs/bus.png' : '../../imgs/subway.png'
        marker.latitude = busline.arrival_stop.location.split(",")[1]
        marker.longitude = busline.arrival_stop.location.split(",")[0]
        marker.width = 25
        marker.height = 25
        markers.push(marker)
        //描线
        var line = {}
        var points = []

        var pl = busline.polyline
        var pls = pl.split(";")

        for (var j = 0; j < pls.length; j++) {
          var p = pls[j]
          var point = {}
          point.longitude = p.split(",")[0]
          point.latitude = p.split(",")[1]
          points.push(point)
        }

        line.points = points
        //公交或者的颜色
        line.color = bus.type == 1 ? '#0099ff' : '#0000ff'
        line.width = 5
        line.dottedLine = false
        polyline.push(line)
      }
    }


    _this.setData({
      start: start,
      end: end,
      transit: transit,
      markers: markers,
      polyline: polyline
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

  }
})