package com.github.wangfeng.iadmin.common.po.dto;

import lombok.Data;

/**
 * 角色分配用户界面
 * 查询拥有某个角色的用户列表
 * 其他条件包括用户名，昵称等
 */
@Data
public class UserWithRoleQueryDTO extends PageQueryDTO {

    private Long roleId;
    private String nickName;
    private String loginName;
}
