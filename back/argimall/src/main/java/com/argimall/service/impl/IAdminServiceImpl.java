package com.argimall.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.argimall.entity.Admin;
import com.argimall.mapper.AdminMapper;
import com.argimall.service.IAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * 管理员Service实现类
 */
@Service("adminService")
public class IAdminServiceImpl extends ServiceImpl<AdminMapper,Admin> implements IAdminService {

    @Autowired
    private AdminMapper adminMapper;


    @Override
    public Integer update(Admin admin) {
        return adminMapper.update(admin);
    }
}
