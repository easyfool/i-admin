package com.github.wangfeng.iadmin.dao;

import com.github.wangfeng.iadmin.common.po.entity.AdminSysUserMenuRelDO;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminSysUserMenuRelMapper {
    int insert(AdminSysUserMenuRelDO record);

    List<AdminSysUserMenuRelDO> selectAll();
}