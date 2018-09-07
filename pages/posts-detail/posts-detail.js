var postData = require("../../data/data");
var app = getApp();
Page({
  data: {
    play: true
  },
  onLoad: function(position) {
    var that = this;
    this.setData({
      detail: postData.postList[position.id]
    }); 
    this.data.currentId = position.id;
    this.initiStorage(position.id); 
    /***根据设置在app.js的全局g_play设置play的状态 */
    if (!app.globaleData.g_play && this.data.currentId == app.globaleData.g_currentId){
      that.setData({
        play: false
      });
    }
    wx.onBackgroundAudioPause(function() {
      that.setData({
        play: true
      });
  
    });
    wx.onBackgroundAudioPlay(function() {
      that.setData({
        play: false
      });
  
    });
  },
  initiStorage: function(index) {
    var storageState = wx.getStorageSync("storage_state");
    if (storageState) {
      var state = storageState[index];
    } else {
      var storageState = {};
      storageState[index] = false;
      wx.setStorageSync("storage_state", storageState);
    }
    if (state) {
      this.setData({
        collection: state
      });
    }
  },
  changeState: function() {
    var storageState = wx.getStorageSync("storage_state");
    var state = storageState[this.data.currentId];
    state = !state;
    storageState[this.data.currentId] = state;
    wx.setStorageSync("storage_state", storageState);
    this.setData({
      collection: state
    });
    wx.showToast({
      title: state ? "收藏成功" : "取消收藏",
      duration: 1000,
      icon: "success",
    })
  },
  shareAction: function() {
    var itemList = ["分享到qq", "分享到微信"];
    wx.showActionSheet({
      itemList: itemList,
      success: function(res) {
        wx.showToast({
          title: "成功" + itemList[res.tapIndex] + "!",
          duration: 1000,
          icon: "success",
        });
      }
    })
  },
  musicPlay: function() {
    var that =this;
    var dataList = postData.postList;
    var play = !this.data.play;
    if (play) {
      wx.pauseBackgroundAudio();
      app.globaleData.g_play=true;
    } else {
      wx.playBackgroundAudio({
        dataUrl: dataList[this.data.currentId].music.url,
        title: dataList[this.data.currentId].music.title,
        coverImgUrl: dataList[this.data.currentId].music.coverImg,
      });
      app.globaleData.g_play = false;
    }
    this.setData({
      play: play
    })
    app.globaleData.g_currentId = that.data.currentId;
  }
})