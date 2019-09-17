package com.github.wangfeng.iadmin.common.enums;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 数据库数据状态
 */
@AllArgsConstructor
@Getter
public enum DataEntityStatusEnum {
    STATTUS_NORMAL(0, "正常"),
    STATTUS_DELTED(1, "删除"),
    STATUS_DISABLE(2, "不可用"),
    STATUS_FREEZE(3, "冻结"),
    STATUS_AUDIT(4, "授权"),
    STATUS_AUDIT_BACK(5, ""),
    STATTUS_BANNED(6, "禁用"),
    //STATTUS_LOCKED(7, "锁定"),
    //STATTUS_LOCKED(8, "锁定"),
    STATUS_DRAFT(9, "锁定")
    ;
    private int statusCode;
    private String descrition;
}
