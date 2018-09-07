
 var postData=require("../../data/data") ;
 
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {
        this.setData({state:postData.postList});

    },
 detail: (event) => {
   /**target指的是当前点击的组件，currentTarget指的是事件捕获的组件 */
   var postid = event.currentTarget.dataset.postid;
   wx.navigateTo({
    url: '../posts-detail/posts-detail?id=' + postid,
   })   
    },
 swiperDetail:(event)=>{
   var postid = event.target.dataset.postid;
   wx.navigateTo({
     url: '../posts-detail/posts-detail?id=' + postid,
   })   ;
 }
})