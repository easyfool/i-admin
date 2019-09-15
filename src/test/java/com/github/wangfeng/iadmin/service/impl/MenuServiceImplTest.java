package com.github.wangfeng.iadmin.service.impl;

import com.github.wangfeng.iadmin.common.po.entity.AdminSysMenuDO;
import com.github.wangfeng.iadmin.service.MenuService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class MenuServiceImplTest {

    @Autowired
    private MenuService menuService;

    @Test
    public void test() {
        List<AdminSysMenuDO> menus = menuService.findMenus();
        System.out.println(menus);
    }


}