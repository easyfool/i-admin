package com.github.wangfeng.iadmin.dao;

import com.github.wangfeng.iadmin.common.po.entity.AdminSysRoleDO;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminSysRoleMapper {

    int insert(AdminSysRoleDO record);

    List<AdminSysRoleDO> selectAll();
}