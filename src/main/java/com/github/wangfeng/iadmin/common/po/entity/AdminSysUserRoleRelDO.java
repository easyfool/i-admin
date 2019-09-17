package com.github.wangfeng.iadmin.common.po.entity;

import java.util.Date;
import lombok.Data;

@Data
public class AdminSysUserRoleRelDO {

    private Long id;

    private Long userId;

    private Long roleId;

    private String remark;

    private Integer status;

    private Date createDate;

    private String createBy;

    private Date updateDate;

    private String updateBy;


}