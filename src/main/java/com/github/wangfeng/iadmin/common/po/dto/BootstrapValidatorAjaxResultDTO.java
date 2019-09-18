package com.github.wangfeng.iadmin.common.po.dto;

import lombok.Data;

/**
 * 使用boostrap validator插件进行ajax校验，获得一个json数据（{'valid': true or false}）
 */
@Data
public class BootstrapValidatorAjaxResultDTO {
    private Boolean valid;
}
