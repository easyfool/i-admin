package com.github.wangfeng.iadmin.common.po.dto;

import lombok.Data;

@Data
public class PageQueryDTO {

    private Integer limit;
    private Integer pageSize;
    private Integer pageNumber;
    private Integer offset;


}
