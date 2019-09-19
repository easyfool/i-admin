package com.github.wangfeng.iadmin.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.github.wangfeng.iadmin.common.enums.DataEntityStatusEnum;
import com.github.wangfeng.iadmin.common.po.dto.AdminSysRoleQueryWithPageDTO;
import com.github.wangfeng.iadmin.common.po.dto.IdsDTO;
import com.github.wangfeng.iadmin.common.po.entity.AdminSysRoleDO;
import com.github.wangfeng.iadmin.dao.AdminSysRoleMapper;
import com.github.wangfeng.iadmin.service.AdminSysRoleService;

import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AdminSysRoleServiceImpl implements AdminSysRoleService {

    @Autowired
    private AdminSysRoleMapper adminSysRoleMapper;

    @Override
    public PageInfo<AdminSysRoleDO> findListPage(AdminSysRoleQueryWithPageDTO adminSysRoleQueryWithPageDTO) {
        Integer pageNumber = adminSysRoleQueryWithPageDTO.getPageNumber();
        Integer pageSize = adminSysRoleQueryWithPageDTO.getPageSize();
        Assert.assertNotNull("pageNumber can not be null", pageNumber);
        Assert.assertNotNull("pageSize can not be null", pageSize);
        PageHelper.startPage(pageNumber, pageSize);
        List<AdminSysRoleDO> adminSysRoles = adminSysRoleMapper.selectAllWithFuzzyConditions(adminSysRoleQueryWithPageDTO);
        return new PageInfo<>(adminSysRoles);
    }

    @Override
    public int addRole(AdminSysRoleDO newRole) {
        return adminSysRoleMapper.insertSelective(newRole);
    }

    @Override
    public int updateRole(AdminSysRoleDO updateRole) {
        return adminSysRoleMapper.updateByPrimaryKeySelective(updateRole);
    }

    @Override
    public int deleteRole(Long roleId) {
        AdminSysRoleDO updateDO = new AdminSysRoleDO();
        updateDO.setId(roleId);
        updateDO.setStatus(DataEntityStatusEnum.STATTUS_DELTED.getStatusCode());

        return adminSysRoleMapper.updateByPrimaryKeySelective(updateDO);
    }

    @Override
    public long countByRoleCode(String roleCode) {
        return adminSysRoleMapper.countByRoleCode(roleCode);
    }

    @Override
    public long countByRoleName(String roleName) {
        return adminSysRoleMapper.countByRoleName(roleName);
    }

    @Override
    public int batchAddUsersToRole(Long roleId, List<Long> userIds) {
        return adminSysRoleMapper.batchAddUsersToRole(roleId,userIds);
    }
}
