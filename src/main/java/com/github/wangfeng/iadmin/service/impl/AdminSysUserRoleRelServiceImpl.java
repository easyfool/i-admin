package com.github.wangfeng.iadmin.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.github.wangfeng.iadmin.common.po.dto.AdminSysUserRoleRelDTO;
import com.github.wangfeng.iadmin.common.po.dto.AdminSysUserRoleRelWithPageDTO;
import com.github.wangfeng.iadmin.common.po.dto.UserWithRoleQueryDTO;
import com.github.wangfeng.iadmin.common.po.entity.AdminSysUserDO;
import com.github.wangfeng.iadmin.dao.AdminSysUserRoleRelMapper;
import com.github.wangfeng.iadmin.service.AdminSysUserRoleRelService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminSysUserRoleRelServiceImpl implements AdminSysUserRoleRelService {

    @Autowired
    private AdminSysUserRoleRelMapper adminSysUserRoleRelMapper;

    @Override
    public PageInfo<AdminSysUserRoleRelDTO> findRoleOwners(UserWithRoleQueryDTO userWithRoleQueryDTO) {
        PageHelper.startPage(userWithRoleQueryDTO.getPageNumber(),
                userWithRoleQueryDTO.getPageSize());
        List<AdminSysUserRoleRelDTO> list = adminSysUserRoleRelMapper.selectRoleOwners(userWithRoleQueryDTO);
        return new PageInfo<>(list);
    }

    @Override
    public int remove(Long userRoleRelId) {
        return adminSysUserRoleRelMapper.deleteByPrimaryKey(userRoleRelId);
    }
}
