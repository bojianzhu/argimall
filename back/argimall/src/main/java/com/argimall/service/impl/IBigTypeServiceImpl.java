package com.argimall.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.argimall.entity.BigType;
import com.argimall.mapper.BigTypeMapper;
import com.argimall.service.IBigTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


 /**
 * 商品大类Service实现类
 */
@Service("bigTypeService")
public class IBigTypeServiceImpl extends ServiceImpl<BigTypeMapper,BigType> implements IBigTypeService {

    @Autowired
    private BigTypeMapper bigTypeMapper;


}
