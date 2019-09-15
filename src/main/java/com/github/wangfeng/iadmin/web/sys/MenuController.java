package com.github.wangfeng.iadmin.web.sys;

import com.github.wangfeng.iadmin.common.po.dto.MenuDTO;
import com.github.wangfeng.iadmin.common.po.entity.AdminSysMenuDO;
import com.github.wangfeng.iadmin.common.response.ResponseResult;
import com.github.wangfeng.iadmin.service.MenuService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/sys/admin/menu")
@Slf4j
public class MenuController {

    @Autowired
    private MenuService menuService;

    @RequestMapping(value = "list", method = RequestMethod.GET)
    public String menuListPage() {

        return "views/sys/menu/list";

    }

    @RequestMapping(value = "listMenus")
    @ResponseBody
    public List<AdminSysMenuDO> listMenus() {
//        ResponseResult<List<AdminSysMenuDO>> responseResult = new ResponseResult<>();
        List<AdminSysMenuDO> menuList = menuService.findMenus();
//        responseResult.setSuccess(Boolean.TRUE);
//        responseResult.setContent(menuList);
        return menuList;

    }

    @RequestMapping(value = "add", method = RequestMethod.POST)
    @ResponseBody
    public ResponseResult addMenu(@RequestBody AdminSysMenuDO newMenu) {
        AdminSysMenuDO adminSysMenuDO = menuService.addMenu(newMenu.getParentId(), newMenu);
        ResponseResult responseResult = new ResponseResult();
        responseResult.setSuccess(Boolean.TRUE);
        return responseResult;
    }

    @RequestMapping(value = "update", method = RequestMethod.POST)
    @ResponseBody
    public ResponseResult updateMenu(@RequestBody AdminSysMenuDO menu) {
        int updateResult = menuService.updateMenu(menu);
        ResponseResult responseResult = new ResponseResult();
        responseResult.setSuccess(Boolean.TRUE);
        return responseResult;
    }

    @RequestMapping(value = "/delete/{menuId}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseResult deleteMenu(@PathVariable("menuId") String menuId) {


        AdminSysMenuDO menu = menuService.findMenuByMenuId(Long.parseLong(menuId));
        menuService.removeMenu(menu);
        ResponseResult responseResult = new ResponseResult();
        responseResult.setSuccess(Boolean.TRUE);
        return responseResult;
    }
}
