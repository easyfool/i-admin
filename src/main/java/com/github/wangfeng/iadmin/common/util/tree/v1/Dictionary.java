package com.github.wangfeng.iadmin.common.util.tree.v1;

import lombok.Data;

@Data
public class Dictionary extends Node {

    /**
     *
     */
    private static final long serialVersionUID = 8875995344582620331L;
    private String code;
    private String label;
    private Integer sort;

    public Dictionary() {
    }

    public Dictionary(String id, String parentId) {
        super(id, parentId);
    }

    public Dictionary(String id, String parentId, String code, String label, Integer sort) {
        super(id, parentId);
        this.code = code;
        this.label = label;
        this.sort = sort;
    }


}
