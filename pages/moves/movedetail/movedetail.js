var app = getApp();
var util = require("../../../utils/util.js");
Page({
  data: {},
  onLoad: function (options) {
    var url = app.globaleData.doubanBase + "/v2/movie/subject/" + options.id;
    var that = this;
    wx.request({
      url: url,
      method: 'Get',
      dataType: 'json',
      success: function (res) {
        let data = res.data;
        var summary = data.summary;
        if (summary.length == 0) {
          summary = "抱歉，该影片暂无剧情简介！"
        } else {
          /**json传来的字符串中若含有“\n”字符串，会连同“\n”当字符串一起输出。
          此时需将字符串.replace(/\\n/g, "\n")，把字符串的中的“\n”转成电脑识别的换行符。
          然后再.replace(/\n/g, "")把电脑识别的换行符去掉,从而达到去除字符串“\n”的效果*/
          //console.log(summary);
          summary = summary.replace(/\\n/g, "\n");
          summary = summary.replace(/\n/g, "");
          //console.log(summary);
        }
        if (summary.length > 200) {
          summary = summary.substring(0, 200) + "....";
        }
        var detailData = {
          title: data.original_title,
          country: data.countries[0],
          year: data.year,
          like_count: data.wish_count,
          reviews_count: data.reviews_count,
          startScore: util.convertToStarsArray(data.rating.stars),
          score: data.rating.average,
          director: data.directors[0].name,
          castsName: util.connectActors(data.casts),
          genres: util.connectKinds(data.genres),
          summary: summary,
          imageUrl: data.images.large,
          casts: data.casts,
        };
        that.setData({
          detailData: detailData
        });
        //console.log(detailData);
        //console.log(util.connectActors(res.data.casts));
      }
    });
  },
})