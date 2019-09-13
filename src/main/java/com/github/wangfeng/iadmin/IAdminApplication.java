package com.github.wangfeng.iadmin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class IAdminApplication {

    public static void main(String[] args) {
        SpringApplication.run(IAdminApplication.class, args);
    }

}
