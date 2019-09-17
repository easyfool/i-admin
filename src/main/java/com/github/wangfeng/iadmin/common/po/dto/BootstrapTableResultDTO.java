package com.github.wangfeng.iadmin.common.po.dto;

import java.util.List;
import lombok.Data;

/**
 * 使用bootstrap table作为表格显示，需要返回如下格式的json才能解析
 * @param <T>
 */
@Data
public class BootstrapTableResultDTO<T> {

    private List<T> rows;
    private Long total;

}
