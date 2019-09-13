package com.github.wangfeng.iadmin.web.demo;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/demo")
@Slf4j
public class DemoController {

    @RequestMapping(method = RequestMethod.GET)
    public String demoIndex() {
        return "views/demo/index";
    }

    @RequestMapping(value = "/adminlte", method = RequestMethod.GET)
    public String demoAdminLte() {
        return "views/demo/adminLte";
    }






}
