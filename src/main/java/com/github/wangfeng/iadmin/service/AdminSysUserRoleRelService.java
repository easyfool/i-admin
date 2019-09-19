package com.github.wangfeng.iadmin.service;

import com.github.pagehelper.PageInfo;
import com.github.wangfeng.iadmin.common.po.dto.AdminSysUserRoleRelDTO;
import com.github.wangfeng.iadmin.common.po.dto.AdminSysUserRoleRelWithPageDTO;
import com.github.wangfeng.iadmin.common.po.dto.UserWithRoleQueryDTO;
import com.github.wangfeng.iadmin.common.po.entity.AdminSysUserDO;

/**
 * 用户角色关联Service
 */
public interface AdminSysUserRoleRelService {

    /**
     * 查询角色X的用户列表
     * @param userWithRoleQueryDTO
     * @return
     */
    PageInfo<AdminSysUserRoleRelDTO> findRoleOwners(UserWithRoleQueryDTO userWithRoleQueryDTO);

    int remove(Long userRoleRelId);

}
