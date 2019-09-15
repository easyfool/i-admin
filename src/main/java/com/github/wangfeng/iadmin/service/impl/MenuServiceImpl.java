package com.github.wangfeng.iadmin.service.impl;

import com.github.wangfeng.iadmin.common.enums.DataEntityStatusEnum;
import com.github.wangfeng.iadmin.common.po.entity.AdminSysMenuDO;
import com.github.wangfeng.iadmin.dao.AdminSysMenuMapper;
import com.github.wangfeng.iadmin.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MenuServiceImpl implements MenuService {
    @Autowired
    private AdminSysMenuMapper adminSysMenuMapper;

    @Override
    public List<AdminSysMenuDO> findMenus() {
        return adminSysMenuMapper.selectAll();
    }


    /**
     * 基于左右值得树状存储结构进行 节点插入
     *
     * @param parentMenuId
     * @param newMenu
     * @return
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public AdminSysMenuDO addMenu(Long parentMenuId, AdminSysMenuDO newMenu) {
        //a．查找当前插入节点的父节点的lft值
        AdminSysMenuDO parentMenu = adminSysMenuMapper.selectByPrimaryKey(parentMenuId);
        Long right = parentMenu.getRight();
        //b．将树形中所有lft和rgt节点大于父节点左值的节点都+2
        adminSysMenuMapper.updateRightForAddMenu(right);
        adminSysMenuMapper.updateLeftForAddMenu(right);
        adminSysMenuMapper.insert(buildNewMenu(parentMenu, newMenu));
        return newMenu;
    }

    private AdminSysMenuDO buildNewMenu(AdminSysMenuDO parentMenu, AdminSysMenuDO newMenu) {
        //c．将父节点左值+1，左值+2分别作为当前节点的lft和rgt
        Integer level = parentMenu.getLevel() + 1;
        Long right = parentMenu.getRight();
        newMenu.setLeft(right);
        newMenu.setRight(right + 1);
        newMenu.setLevel(level);
//        insertDO.setIcon(icon);
//        insertDO.setUrl(url);
//        insertDO.setCreateDate();
//        insertDO.setCreateBy();
//        insertDO.setUpdateDate();
//        insertDO.setUpdateBy();
        newMenu.setStatus(DataEntityStatusEnum.STATTUS_NORMAL.getStatusCode());
//        insertDO.setPermission(permission);
        newMenu.setParentId(parentMenu.getId());
        return newMenu;

    }

    /**
     * 查询所有子孙节点菜单
     *
     * @param parentMenu
     * @return
     */
    @Override
    public List<AdminSysMenuDO> findDescendantMenus(AdminSysMenuDO parentMenu) {
        Long left = parentMenu.getLeft();
        Long right = parentMenu.getRight();
        return adminSysMenuMapper.listDescendantMenus(left, right, DataEntityStatusEnum.STATTUS_NORMAL.getStatusCode());
    }

    @Override
    public int countDescendantMenus(AdminSysMenuDO parentMenu) {
        Long right = parentMenu.getRight();
        Long left = parentMenu.getLeft();
        return (right.intValue() - left.intValue() - 1) / 2;
    }

    @Override
    public List<AdminSysMenuDO> findAnscestralMenus(AdminSysMenuDO menu) {
        Long right = menu.getRight();
        Long left = menu.getLeft();

        return adminSysMenuMapper.listAncestralMenus(left, right, DataEntityStatusEnum.STATTUS_NORMAL.getStatusCode());

    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public AdminSysMenuDO removeMenu(AdminSysMenuDO menuToRemove) {
        AdminSysMenuDO removedMenu = menuToRemove;
        Long right = menuToRemove.getRight();
        Long left = menuToRemove.getLeft();
        int width = right.intValue() - left.intValue() + 1;
        adminSysMenuMapper.deleteForRemoveMenu(left, right);
        adminSysMenuMapper.updateRightForRemoveMenu(width, right);
        adminSysMenuMapper.updateLeftForRemoveMenu(width, right);

        return removedMenu;
    }

    @Override
    public int updateMenu(AdminSysMenuDO menu) {
        return adminSysMenuMapper.updateByPrimaryKey(menu);
    }

    @Override
    public AdminSysMenuDO findMenuByMenuId(long id) {
        return adminSysMenuMapper.selectByPrimaryKey(id);
    }


}
