//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    name:'',
    indicatorDots: true,
    indicatorColor:'#59c457',
    autoplay: true,
    interval: 3000,
    duration: 1000,
    banners:[],
    seasons:[],
    seasonStyle:[],
    scene:[],
    mainFood:[],
    apiErr:false
  },
  onLoad: function () {
    var that = this
    //this.getBanner();
    //this.getFresh();
    //this.getMain();
  },
  //获取输入框值
  cuisineNameInput:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  searchList:function(){
    console.log(this.data.name);
    var that=this;
    wx.navigateTo({
      url: '../list/list?name='+that.data.name,
    })
  },
  //获取当前第一项为banner
  getBanner:function(){
    var that=this;
    wx.request({
      url: 'https://apis.juhe.cn/cook/index?key='+app.globalData.KEY+'&cid=1',
      success:function(res){
        //console.log(res);
        if (res.data.error_code !== 0){
          that.setData({
            apiErr:true
          });
          return
        }
        that.setData({
          banners: res.data.result.data
        })
      },
      fail:function(){
        console.warn('api接口已失效');
      }
    })
  },
  getFresh:function(){
    var that=this;
    //获取时令列表
    wx.request({
      url: 'https://apis.juhe.cn/cook/category?key=' + app.globalData.KEY,
      success:function(res){
        //console.log(res);
        if (res.data.error_code !== 0) {
          that.setData({
            apiErr: true
          });
          return
        }
        var container=[];
        for(var i=0;i<res.data.result.length;i++){
          if ((res.data.result[i].name).indexOf('时令')!==-1){
            that.setData({
              seasons:res.data.result[i]
            });
            //展示时令食材热门做法
            for (var j = 0; j < res.data.result[i].list.length; j++) {
              var _query = res.data.result[i].list[j];
              wx.request({
                url: 'https://apis.juhe.cn/cook/query?key=' + app.globalData.KEY + '&menu=' + _query.name + '&rn=1&pn=0',
                success: function (resData) {
                  if (res.data.error_code !== 0) {
                    that.setData({
                      apiErr: true
                    });
                    return
                  }
                  var unit=null;
                  unit={
                    detail: resData.data.result.data
                  };
                  container.push(unit);
                  that.setData({
                    seasonStyle: container
                  })
                },
                fail: function () {
                  console.warn('调用接口失败')
                }
              })
            }
          }
          if ((res.data.result[i].name).indexOf('场景') !== -1){
            var sceneContainer=[];
            for(var k=0;k<res.data.result[i].list.length;k++){
              var classify={};
              if (res.data.result[i].list[k].name == '早餐'){
                classify.img='../../asset/images/breakfast.png';
                classify.detail=res.data.result[i].list[k];
                sceneContainer.push(classify);
              }
              if (res.data.result[i].list[k].name == '午餐') {
                classify.img = '../../asset/images/lunch.png';
                classify.detail = res.data.result[i].list[k];
                sceneContainer.push(classify);
              }
              if (res.data.result[i].list[k].name == '晚餐') {
                classify.img = '../../asset/images/dinner.png';
                classify.detail = res.data.result[i].list[k];
                sceneContainer.push(classify);
              }
            }
            that.setData({
              scene:sceneContainer
            });
          }
          if ((res.data.result[i].name).indexOf('主食') !== -1){
            that.getMain(res.data.result[i]);
          }
        }
      }
    })
  },
  getMain:function(data){
    //console.log(data);
    var that=this;
    if(data){
      wx.request({
        url: 'https://apis.juhe.cn/cook/query?key=' + app.globalData.KEY + '&menu=' + data.name,
        success: function (res) {
          if (res.data.error_code !== 0) {
            that.setData({
              apiErr: true
            });
            return
          }
          //console.log(res);
          that.setData({
            mainFood: res.data.result.data
          });
        }
      })
    }
  },
})
