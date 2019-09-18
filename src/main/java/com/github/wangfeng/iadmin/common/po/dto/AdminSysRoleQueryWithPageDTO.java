package com.github.wangfeng.iadmin.common.po.dto;

import lombok.Data;

@Data
public class AdminSysRoleQueryWithPageDTO extends PageQueryDTO {

    private String roleCode;
    private String roleName;

}
