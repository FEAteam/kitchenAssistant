// pages/list/list.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    opt:null,
    noMsg:false,
    loading:true,
    apiErr:false,
    pn:0,
    rn:10,
    format:1,
    totalNum:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.data.opt=options;
    this.getList(options);
  },
  getList:function(data){
    // 区分id查询和name查询
    var that=this;
    var pageList=that.data.list;
    console.log(data);
    if(data.id){
      wx.request({
        url: 'https://apis.juhe.cn/cook/index?key=' + app.globalData.KEY+'&cid='+data.id+'&pn='+that.data.pn+'&rn='+that.data.rn,
        success: function (res) {
          console.log(res);
          if (res.data.error_code !== 0) {
            that.setData({
              apiErr: true
            });
            return
          }
          if ((res.data.error_code + '').indexOf('20') !== -1) {
            that.setData({
              noMsg: true,
              loading: false
            })
            return;
          }
          for(var i=0;i<res.data.result.data.length;i++){
            pageList.push(res.data.result.data[i]);
          }
          var _pn = parseInt(res.data.result.pn) + parseInt(res.data.result.rn);
          that.setData({
            list: pageList,
            totalNum:res.data.result.totalNum,
            pn: _pn
          });
        }
      })
    }
    else{
      console.log()
      wx.request({
        url: 'https://apis.juhe.cn/cook/query?key=' + app.globalData.KEY + '&menu=' + data.name + '&pn=' + that.data.pn + '&rn=' + that.data.rn,
        success: function (res) {
          console.log(res);
          if (res.data.error_code !== 0) {
            that.setData({
              apiErr: true
            });
            return
          }
          if ((res.data.error_code+'').indexOf('20')!==-1){
            that.setData({
              noMsg:true,
              loading:false
            })
            return;
          }
          for (var i = 0; i < res.data.result.data.length; i++) {
            pageList.push(res.data.result.data[i]);
          }
          var _pn = parseInt(res.data.result.pn) + parseInt(res.data.result.rn);
          that.setData({
            list: pageList,
            totalNum: res.data.result.totalNum,
            pn: _pn
          });
        }
      })
    }
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
    var that = this;
    that.getList(that.data.opt);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})