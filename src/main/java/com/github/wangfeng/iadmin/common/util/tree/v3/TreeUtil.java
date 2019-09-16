package com.github.wangfeng.iadmin.common.util.tree.v3;

import java.util.ArrayList;
import java.util.List;

public class TreeUtil {
    /**
     * 列表转换为树
     *
     * @param nodeList
     * @return
     */
    public static <T extends TreeNode<T>> List<T> listToTree(List<T> nodeList) {
        List<T> tree = new ArrayList<T>();
        for (T node : nodeList) {
            if (node.isTrunk()) {
                tree.add(findChildren(node, nodeList));
            }
        }
        return tree;
    }

    /**
     * 递归查找子节点
     *
     * @param nodeList
     * @return
     */
    public static <T extends TreeNode<T>> T findChildren(T node, List<T> nodeList) {
        for (T it : nodeList) {
            if (node.isParentOf(it)) {
                if (node.getNodes() == null) {
                    node.setNodes(new ArrayList<T>());
                }
                node.getNodes().add(findChildren(it, nodeList));
            }
        }
        return node;
    }

}
