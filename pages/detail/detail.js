let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null,
    apiErr:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    //console.log(options);
    this.getDetail(options);
  },
  getDetail:function(data){
    var that=this;
    wx.request({
      url: "https://apis.juhe.cn/cook/queryid?key=" + app.globalData.KEY+"&id="+data.id,
      success:function(res){
        if (res.data.error_code !== 0) {
          that.setData({
            apiErr: true
          });
          return
        }
        console.log(res);
        that.setData({
          list:res.data.result.data[0]
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {
    
  }
})