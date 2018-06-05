//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    userInfo: {},
    defaultImg:"../../asset/images/me.png",
    noLogin:false,
    lists:[
      {
        name:"关于项目",
        path:"../about/about",
        img:"../../asset/images/about.png"
      },
      {
        name:"打赏赞助",
        path:"../support/support",
        img:"../../asset/images/support.png"
      }
    ]
  },
  onLoad() {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        defaultImg: userInfo.avatarUrl
      })
    });
    that.isLogin();
  },
  isLogin:function(){
    var that=this;
    if(that.data.userInfo){
      that.setData({
        noLogin:true
      })
    }
  },
  getUserInfo:function(res){
    this.setData({
      userInfo: res.detail.userInfo,
      defaultImg: res.detail.userInfo.avatarUrl,
      noLogin: true
    })
  }
})
