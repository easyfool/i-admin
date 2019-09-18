package com.github.wangfeng.iadmin.common.po.dto;

import lombok.Data;

@Data
public class AdminSysUserQueryWithPageDTO extends PageQueryDTO {

    private String loginName;

    private String nickName;

    private String userCode;

    private String realName;

    private String mobile;

    private String email;

    private String sex;

    private Integer status;

}
