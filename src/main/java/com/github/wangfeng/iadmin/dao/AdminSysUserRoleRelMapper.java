package com.github.wangfeng.iadmin.dao;

import com.github.wangfeng.iadmin.common.po.entity.AdminSysUserRoleRelDO;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminSysUserRoleRelMapper {

    int insert(AdminSysUserRoleRelDO record);

    List<AdminSysUserRoleRelDO> selectAll();
}