package com.github.wangfeng.iadmin.common.po.dto;

import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PageQueryDTO {

    private Integer limit;
    @NotNull
    private Integer pageSize;
    @NotNull
    private Integer pageNumber;
    private Integer offset;


}
