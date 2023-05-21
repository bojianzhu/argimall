package com.argimall.controller.admin;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.argimall.entity.PageBean;
import com.argimall.entity.R;
import com.argimall.entity.WxUserInfo;
import com.argimall.service.IWxUserInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * 管理端-用户Controller控制器
 */
@RestController
@RequestMapping("/admin/user")
public class AdminUserController {

    @Autowired
    private IWxUserInfoService wxUserInfoService;

    private final static Logger logger= LoggerFactory.getLogger(AdminUserController.class);

    @RequestMapping("/list")
    public R list(@RequestBody PageBean pageBean){
        System.out.println(pageBean);
        String query=pageBean.getQuery().trim();
        Page<WxUserInfo> page=new Page<>(pageBean.getPageNum(),pageBean.getPageSize());
        Page<WxUserInfo> pageResult = wxUserInfoService.page(page, new QueryWrapper<WxUserInfo>().like("nickName", query));
        Map<String,Object> map=new HashMap<>();
        map.put("userList",pageResult.getRecords());
        map.put("total",pageResult.getTotal());
        return R.ok(map);
    }

}
