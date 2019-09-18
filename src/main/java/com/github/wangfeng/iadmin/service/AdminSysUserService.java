package com.github.wangfeng.iadmin.service;

import com.github.pagehelper.PageInfo;
import com.github.wangfeng.iadmin.common.po.dto.AdminSysUserQueryWithPageDTO;
import com.github.wangfeng.iadmin.common.po.entity.AdminSysUserDO;

public interface AdminSysUserService {

    PageInfo<AdminSysUserDO> findUserListPage(AdminSysUserQueryWithPageDTO adminSysUserQueryDTO);

    AdminSysUserDO addUser(AdminSysUserDO newUser);

    AdminSysUserDO removeUser(AdminSysUserDO userToRemove);

    int updateUser(AdminSysUserDO adminSysUserDO);

}
