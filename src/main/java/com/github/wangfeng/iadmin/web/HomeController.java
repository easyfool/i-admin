package com.github.wangfeng.iadmin.web;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/index")
@Slf4j
public class HomeController {

    @RequestMapping(method = RequestMethod.GET)
    public String homePage() {
        return "views/index";
    }
}
