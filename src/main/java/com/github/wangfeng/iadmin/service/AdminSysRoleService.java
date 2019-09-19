package com.github.wangfeng.iadmin.service;

import com.github.pagehelper.PageInfo;
import com.github.wangfeng.iadmin.common.po.dto.AdminSysRoleQueryWithPageDTO;
import com.github.wangfeng.iadmin.common.po.dto.IdsDTO;
import com.github.wangfeng.iadmin.common.po.entity.AdminSysRoleDO;
import java.util.List;

public interface AdminSysRoleService {

    PageInfo<AdminSysRoleDO> findListPage(AdminSysRoleQueryWithPageDTO adminSysRoleQueryWithPageDTO);


    int addRole(AdminSysRoleDO newRole);

    int updateRole(AdminSysRoleDO updateRole);

    int deleteRole(Long roleId);

    long countByRoleCode(String roleCode);

    long countByRoleName(String roleName);

    /**
     * 用户绑定到role
     * @param roleId
     * @param userIds
     * @return
     */
    int batchAddUsersToRole(Long roleId, List<Long> userIds);
}
