package com.argimall.controller.admin;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.argimall.entity.OrderDetail;
import com.argimall.entity.R;
import com.argimall.service.IOrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 管理端-订单详情Controller控制器
 */
@RestController
@RequestMapping("/admin/orderDetail")
public class AdminOrderDetailController {

    @Autowired
    private IOrderDetailService orderDetailService;

    /**
     * 根据订单号查询订单详情
     * @param id
     * @return
     */
    @GetMapping("/list/{id}")
    public R listByOrderId(@PathVariable(value = "id") Integer id){
        System.out.println("id="+id);
        List<OrderDetail> orderDetailList = orderDetailService.list(new QueryWrapper<OrderDetail>().eq("mId", id));
        Map<String,Object> resultMap=new HashMap<>();
        resultMap.put("list",orderDetailList);
        return R.ok(resultMap);
    }

}
