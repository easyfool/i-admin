package com.github.wangfeng.iadmin.common.util.tree;

import static org.junit.Assert.*;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.github.wangfeng.iadmin.common.util.tree.TreeBuilder.Node;
import java.util.List;
import org.junit.Test;

public class TreeBuilderTest {

    @Test
    public void test() {
        String array = "[\n"
                + "    {\"id\":\"1\",\"pid\":\"-1\",\"name\":\"商品目录\"},\n"
                + "    {\"id\":\"11\",\"pid\":\"1\",\"name\":\"日用品\"},\n"
                + "    {\"id\":\"12\",\"pid\":\"1\",\"name\":\"食品\"},\n"
                + "    {\"id\":\"111\",\"pid\":\"11\",\"name\":\"洗发水\"},\n"
                + "    {\"id\":\"1111\",\"pid\":\"111\",\"name\":\"霸王\"}\n"
                + "]";
        List<Node> nodeList = JSON.parseArray(array, Node.class);

        TreeBuilder treeBuilder = new TreeBuilder();
        //treeBuilder.nodes = nodeList;

        String s = treeBuilder.buildTree(nodeList);
        System.out.println(s);


    }

}