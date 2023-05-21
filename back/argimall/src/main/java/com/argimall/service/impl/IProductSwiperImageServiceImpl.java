package com.argimall.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.argimall.entity.ProductSwiperImage;
import com.argimall.mapper.ProductSwiperImageMapper;
import com.argimall.service.IProductSwiperImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 商品Service实现类
 */
@Service("productSwiperImageService")
public class IProductSwiperImageServiceImpl extends ServiceImpl<ProductSwiperImageMapper,ProductSwiperImage> implements IProductSwiperImageService {

    @Autowired
    private ProductSwiperImageMapper productSwiperImageMapper;


}
