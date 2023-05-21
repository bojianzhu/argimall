package com.argimall.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.argimall.entity.WxUserInfo;
import com.argimall.mapper.WxUserInfoMapper;
import com.argimall.service.IWxUserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * 微信用户信息Service实现类

 */
@Service("wxUserInfoService")
public class IWxUserInfoServiceImpl extends ServiceImpl<WxUserInfoMapper,WxUserInfo> implements IWxUserInfoService {

    @Autowired
    private WxUserInfoMapper wxUserInfoMapper;


}
