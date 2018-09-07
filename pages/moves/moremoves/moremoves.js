var util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var moveListArray = JSON.parse(options.moveListArray); //参数传递到另一页面后，要用JSON.parse()对传过去的string解析成JSON对象。
    this.setData({
      moveListArray: moveListArray,
      title: moveListArray[0].movesStatu
    })
  },
  onReady: function() {
    var that = this;
    wx.setNavigationBarTitle({
      title: that.data.title
    })
  },
  moveDetail: function (event) {
    util.moveDetail(event);
  }
})