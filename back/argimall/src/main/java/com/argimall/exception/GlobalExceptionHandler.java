package com.argimall.exception;

import com.argimall.entity.R;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
@ResponseBody
public class GlobalExceptionHandler {
    @ExceptionHandler(value = Exception.class)
    public R exceptionHandler(HttpServletRequest request, Exception e){
        System.out.println("全局异常");
        return R.error(e.getMessage());
    }
}
