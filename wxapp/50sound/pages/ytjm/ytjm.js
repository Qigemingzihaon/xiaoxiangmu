// pages/kaishixuexi/kaishixuexi.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bofangurl: 0,
    url: [{
      sounid: 1,
      pjaorpja: 2,
      url: '/olimage/img/20180609103106_987063.png',
      imgname: '2-1.png',
      urly: '/olimage/voicef/20180608221400_919931.mp3',
      ypname: '1.mp3'
    },
    {
      sounid: 2,
      pjaorpja: 2,
      url: '/olimage/img/20180609103125_554987.png',
      imgname: '2-2.png',
      urly: '/olimage/voicef/20180608221515_793694.mp3',
      ypname: '2.mp3'
    },
    {
      sounid: 3,
      pjaorpja: 2,
      url: '/olimage/img/20180609103144_50041.png',
      imgname: '2-3.png',
      urly: '/olimage/voicef/20180608221529_82424.mp3',
      ypname: '3.mp3'
    },
    {
      sounid: 4,
      pjaorpja: 2,
      url: '/olimage/img/20180609103332_195706.png',
      imgname: '2-4.png',
      urly: '/olimage/voicef/20180608221543_701019.mp3',
      ypname: '4.mp3'
    },
    {
      sounid: 5,
      pjaorpja: 2,
      url: '/olimage/img/20180609103346_889139.png',
      imgname: '2-5.png',
      urly: '/olimage/voicef/20180608221559_175750.mp3',
      ypname: '5.mp3'
    },
    {
      url: '/olimage/imgp/20180609105257_494798.jpg',
      imgname: '1-1-4.jpg'
    },
    {
      url: '/olimage/imgp/20180609105257_762607.jpg',
      imgname: '1-1-3.jpg'
    },
    {
      url: '/olimage/imgp/20180609105257_883753.jpg',
      imgname: '1-1-2.jpg'
    },
    {
      url: '/olimage/imgp/20180609105257_702907.jpg',
      imgname: '1-1-1.jpg'
    }],
    httpym: app.httpym.http,
    h: app.wxsb.windowHeight,
    
    imgUrls: [   {
    sounid: 1,
    pjaorpja: 2,
    url: '/olimage/img/20180609103106_987063.png',
    imgname: '2-1.png',
    urly: '/olimage/voicef/20180608221400_919931.mp3',
    ypname: '1.mp3'
  },
    {
    sounid: 2,
    pjaorpja: 2,
    url: '/olimage/img/20180609103125_554987.png',
    imgname: '2-2.png',
    urly: '/olimage/voicef/20180608221515_793694.mp3',
    ypname: '2.mp3'
  },
    {
    sounid: 3,
    pjaorpja: 2,
    url: '/olimage/img/20180609103144_50041.png',
    imgname: '2-3.png',
    urly: '/olimage/voicef/20180608221529_82424.mp3',
    ypname: '3.mp3'
  },
    {
    sounid: 4,
    pjaorpja: 2,
    url: '/olimage/img/20180609103332_195706.png',
    imgname: '2-4.png',
    urly: '/olimage/voicef/20180608221543_701019.mp3',
    ypname: '4.mp3'
  },
    {
    sounid: 5,
    pjaorpja: 2,
    url: '/olimage/img/20180609103346_889139.png',
    imgname: '2-5.png',
    urly: '/olimage/voicef/20180608221559_175750.mp3',
    ypname: '5.mp3'
  },{
    url: '/olimage/imgp/20180609105257_494798.jpg',
    imgname: '1-1-4.jpg'
  },
    {
    url: '/olimage/imgp/20180609105257_762607.jpg',
    imgname: '1-1-3.jpg'
  },
    {
    url: '/olimage/imgp/20180609105257_883753.jpg',
    imgname: '1-1-2.jpg'
  },
    {
    url: '/olimage/imgp/20180609105257_702907.jpg',
    imgname: '1-1-1.jpg'
  } ],
    indicatorDots: false,
    autoplay: false,
    interval: 500,
    current:0,
    duration: 0,
    take_prop: 2,
    buttonhtml:"片假名",
    jingdu:0
  },
  take_bf:function(){ //点击播放
    wx.createAudioContext('audiohide').play()
    // this.audioCtx.play()
  },

  take_x:function(){ //点击开始写

    var This = this;
    if (!This.data.autoplay){
      This.setData({
        autoplay: true
      });
    }else{
      This.setData({
        autoplay: false,
        current:0
      });
    }
  },
  take_pp:function(e){
    console.log(e)
    var This=this;
    if (This.data.take_prop==2){
      console.log(This.data.take_prop, This.data.buttonhtml)
      This.setData({
        take_prop : 1,
        buttonhtml : "平假名"
      });
      
    }else{
      console.log(This.data.take_prop, This.data.buttonhtml)
      This.setData({
        take_prop: 2,
        buttonhtml: "片假名"
      });
    }
    wx.request({
      url: app.httpym.http+'/kaishixuexi/huoqusounidbgc', //仅为示例，并非真实的接口地址
      data: {
        sounidq: 0,
        sounidz: 5,
        bgc: 2,
        pjaorpja: This.data.take_prop
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: "json",
      success: function (res) {
        var objectArraySort = function (keyName) {
          return function (objectN, objectM) {
            var valueN = objectN[keyName];
            var valueM = objectM[keyName];
            if (valueN.replace(/[^0-9]/ig, "") < valueM.replace(/[^0-9]/ig, "")) return -1 //从大到小排序
            else if (valueN > valueM) return 1
            else return 0
          }
        };
        res.data.sort(objectArraySort('imgname'));
        console.log(res.data)
        This.setData({
          url: res.data
        });
      }
    });
    wx.request({
      url: app.httpym.http+'/kaishixuexi/huoqusounid', //仅为示例，并非真实的接口地址
      data: {
        sounid: 1,
        bgc: "",
        pjaorpja: This.data.take_prop
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: "json",
      success: function (res) {
        var objectArraySort = function (keyName) {
          return function (objectN, objectM) {
            var valueN = objectN[keyName];
            var valueM = objectM[keyName];
            if (valueN.replace(/[^0-9]/ig, "") < valueM.replace(/[^0-9]/ig, "")) return -1 //从大到小排序
            else if (valueN > valueM) return 1
            else return 0
          }
        };
        res.data.sort(objectArraySort('imgname'));
        console.log(res.data)
        This.setData({
          imgUrls: res.data
        });
      }
    });
  },
  take_sounid: function (e) { //点击切换轮播框的sounid和播放键的sounid
    var This=this;
    This.setData({
      autoplay: false,
      current: 0
    });
    var sounid = e.currentTarget.dataset.sounid;
    var bofid = sounid % 5;
    if (bofid==0){
      bofid=4;
    }else{
      bofid = bofid-1;
    }
    console.log(bofid)
    This.setData({
      bofangurl: bofid
    });
    // console.log(sounid)
    wx.request({
      url: app.httpym.http+'/kaishixuexi/huoqusounid', //仅为示例，并非真实的接口地址
      data: {
        sounid: sounid,
        bgc: "",
        pjaorpja: This.data.take_prop
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: "json",
      success: function (res) {
        var objectArraySort = function (keyName) {
          return function (objectN, objectM) {
            var valueN = objectN[keyName];
            var valueM = objectM[keyName];
            if (valueN.replace(/[^0-9]/ig, "") < valueM.replace(/[^0-9]/ig, "")) return -1 //从大到小排序
            else if (valueN > valueM) return 1
            else return 0
          }
        };
        res.data.sort(objectArraySort('imgname'));
        console.log(res.data)
        This.setData({
          imgUrls: res.data
        });
      }
    });
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var This = this
    wx.request({
      url: app.httpym.http+'/kaishixuexi/huoqusounidbgc', //仅为示例，并非真实的接口地址
      data: {
        sounidq:0,
        sounidz:5,
        bgc:2,
        pjaorpja:2
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: "json",
      success: function (res) {
        var objectArraySort = function (keyName) {
          return function (objectN, objectM) {
            var valueN = objectN[keyName];
            var valueM = objectM[keyName];
            if (valueN.replace(/[^0-9]/ig, "") < valueM.replace(/[^0-9]/ig, "")) return -1 //从大到小排序
            else if (valueN > valueM) return 1
            else return 0
          }
        };
        res.data.sort(objectArraySort('imgname'));
        // console.log(res.data)
        This.setData({
          url: res.data
        });
      }
    });
    wx.request({
      url: app.httpym.http+'/kaishixuexi/huoqusounid', //仅为示例，并非真实的接口地址
      data: {
        sounid: 1,
        bgc:"",
        pjaorpja: This.data.take_prop
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: "json",
      success: function (res) {
        var objectArraySort = function (keyName) {
          return function (objectN, objectM) {
            var valueN = objectN[keyName];
            var valueM = objectM[keyName] ;
            if (valueN.replace(/[^0-9]/ig, "") < valueM.replace(/[^0-9]/ig, "")) return -1 //从大到小排序
            else if (valueN > valueM) return 1
            else return 0
          }
        };
        res.data.sort(objectArraySort('imgname'));
        console.log(res.data)
        This.setData({
          imgUrls: res.data
        });
      }
    });
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