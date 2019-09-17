package com.github.wangfeng.iadmin.common.po.entity;

import java.util.Date;
import lombok.Data;

@Data
public class AdminSysUserMenuRelDO {

    private Long id;

    private Long userId;

    private Long menuId;

    private String remark;

    private Integer status;

    private Date createDate;

    private String createBy;

    private Date updateDate;

    private String updateBy;


}