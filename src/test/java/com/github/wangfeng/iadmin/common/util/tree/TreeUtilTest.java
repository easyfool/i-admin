package com.github.wangfeng.iadmin.common.util.tree;

import com.alibaba.fastjson.JSON;
import com.github.wangfeng.iadmin.common.util.tree.v3.TreeNode;
import com.github.wangfeng.iadmin.common.util.tree.v3.TreeUtil;

import java.util.ArrayList;
import java.util.List;

public class TreeUtilTest {
    static class Menu extends TreeNode<Menu> {
        String id;
        String parentId;
        String name;
        List<Menu> nodes;

        public Menu(String id, String name, String parentId) {
            this.id = id;
            this.name = name;
            this.parentId = parentId;
        }

        @Override
        public String getParentId() {
            return parentId;
        }

        @Override
        public void setParentId(String parentId) {
            this.parentId = parentId;
        }

        @Override
        public String getId() {
            return id;
        }

        @Override
        public void setId(String id) {
            this.id = id;
        }

        @Override
        public List<Menu> getNodes() {
            return nodes;
        }

        public void setNodes(List<Menu> nodes) {
            this.nodes = nodes;
        }
    }

    /**
     * 测试用例
     */
    static void testCode() {
        Menu treeNode1 = new Menu("1", "广州", null);
        Menu treeNode2 = new Menu("2", "深圳", null);

        Menu treeNode3 = new Menu("3", "天河区", "1");
        Menu treeNode4 = new Menu("4", "越秀区", "1");
        Menu treeNode5 = new Menu("5", "黄埔区", "1");
        Menu treeNode6 = new Menu("6", "石牌", "3");
        Menu treeNode7 = new Menu("7", "百脑汇", "6");

        Menu treeNode8 = new Menu("8", "南山区", "2");
        Menu treeNode9 = new Menu("9", "宝安区", "2");
        Menu treeNode10 = new Menu("10", "科技园", "8");

        List<Menu> list = new ArrayList<Menu>();
        list.add(treeNode1);
        list.add(treeNode2);
        list.add(treeNode3);
        list.add(treeNode4);
        list.add(treeNode5);
        list.add(treeNode6);
        list.add(treeNode7);
        list.add(treeNode8);
        list.add(treeNode9);
        list.add(treeNode10);

        List<Menu> trees_ = TreeUtil.listToTree(list);
        System.out.println(JSON.toJSONString(trees_));

    }

    public static void main(String[] args) {
        testCode();
    }

}