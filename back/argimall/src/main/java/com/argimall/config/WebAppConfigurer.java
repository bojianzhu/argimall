package com.argimall.config;

import com.argimall.interceptor.SysInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Web项目配置类
@Configuration
public class WebAppConfigurer implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowCredentials(true)
                .allowedMethods("GET", "HEAD", "POST", "PUT", "DELETE","OPTIONS")
                .maxAge(3600);
    }

    @Bean
    public SysInterceptor sysInterceptor(){
        return new SysInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        String[] patterns=new String[]{"/adminLogin","/product/**","/bigType/**","/users/wxlogin","/weixinpay/**"};
        registry.addInterceptor(sysInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns(patterns);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/image/swiper/**").addResourceLocations("file:D:\\MyWork\\学业\\大三下\\软件工程\\project\\picture\\swiperImgs\\");
        registry.addResourceHandler("/image/bigType/**").addResourceLocations("file:D:\\MyWork\\学业\\大三下\\软件工程\\project\\picture\\bigTypeImgs\\");
        registry.addResourceHandler("/image/product/**").addResourceLocations("file:D:\\MyWork\\学业\\大三下\\软件工程\\project\\picture\\productImgs\\");
        registry.addResourceHandler("/image/productSwiperImgs/**").addResourceLocations("file:D:\\MyWork\\学业\\大三下\\软件工程\\project\\picture\\productSwiperImgs\\");
        registry.addResourceHandler("/image/productIntroImgs/**").addResourceLocations("file:D:\\MyWork\\学业\\大三下\\软件工程\\project\\picture\\productIntroImgs\\");
        registry.addResourceHandler("/image/productParaImgs/**").addResourceLocations("file:D:\\MyWork\\学业\\大三下\\软件工程\\project\\picture\\productParaImgs\\");
    }



}
