package com.github.wangfeng.iadmin;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
@MapperScan(basePackages = {"com.github.wangfeng.iadmin.dao"})
public class IAdminApplication {

    public static void main(String[] args) {
        SpringApplication.run(IAdminApplication.class, args);
    }

}
