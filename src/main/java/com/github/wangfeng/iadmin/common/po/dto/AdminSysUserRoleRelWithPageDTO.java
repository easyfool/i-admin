package com.github.wangfeng.iadmin.common.po.dto;

import lombok.Data;

/**
 * 查询拥有角色X的用户列表
 */
@Data
public class AdminSysUserRoleRelWithPageDTO extends AdminSysUserQueryWithPageDTO {

    private Long roleId;
}
