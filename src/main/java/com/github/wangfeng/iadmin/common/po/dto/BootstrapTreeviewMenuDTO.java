package com.github.wangfeng.iadmin.common.po.dto;

import java.util.List;

import com.github.wangfeng.iadmin.common.util.tree.v3.TreeNode;
import lombok.Data;

//text: '我有一个子节点哦', // 显示文本
//        icon: 'glyphicon glyphicon-stop', // 默认状态图标，默认是 glyphicon，注意不要使用 bootstrap 4
//        selectedIcon: 'glyphicon glyphicon-stop', // 选中状态的图标
//        color: '#000', // 默认状态文本颜色
//        backColor: '#fff', // 默认状态背景色
//        href: '#node-1', // 链接
//        selectable: false, // 是否可选中，比如仅仅根节点设置为不可选中
//        state: { // 初始化的状态（支持 4 种）
//        checked: true, // 是否可勾选
//        disabled: false, // 是否可用
//        expanded: true, // 是否可折叠
//        selected: false // 是否可选中
//        },
//        tags: ['available'], // 节点右侧徽章
//        nodes: [ // 子节点
//        { text: '没错，正是在下' }
//        ]

/**
 * 用来构造bootstrap treeview的菜单展示
 */
@Data
public class BootstrapTreeviewMenuDTO extends TreeNode {

    private String id;
    private String parentId;
    private String name;
    private String text;
    private String icon;
    private String selectedIcon;
    private String color;
    private String backColor;
    private String href;
    private Boolean selectable;
    private State state;

    private List<String> tags;

    private List nodes;

    @Data
    public static class State {

        private Boolean checked;
        private Boolean disabled;
        private Boolean expanded;
        private Boolean selected;
    }


}
