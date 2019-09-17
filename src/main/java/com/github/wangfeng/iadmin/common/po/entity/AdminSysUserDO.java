package com.github.wangfeng.iadmin.common.po.entity;

import java.util.Date;
import lombok.Data;

@Data
public class AdminSysUserDO {
    private Long id;

    private String userCode;

    private String loginName;

    private String nickName;

    private String realName;

    private String password;

    private String salt;

    private String mobile;

    private String email;

    private String sex;

    private String remark;

    private Integer status;

    private Date createDate;

    private String createBy;

    private Date updateDate;

    private String updateBy;

   }