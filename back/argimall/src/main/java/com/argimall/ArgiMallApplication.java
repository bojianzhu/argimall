package com.argimall;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.argimall.mapper")
public class ArgiMallApplication {

    public static void main(String[] args) {
        SpringApplication.run(ArgiMallApplication.class, args);
    }

}
