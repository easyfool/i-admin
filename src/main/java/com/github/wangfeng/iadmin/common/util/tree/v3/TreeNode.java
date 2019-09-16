package com.github.wangfeng.iadmin.common.util.tree.v3;

import java.util.List;

public abstract class TreeNode<T extends TreeNode<T>> {

    /**
     * 判断是否是主枝干
     *
     * @return
     */
    public boolean isTrunk() {
        return getParentId() == null;
    }

    /**
     * 判断本节点是否是node的父节点
     *
     * @param node
     * @return
     */
    public boolean isParentOf(T node) {
        if (node != null) {
            return this.getId().equals(node.getParentId());
        }
        return false;
    }

    /**
     * 判断本节点是否是node的孩子节点
     *
     * @param node
     * @return
     */
    public boolean isChildOf(T node) {
        if (node == null) {
            if (this.getParentId() == null) {
                return true;
            }
        } else {
            return node.getId().equals(this.getParentId());
        }
        return false;
    }

    public abstract String getParentId();

    public abstract void setParentId(String parentId);

    public abstract String getId();

    public abstract void setId(String id);

    public abstract List<T> getNodes();

    public abstract void setNodes(List<T> child);

}
