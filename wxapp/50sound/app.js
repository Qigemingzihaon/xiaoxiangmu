//app.js
App({
  onLaunch: function () {
    var This = this;
    wx.getSystemInfo({
      success: function (res) {
        This.wxsb.windowHeight = res.windowHeight+"px";
      }
    });
    let loginid = wx.getStorageSync('loginid');
    if (loginid) { 
      wx.getUserInfo({
        success: userres => {
          this.globalData.userInfo = userres.userInfo
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(userres)
          }
        }
      })
    }else{
      wx.showModal({
        title: '授权声明',
        content: '五十音即将获取你的基本信息及openid',
        cancelText: '不许',
        confirmText: 'Ok',
        success: function (modalres) {
          if (modalres.confirm) {
            wx.login({
              success: function (loginres) {
                console.log(loginres.code);
                //发起网络请求，到服务器获取openid及session-key
                wx.request({
                  url: This.myserver.url + 'author1',
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
          } else if(modalres.cancel) {
            console.log('用户点击取消')
            wx.showToast({
              title: '授权失败'
            });
            wx.redirectTo({
              url: '../accredit/accredit',
            });
            //可以进行页面跳转（授权页面）或者其他相关操作
          }
        }
        });
    };
    // // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  
  globalData: {
    userInfo: null,
    
  },
  wxsb:{
    windowHeight:'',
  },
  myserver:{
    url:"http://192.168.2.102:8080/wxlogin/"
  },
  httpym:{
     http: "http://192.168.2.102:8080"
  }
})