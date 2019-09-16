package com.github.wangfeng.iadmin.common.po.dto;

import com.github.wangfeng.iadmin.common.util.tree.TreeBuilder;
import lombok.Data;

@Data
public class MenuDTO {

    /**
     * id : 1
     * pid : 0
     * status : 1
     * name : 用户管理
     * permission : open:user:manage
     */

    private int id;
    private int pid;
    private int status;
    private int left;
    private int right;
    private String name;
    private String permission;
    private String url;
    private String icon;


}
