package com.github.wangfeng.iadmin.common.util.tree.v1;

import java.util.List;

import lombok.Data;

@Data
public class Node {

    /**
     *
     */
    private static final long serialVersionUID = 8875995344582620331L;
    private String id;
    private String parentId;
    private Node parent;
    private List<Node> children;
    private int level;
    private String rootId;
    private boolean leaf;

    public Node() {
    }

    public Node(String id, String parentId) {
        this.id = id;
        this.parentId = parentId;
    }


}
