package com.github.wangfeng.iadmin.common.po.dto;

import lombok.Data;

@Data
public class AdminSysUserQueryWithPageDTO extends PageQueryDTO {

    private String loginName;
    private String nickName;
}
