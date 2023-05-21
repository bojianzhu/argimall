// 导入request请求工具方法
import {getBaseUrl, requestUtil} from "../../utils/requestUtil.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productObj:{},
    baseUrl:'',
    activeIndex:0
  },

  productInfo:{

  },

  /**
   * tab点击事件
   * @param {} e 
   */
  handleItemTap(e){
    console.log(e)
    const {index}=e.currentTarget.dataset;
    console.log(index);
    this.setData({
      activeIndex:index
    })
  },

  // 获取产品信息
  async getProductDetail(id){
    const result=await requestUtil({url: "/product/detail",data:{id}});
    this.productInfo=result.message;
    const baseUrl=getBaseUrl();
    
    console.log(result.message);
    // 富文本自适应
    result.message.productIntroImgs = result.message.productIntroImgs.replace(/\<img/gi, '<img style="width:100%;height:auto"');
    result.message.productParaImgs = result.message.productParaImgs.replace(/\<img/gi, '<img style="width:100%;height:auto"');
    this.setData({
      productObj:result.message,
      baseUrl
    })
  },

  // 加入购物车
  setCartAdd(){
    // 获取缓存中的购物车 数组格式
    let cart=wx.getStorageSync('cart')||[];
    // 判断商品对象中是否存在于购物车数组中
    let index=cart.findIndex(v=>v.id===this.productInfo.id);
    if(index===-1){  // 不存在
      this.productInfo.num=1;
      this.productInfo.checked=true;
      cart.push(this.productInfo);
    }else{  // 已经存在
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart); // 把购物车添加到缓存中
  },

  // 点击 加入购物车
  handleCartAdd() {
    this.setCartAdd();
    // 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon:'success',
      mask:true
    })
  },

  // 点击 立即购买
  handleBuy(){
    this.setCartAdd();
    wx.switchTab({
      url: '/pages/cart/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductDetail(options.id)
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