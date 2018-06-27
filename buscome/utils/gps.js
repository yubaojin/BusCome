var WGS84_to_GCJ02 = function () { }

WGS84_to_GCJ02.prototype.a = 6378245.0;
WGS84_to_GCJ02.prototype.ee = 0.00669342162296594323;
WGS84_to_GCJ02.prototype.transform = function (wgLat, wgLon) {

  if (this.outOfChina(wgLat, wgLon)) {
    return [wgLat, wgLon];
  }

  var dLat = this.transformLat(wgLon - 105.0, wgLat - 35.0);
  var dLon = this.transformLon(wgLon - 105.0, wgLat - 35.0);
  var radLat = wgLat / 180.0 * Math.PI;
  var magic = Math.sin(radLat);
  magic = 1 - this.ee * magic * magic;
  var sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtMagic) * Math.PI);
  dLon = (dLon * 180.0) / (this.a / sqrtMagic * Math.cos(radLat) * Math.PI);
  console.log(dLat, dLon)
  var mgLat = parseFloat(wgLat) + parseFloat(dLat);
  var mgLon = parseFloat(wgLon) + parseFloat(dLon);

  return [mgLat, mgLon];

};

WGS84_to_GCJ02.prototype.outOfChina = function (lat, lon) {

  if (lon < 72.004 || lon > 137.8347)
    return true;
  if (lat < 0.8293 || lat > 55.8271)
    return true;

  return false;

};

WGS84_to_GCJ02.prototype.transformLat = function (x, y) {

  var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(y * Math.PI) + 40.0 * Math.sin(y / 3.0 * Math.PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(y / 12.0 * Math.PI) + 320 * Math.sin(y * Math.PI / 30.0)) * 2.0 / 3.0;

  return ret;

};

WGS84_to_GCJ02.prototype.transformLon = function (x, y) {

  var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(x * Math.PI) + 40.0 * Math.sin(x / 3.0 * Math.PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(x / 12.0 * Math.PI) + 300.0 * Math.sin(x / 30.0 * Math.PI)) * 2.0 / 3.0;

  return ret;

};

module.exports = {
  WGS84_to_GCJ02: WGS84_to_GCJ02
}
