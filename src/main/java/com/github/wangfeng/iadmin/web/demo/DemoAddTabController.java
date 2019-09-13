package com.github.wangfeng.iadmin.web.demo;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/demo/addtab")
@Slf4j
public class DemoAddTabController {

    @RequestMapping(method = RequestMethod.GET)
    public String demoAdminLteOpenMenuWithTab() {
        return "views/demo/addtab/addTab";
    }

    @RequestMapping(value = "/tab_content", method = RequestMethod.GET)
    public String tab_content() {
        return "views/demo/addtab/tab_content";
    }

    @RequestMapping(value = "/tab_first", method = RequestMethod.GET)
    public String tab_first() {
        return "views/demo/addtab/tab_first";
    }

    @RequestMapping(value = "/tab_second", method = RequestMethod.GET)
    public String tab_second() {
        return "views/demo/addtab/tab_second";
    }

    @RequestMapping(value = "/tab_third", method = RequestMethod.GET)
    public String tab_third() {
        return "views/demo/addtab/tab_third";
    }
}
