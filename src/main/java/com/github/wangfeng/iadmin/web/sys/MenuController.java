package com.github.wangfeng.iadmin.web.sys;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/sys/admin/menu")
@Slf4j
public class MenuController {
    @RequestMapping(value = "list", method = RequestMethod.GET)
    public String listMenu() {

        return "views/sys/menu/list";

    }
}
