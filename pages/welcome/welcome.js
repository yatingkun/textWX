Page({
 switchPage:()=>{
   wx.switchTab({/*要跳转到tabBar页面必须使用这个跳转方法 */
     url: '../posts/post',
   })
  }
})