# BusCome
公车来了微信小城 包括线路查询展示 和 换乘（路线规划）等功能

## 部分效果展示图如下

![](/pic/1.jpg)
![](/pic/2.jpg)
![](/pic/3.jpg)
![](/pic/4.jpg)
![](/pic/5.jpg)
![](/pic/6.jpg)
![](/pic/7.jpg)
![](/pic/8.jpg)
![](/pic/9.jpg)
![](/pic/10.jpg)

## 说明

<p>小程序源码在buscome/buscome中</p>
<p>站点用的技术数据接口 <a href="https://www.jisuapi.com/api/transit/">https://www.jisuapi.com/api/transit/</a>
注意:这个接口返回的是百度坐标系，而渲染到微信地图组件上要火星坐标系，所以这个时候需要把返回的百度坐标转换成火星坐标，但是百度坐标没公布算法，只有调用百度地图官方的接口把百度坐标转为火星坐标</p>

<p>换乘（路线规划）主要是用的是高德微信SDK带得线路规划函数<a href="http://lbs.amap.com/api/wx/reference/core">http://lbs.amap.com/api/wx/reference/core</a></p>
<p>我的里面的定时刷新并没有实现，因为找到更好的方法去刷新，在查询页面，可以通过下拉来刷新</p>

## 转载请注明来源

</a href="https://github.com/yubaojin/BusCome.git">https://github.com/yubaojin/BusCome.git</a>
