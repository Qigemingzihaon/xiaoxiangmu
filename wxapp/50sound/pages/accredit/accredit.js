// pages/accredit/accredit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  shouquan:function(){
    wx.login({
      success: function (loginres) {
        console.log(loginres.code);
        //发起网络请求，到服务器获取openid及session-key
        wx.request({
          url: This.myserver.url + 'author',
          data: { code: loginres.code },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          dataType: 'json',
          success: function (coderes) {
            console.log(coderes);
            if (coderes.data.r == 'openid-exist') {
              wx.showToast({
                title: '授权失败'
              })
            } else if (coderes.data.r == 'ok') {
              wx.setStorageSync('loginid', coderes.data.openid);
              wx.getUserInfo({
                success: userres => {
                  This.globalData.userInfo = userres.userInfo
                  if (This.userInfoReadyCallback) {
                    This.userInfoReadyCallback(userres)
                  }
                }
              })
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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