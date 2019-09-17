package com.github.wangfeng.iadmin.dao;

import com.github.wangfeng.iadmin.common.po.entity.AdminSysUserDO;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminSysUserMapper {

    int insert(AdminSysUserDO record);

    List<AdminSysUserDO> selectAll();
}