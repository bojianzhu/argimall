// 导入request请求工具方法
import {getBaseUrl, requestUtil,getLogin,getUserProfile, requestPay} from "../../utils/requestUtil.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const baseUrl=getBaseUrl();
    this.setData({
      baseUrl
    })
  },

  /**
   * 点击支付
   */
  async handleOrderPay(){
    // 判断缓存中是否有token
    const token=wx.getStorageSync('token');
    if(!token){
      // const {code}=await login();
      // wx.getUserProfile({
      //   desc: '获取用户信息',
      //   success: (res)=>{
      //     const {encryptedData,rawData,iv,signature}=res;
          
      //     console.log(code,encryptedData,rawData,iv,signature)
      //   },
      //   fail:()=>{
      //     console.log("登录失败")
      //   }
      // })

      Promise.all([getLogin(),getUserProfile()]).then((res)=>{
        console.log(res)
        let loginParam={
          code:res[0].code,
          nickName:res[1].userInfo.nickName,
          avatarUrl:res[1].userInfo.avatarUrl
        }
        console.log(loginParam);
        // 把用户信息放到缓存中
        // wx.setStorageSync('userInfo', res[1].userInfo);
        this.wxlogin(loginParam);
      })
    }else{
      console.log("token:"+token);
      // 走支付 创建订单
      this.createOrder(token);
    }
   
  },

  /**
   * 请求后端获取用户token
   * @param {} loginParam 
   */
  async wxlogin(loginParam){
    // 发送请求 获取用户的token
    const result=await requestUtil({url:"/users/wxlogin",data:loginParam,method:"post"});
    let token=result.token;
    console.log("token"+token);
    if(result.code==0){
      // 存储token到缓存
      wx.setStorageSync('token', token);
      // 支付继续走 创建订单
      this.createOrder(token);
    }
  },

  /**
   * 创建订单
   */
  async createOrder(token){
   try{
     // const header={Authorization:token};  // 请求头参数
      const totalPrice=this.data.totalPrice; // 请求体 总价
      const address=this.data.address.provinceName+this.data.address.cityName+this.data.address.countyName+this.data.address.detailInfo; // 请求体 收货地址
      const consignee=this.data.address.userName; // 请求体 收货人
      const telNumber=this.data.address.telNumber; // 请求体 联系电话
      let goods=[];
      this.data.cart.forEach(v=>goods.push({
        goodsId:v.id,
        goodsNumber:v.num,
        goodsPrice:v.price,
        goodsName:v.name,
        goodsPic:v.proPic
      }))
      console.log(goods)
      //  发送请求 创建订单
      const orderParams={
        totalPrice,
        address,
        consignee,
        telNumber,
        goods
      }
      const res=await requestUtil({url:"/my/order/create",method:"POST",data:orderParams});
    
      console.log(res.orderNo);
      let orderNo=res.orderNo;
      console.log("orderNo:"+orderNo);
      const preparePayRes=await requestUtil({url:"/my/order/preparePay",method:"POST",data:orderNo});
      console.log("preparePayRes:"+preparePayRes)
      // let payRes=await requestPay(preparePayRes);
      
      // 删除缓冲中 已经支付的商品
      let newCart=wx.getStorageSync('cart');
      newCart=newCart.filter(v=>!v.checked);

      wx.setStorageSync('cart', newCart);

      wx.showToast({
        title: '支付成功',
        icon:'none'
      });

      wx.navigateTo({
        url: '/pages/order/index?type=0',
      })


   }catch(error){
    console.log(error);
    wx.showToast({
      title: '支付失败',
      icon:'none'
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
  // 1，获取缓存中的收货地址信息
  const address=wx.getStorageSync('address');
  // 获取缓冲中的购物车数据
  let cart=wx.getStorageSync('cart')||[];
  // 过滤后的购物车数组
  cart=cart.filter(v=>v.checked);

    // 1 总价格 总数量
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
        totalPrice+=v.num*v.price;
        totalNum+=v.num;
    })
    // 2 给data赋值
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
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