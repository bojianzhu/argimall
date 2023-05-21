// 导入request请求工具方法
import {getBaseUrl, requestUtil,getLogin,getUserProfile, requestPay} from "../../utils/requestUtil.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

      wx.showModal({
        title:'友情提示',
        content:'微信授权登录后，才可进入个人中心',
        success:(res)=>{

          Promise.all([getLogin(),getUserProfile()]).then((res)=>{
            console.log(res)
            let loginParam={
              code:res[0].code,
              nickName:res[1].userInfo.nickName,
              avatarUrl:res[1].userInfo.avatarUrl
            }
            console.log(loginParam);
            // 把用户信息放到缓存中
            wx.setStorageSync('userInfo', res[1].userInfo);
            this.wxlogin(loginParam);
            this.setData({userInfo:res[1].userInfo});
          })
        }
      })
    }else{
      console.log("token:"+token);
    }
  },

  
  // 点击 编辑收货地址
  handleEditAddress(){
    console.log("编辑收货地址")
    wx.chooseAddress({
    
    });

  },

    /**
   * 请求后端获取用户token
   * @param {} loginParam 
   */
  async wxlogin(loginParam){
    // 发送请求 获取用户的token
    const result=await requestUtil({url:"/users/wxlogin",data:loginParam,method:"post"});
    let token=result.token;
    if(result.code==0){
      // 存储token到缓存
      wx.setStorageSync('token', token);
    
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow")
    const userInfo=wx.getStorageSync('userInfo');
    this.setData({userInfo});
  }

})