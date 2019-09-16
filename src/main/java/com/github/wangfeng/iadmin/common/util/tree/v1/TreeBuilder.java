package com.github.wangfeng.iadmin.common.util.tree.v1;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

import com.alibaba.fastjson.JSON;


public class TreeBuilder {
    @SuppressWarnings("unchecked")
    public List<? extends Node> buildListToTree(List<? extends Node> dirs) {
        List<Node> roots = findRoots(dirs);
        List<Node> notRoots = (List<Node>) CollectionUtils.subtract(dirs, roots);
        for (Node root : roots) {
            root.setChildren(findChildren(root, notRoots));
        }
        return roots;
    }

    private List<Node> findRoots(List<? extends Node> allNodes) {
        List<Node> results = new ArrayList<Node>();
        for (Node node : allNodes) {
            boolean isRoot = true;
            for (Node comparedOne : allNodes) {
                if (StringUtils.isNotBlank(node.getParentId()) && node.getParentId().equals(comparedOne.getId())) {
                    isRoot = false;
                    break;
                }
            }
            if (isRoot) {
                node.setLevel(0);
                results.add(node);
                node.setRootId(node.getId());
            }
        }
        return results;
    }

    @SuppressWarnings("unchecked")
    private List<Node> findChildren(Node root, List<Node> allNodes) {
        List<Node> children = new ArrayList<Node>();

        for (Node comparedOne : allNodes) {
            if (StringUtils.isNotBlank(comparedOne.getParentId()) && comparedOne.getParentId().equals(root.getId())) {
                comparedOne.setParent(root);
                comparedOne.setLevel(root.getLevel() + 1);
                children.add(comparedOne);
            }
        }
        List<Node> notChildren = (List<Node>) CollectionUtils.subtract(allNodes, children);
        for (Node child : children) {
            List<Node> tmpChildren = findChildren(child, notChildren);
            if (tmpChildren == null || tmpChildren.size() < 1) {
                child.setLeaf(true);
            } else {
                child.setLeaf(false);
            }
            child.setChildren(tmpChildren);
        }
        return children;
    }

    private List<Node> getLeafChildren(List<Node> resultList, List<Node> children) {
        for (Node node : children) {
            if (node.isLeaf()) {
                resultList.add(node);
            } else {
                getLeafChildren(resultList, node.getChildren());
            }
        }
        return resultList;
    }

    @SuppressWarnings("unchecked")
    public static void main(String[] args) throws Exception {
        TreeBuilder tb = new TreeBuilder();
        List<Node> allNodes = new ArrayList<Node>();

        allNodes.add(new Dictionary("1", "0", "001", "节点001", 0));
        allNodes.add(new Dictionary("2", "0", "002", "节点002", 0));
        allNodes.add(new Dictionary("3", "0", "003", "节点003", 0));
        allNodes.add(new Dictionary("4", "1", "004", "节点004", 0));
        allNodes.add(new Dictionary("5", "1", "005", "节点005", 0));
        allNodes.add(new Dictionary("6", "1", "006", "节点006", 0));
        allNodes.add(new Dictionary("7", "4", "007", "节点007", 0));
        allNodes.add(new Dictionary("8", "4", "008", "节点008", 0));
        allNodes.add(new Dictionary("9", "5", "009", "节点009", 0));
        allNodes.add(new Dictionary("10", "5", "010", "节点010", 0));
        allNodes.add(new Dictionary("11", "7", "011", "节点011", 0));
        allNodes.add(new Dictionary("12", "7", "012", "节点012", 0));

        // 显示所有节点
        List<Node> roots = (List<Node>) tb.buildListToTree(allNodes);
        System.out.println(JSON.toJSONString(roots));
//        for (Node n : roots) {
//            System.out.println(JSON.toJSONString(n));
//        }

        // 查找所有子节点
//        List<Node> children = tb.findChildren(new Dictionary("1", "0"), allNodes);
//        for (Node n : children) {
//            System.out.println(JSON.toJSONString(n));
//        }
//        // 查找所有叶子节点
//        System.out.println("------------------");
//        List<Node> resultList = tb.getLeafChildren(new ArrayList<Node>(), children);
//        for (Node n : resultList) {
//            System.out.println(JSON.toJSONString(n));
//        }
    }
}