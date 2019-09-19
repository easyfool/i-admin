package com.github.wangfeng.iadmin.service;

import com.github.pagehelper.PageInfo;
import com.github.wangfeng.iadmin.common.po.dto.AdminSysUserQueryWithPageDTO;
import com.github.wangfeng.iadmin.common.po.entity.AdminSysUserDO;
import java.util.List;

public interface AdminSysUserService {

    PageInfo<AdminSysUserDO> findUserListPage(AdminSysUserQueryWithPageDTO adminSysUserQueryDTO);

    AdminSysUserDO addUser(AdminSysUserDO newUser);

    AdminSysUserDO removeUser(AdminSysUserDO userToRemove);

    int updateUser(AdminSysUserDO adminSysUserDO);

    long countByLoginName(String loginName);

    int removeUsers(List<Long> ids);

    int lockUsers(List<Long> ids);

    int unlockUsers(List<Long> ids);

    /**
     * 查询没有角色**的用户列表
     * @param roleId
     * @param adminSysUserQueryWithPageDTO
     * @return
     */
    PageInfo<AdminSysUserDO> findUserWithoutRoleListPage(Long roleId, AdminSysUserQueryWithPageDTO adminSysUserQueryWithPageDTO);
}
