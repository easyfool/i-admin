package com.github.wangfeng.iadmin.common.util.tree;

import com.alibaba.fastjson.JSON;
import com.github.wangfeng.iadmin.common.po.dto.BootstrapTreeviewMenuDTO;

import java.util.List;

import com.github.wangfeng.iadmin.common.util.tree.v2.TreeBuilder1;
import org.junit.Test;

public class TreeBuilderTest {

    @Test
    public void test() {
        String array = "[\n"
                + "    {\"id\":\"1\",\"pid\":\"-1\",\"name\":\"商品目录\",\"text\":\"商品目录\"},\n"
                + "    {\"id\":\"11\",\"pid\":\"1\",\"name\":\"日用品\"},\n"
                + "    {\"id\":\"12\",\"pid\":\"1\",\"name\":\"食品\"},\n"
                + "    {\"id\":\"111\",\"pid\":\"11\",\"name\":\"洗发水\"},\n"
                + "    {\"id\":\"1111\",\"pid\":\"111\",\"name\":\"霸王\"}\n"
                + "]";
        List<TreeBuilder1.Node> nodeList = JSON.parseArray(array, TreeBuilder1.Node.class);

        TreeBuilder1 treeBuilder = new TreeBuilder1();
        //treeBuilder.nodes = nodeList;

        String s = treeBuilder.buildTree(nodeList);
        System.out.println(s);


    }

}