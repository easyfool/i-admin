package com.github.wangfeng.iadmin.service;

import com.github.wangfeng.iadmin.common.po.entity.AdminSysMenuDO;

import java.util.List;

public interface MenuService {

    List<AdminSysMenuDO> findMenus();

    /**
     * 基于左右值树形结构 添加菜单
     *
     * @param parentMenuId
     * @param newMenu
     * @return
     */
    AdminSysMenuDO addMenu(Long parentMenuId, AdminSysMenuDO newMenu);

    /**
     * 基于左右值树形结构 查询子孙菜单
     *
     * @param parentMenu
     * @return
     */
    List<AdminSysMenuDO> findDescendantMenus(AdminSysMenuDO parentMenu);

    /**
     * 计算该节点下子孙节点数量
     *
     * @param parentMenu 父菜单
     * @return
     */
    int countDescendantMenus(AdminSysMenuDO parentMenu);

    /**
     * 查询踩点的所有父（祖先）节点菜单
     *
     * @param menu
     * @return
     */
    List<AdminSysMenuDO> findAnscestralMenus(AdminSysMenuDO menu);

    /**
     * 删除菜单
     *
     * @param menuToRemove
     * @return
     */
    AdminSysMenuDO removeMenu(AdminSysMenuDO menuToRemove);

    int updateMenu(AdminSysMenuDO menu);

    AdminSysMenuDO findMenuByMenuId(long id);

}
