package com.github.wangfeng.iadmin.common.po.entity;

import java.util.Date;
import lombok.Data;

@Data
public class AdminSysRoleDO {

    private Long id;

    private String roleCode;

    private String roleName;

    private Integer roleSort;

    private String remarks;

    private String createBy;

    private Date createDate;

    private String updateBy;

    private Date updateDate;

    private Integer status;


}