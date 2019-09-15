package com.github.wangfeng.iadmin.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 数据库数据状态
 */
@AllArgsConstructor
@Getter
public enum DataEntityStatusEnum {
    STATTUS_NORMAL(0, "正常"),
    STATTUS_BANNED(1, "禁用"),
    STATTUS_LOCKED(2, "锁定"),
    STATTUS_DELTED(3, "删除"),
    ;
    private int statusCode;
    private String descrition;
}
