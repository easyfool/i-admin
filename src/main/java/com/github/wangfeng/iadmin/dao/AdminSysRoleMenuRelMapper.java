package com.github.wangfeng.iadmin.dao;

import com.github.wangfeng.iadmin.common.po.entity.AdminSysRoleMenuRelDO;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminSysRoleMenuRelMapper {

    int insert(AdminSysRoleMenuRelDO record);

    List<AdminSysRoleMenuRelDO> selectAll();
}