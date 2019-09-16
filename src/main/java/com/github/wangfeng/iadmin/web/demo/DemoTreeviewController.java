package com.github.wangfeng.iadmin.web.demo;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/demo/treeview")
@Slf4j
public class DemoTreeviewController {
    @RequestMapping(method = RequestMethod.GET)
    public String demoAdminLteOpenMenuWithTab() {
        return "views/demo/bootstrap-treeview";
//        return "views/demo/closable-tab/index_iframe";
    }
}
