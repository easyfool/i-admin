package com.github.wangfeng.iadmin.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.github.wangfeng.iadmin.common.enums.DataEntityStatusEnum;
import com.github.wangfeng.iadmin.common.po.dto.AdminSysUserQueryWithPageDTO;
import com.github.wangfeng.iadmin.common.po.entity.AdminSysUserDO;
import com.github.wangfeng.iadmin.dao.AdminSysUserMapper;
import com.github.wangfeng.iadmin.service.AdminSysUserService;

import java.util.List;

import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

@Service
public class AdminSysUserServiceImpl implements AdminSysUserService {

    @Autowired
    private AdminSysUserMapper adminSysUserMapper;

    @Override
    public PageInfo<AdminSysUserDO> findUserListPage(@Validated AdminSysUserQueryWithPageDTO adminSysUserQueryDTO) {
        Integer pageNumber = adminSysUserQueryDTO.getPageNumber();
        Integer pageSize = adminSysUserQueryDTO.getPageSize();
        Assert.assertNotNull("pageNumber can not be null", pageNumber);
        Assert.assertNotNull("pageSize can not be null", pageSize);
        PageHelper.startPage(pageNumber, pageSize);
        List<AdminSysUserDO> adminSysUsers = adminSysUserMapper.selectAllWithFuzzyConditions(adminSysUserQueryDTO);
        return new PageInfo<>(adminSysUsers);
    }

    @Override
    public AdminSysUserDO addUser(AdminSysUserDO newUser) {
        adminSysUserMapper.insertSelective(newUser);
        return newUser;
    }

    @Override
    public AdminSysUserDO removeUser(AdminSysUserDO userToRemove) {
        AdminSysUserDO removedUser = userToRemove;
        AdminSysUserDO updateDO = new AdminSysUserDO();
        updateDO.setId(userToRemove.getId());
        updateDO.setStatus(DataEntityStatusEnum.STATTUS_DELTED.getStatusCode());
        adminSysUserMapper.updateByPrimaryKeySelective(updateDO);
        return removedUser;
    }

    @Override
    public int updateUser(AdminSysUserDO adminSysUserDO) {
        return adminSysUserMapper.updateByPrimaryKeySelective(adminSysUserDO);
    }

    @Override
    public long countByLoginName(String loginName) {
        return adminSysUserMapper.countByLoginName(loginName);
    }

    @Override
    public int removeUsers(List<Long> ids) {
        return adminSysUserMapper.updateUsersStatus(ids, DataEntityStatusEnum.STATTUS_DELTED.getStatusCode());
    }

    @Override
    public int lockUsers(List<Long> ids) {
        return adminSysUserMapper.updateUsersStatus(ids, DataEntityStatusEnum.STATTUS_LOCKED.getStatusCode());
    }

    @Override
    public int unlockUsers(List<Long> ids) {
        return adminSysUserMapper.updateUsersStatus(ids, DataEntityStatusEnum.STATTUS_NORMAL.getStatusCode());
    }

    @Override
    public PageInfo<AdminSysUserDO> findUserWithoutRoleListPage(Long roleId,
            AdminSysUserQueryWithPageDTO adminSysUserQueryWithPageDTO) {
        Integer pageNumber = adminSysUserQueryWithPageDTO.getPageNumber();
        Integer pageSize = adminSysUserQueryWithPageDTO.getPageSize();

        PageHelper.startPage(pageNumber, pageSize);
        List<AdminSysUserDO> adminSysUsers = adminSysUserMapper.findUserWithoutRoleListPage(roleId);
        return new PageInfo<>(adminSysUsers);
    }


}
