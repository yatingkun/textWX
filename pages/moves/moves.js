var app = getApp();
var util = require("../../utils/util.js");
const in_theater = "正在上映";
const coming_soon = "即将放映";
const top250 = "Top250";
Page({
  data: {},
  onLoad: function(event) {
    var in_theatersUrl = app.globaleData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var coming_soonUrl = app.globaleData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globaleData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";
    this.getMoveList(in_theatersUrl, in_theater);
    this.getMoveList(coming_soonUrl, coming_soon);
    this.getMoveList(top250Url, top250);
  },
  getMoveList: function(url, movesStatu) {
    var that = this;
    util.http(url, movesStatu).then(function (resdata) {
      var res = that.setMovesData(resdata, movesStatu);
      that.setData({
        moveListArray: res
      })
    });
  },
  onPullDownRefresh: function() {},
  setMovesData: function(data, movesStatu) {
    var moveList = [];
    var moveListObject = {};
    for (let item of data) {
      if (item.original_title.length >= 6) {
        var title = item.original_title.substring(0, 6) + "....";
      } else {
        var title = item.original_title;
      }
      var moveObject = {
        imageUrl: item.images.large,
        title: title,
        score: item.rating.average,
        moveId: item.id,
        startScore: util.convertToStarsArray(item.rating.stars)
      };
      moveList.push(moveObject);
    }
    moveListObject = {
      moveList: moveList,
      movesStatu: movesStatu
    }
    app.globaleData.moveListArray.push(moveListObject);
    return app.globaleData.moveListArray;
  },
  showMore: function(event) {
    app.globaleData.moveListArray = [];
    var that = this;
    if (event.currentTarget.dataset.statu == in_theater) {
      var in_theatersUrl = app.globaleData.doubanBase + "/v2/movie/in_theaters" + "?start=4&count=12";
      util.http(in_theatersUrl).then(function(resdata) {
        var res = that.setMovesData(resdata, in_theater);
        wx.navigateTo({
          url: 'moremoves/moremoves?moveListArray=' + JSON.stringify(res),
        })
      });
    } else if (event.currentTarget.dataset.statu == coming_soon) {
      var coming_soonUrl = app.globaleData.doubanBase + "/v2/movie/coming_soon" + "?start=3&count=12";
      util.http(coming_soonUrl).then(function(resdata) {
        var res = that.setMovesData(resdata, coming_soon);
        wx.navigateTo({
          url: 'moremoves/moremoves?moveListArray=' + JSON.stringify(res),
        })
      });
    } else {
      var top250Url = app.globaleData.doubanBase + "/v2/movie/top250" + "?start=3&count=12";
      util.http(top250Url,top250).then(function(resdata) {
        wx.navigateTo({
          url: 'moremoves/moremoves?moveListArray=' + JSON.stringify(resdata),
        })
      });
    }
  },
  moveDetail:function(event){
   util.moveDetail(event);
  }
  
});
/**传递的数据形式：moveListArray[{moveListObject:moveList[{},{},{}],statu:statu},{moveListObject:moveList[{},{},{}],statu:statu},{moveListObject:moveList[{},{},{}],statu:statu}];**/