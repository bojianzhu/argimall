// 导入request请求工具方法
import {getBaseUrl, requestUtil} from "../../utils/requestUtil.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
 data:{
   // 轮播图数组
   swiperList: [],
   baseUrl:'',
   bigTypeList:[],
   bigTypeList_row1:[],
   bigTypeList_row2:[],
   hotProductList:[]
 },
 onLoad:function(){
  this.getSwiperList();
  this.getBigTypeList();
  this.getHotProductList();
 },
 // 获取轮播图数据
 async getSwiperList(){
  // requestUtil({ url: "/home/swiperdata" })
  //   .then(result => {
  //     this.setData({
  //       swiperList: result
  //     })
  //   })

    const result=await requestUtil({url: "/product/findSwiper"});
    
    const baseUrl=getBaseUrl();
    console.log(baseUrl);
    console.log(result)
    this.setData({
      swiperList: result.message,
      baseUrl:baseUrl
    })
  },

  // 获取商品大类数据
  async getBigTypeList(){
    const result=await requestUtil({url: "/bigType/findAll"});
    console.log(result)
    const bigTypeList_row1=result.message.filter((item,index)=>{
      return index<4;
    })
    const bigTypeList_row2=result.message.filter((item,index)=>{
      return index>=4;
    })
    this.setData({
      bigTypeList: result,
      bigTypeList_row1,
      bigTypeList_row2
    })
  },

  // 获取热卖商品
  async getHotProductList(){
    const result=await requestUtil({url: "/product/findHot"});
    console.log(result);
    this.setData({
      hotProductList:result.message
    })
  },

  // 大类点击事件处理 存储商品类别到全局数据
  handleTypeJump(event){
    var index=event.currentTarget.dataset.index;
    console.log("index:"+index)
    const app=getApp();
    app.globalData.index=index;
  
    wx.switchTab({
      url: '/pages/category/index'
    })
  }

  

})