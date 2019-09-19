package com.github.wangfeng.iadmin.common.po.dto;

import lombok.Data;

/**
 * 角色分配用户展示table dto
 */
@Data
public class AdminSysUserRoleRelDTO {

    private Long id;
    private Long userId;
    private Long roleId;
    private String loginName;
    private String roleName;
    private String userRealName;
    private Integer roleStatus;
    private Integer userStatus;

}
