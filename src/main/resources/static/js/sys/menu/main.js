/***
 *
 * 菜单管理js
 */

//测试数据
// var data = JSON.parse(
//     '[{"id":1,"pid":0,"status":1,"name":"用户管理","permissionValue":"open:user:manage"},' +
//     '{"id":2,"pid":0,"status":1,"name":"系统管理","permissionValue":"open:system:manage"},' +
//     '{"id":3,"pid":1,"status":1,"name":"新增用户","permissionValue":"open:user:add"},' +
//     '{"id":4,"pid":1,"status":1,"name":"修改用户","permissionValue":"open:user:edit"},' +
//     '{"id":5,"pid":1,"status":0,"name":"删除用户","permissionValue":"open:user:del"},' +
//     '{"id":6,"pid":2,"status":1,"name":"系统配置管理","permissionValue":"open:systemconfig:manage"},' +
//     '{"id":7,"pid":6,"status":1,"name":"新增配置","permissionValue":"open:systemconfig:add"},' +
//     '{"id":8,"pid":6,"status":1,"name":"修改配置","permissionValue":"open:systemconfig:edit"},' +
//     '{"id":9,"pid":6,"status":0,"name":"删除配置","permissionValue":"open:systemconfig:del"},' +
//     '{"id":10,"pid":2,"status":1,"name":"系统日志管理","permissionValue":"open:log:manage"},' +
//     '{"id":11,"pid":10,"status":1,"name":"新增日志","permissionValue":"open:log:add"},' +
//     '{"id":12,"pid":10,"status":1,"name":"修改日志","permissionValue":"open:log:edit"},' +
//     '{"id":13,"pid":10,"status":0,"name":"删除日志","permissionValue":"open:log:del"}]');


$(function () {

    //初始化菜单treegrid
    menuTreegridInit();

    // 新增菜单modal框保存按钮点击
    $("#btn_submit_modal_add_menu").click(function () {
        var menuJsonObj = $("#form_add_menu_detail").serializeFormJSON();
        console.log("保存按钮数据：" + JSON.stringify(menuJsonObj));
        addMenuData(menuJsonObj);
    });

    $("#btn_submit_modal_update_menu").click(function () {
        var menuJsonObj = $("#form_update_menu_detail").serializeFormJSON();
        console.log("更新数据：" + JSON.stringify(menuJsonObj));
        updateMenuData(menuJsonObj);
    });
});

/**
 * 新增菜单
 * @param menu
 */
function addMenuData(menu) {
    $.ajax({
        type: "post",
        url: "/sys/admin/menu/add",
        data: JSON.stringify(menu),
        contentType: "application/json",
        success: function (response) {
            console.log("menu 新增成功." + JSON.stringify(response));
            $("#modal_add_menu").modal("hide");
            //TODO 查到该节点childrean的最后一个后面，目前查到该节点后面
            //TODO 直接插入在treegrid上不能实现，因为要构造树
            // var insertIndex = getInsertIndex(menu.parentId);
            // $("#table_menu_list").bootstrapTable('insertRow', {index: 2, row: {"id":10,"pid":3,"status":1,"name":"系统管理","permissionValue":"open:system:manage"}});
            $("#table_menu_list").bootstrapTable('refresh');
        }
    });
}



/**
 * 保存按钮数据
 * @param menu
 */
function updateMenuData(menu) {
    $.ajax({
        type: "post",
        url: "/sys/admin/menu/update",
        data: JSON.stringify(menu),
        contentType: "application/json",
        success: function (response) {
            console.log("menu 新增成功." + JSON.stringify(response));
            $("#modal_update_menu").modal("hide");
            $("#table_menu_list").bootstrapTable('refresh');
        }
    });
}

/**
 * 格式化操作栏
 * @param value
 * @param row
 * @param index
 * @returns {string}
 */
function operateFormatter(value, row, index) {


    var addOperation = '<button type="button" class="RoleOfadd btn-small  btn-primary" style="margin-right:15px;"><i class="fa fa-plus-square-o" ></i>&nbsp;新增</button>';
    var updateOperation = '<button type="button" class="RoleOfedit btn-small   btn-warning" style="margin-right:15px;"><i class="fa fa-pencil-square-o" ></i>&nbsp;修改</button>';
    var removeOperation = '<button type="button" class="RoleOfdelete btn-small   btn-danger" style="margin-right:15px;"><i class="fa fa-trash-o" ></i>&nbsp;删除</button>';
    var operations = [addOperation, updateOperation];
    if(row.level!==1){
        operations.push(removeOperation);
    }
    return operations.join('');




}

/**
 * 格式化菜单类型
 * @param value
 * @param row
 * @param index
 * @returns {string}
 */
function typeFormatter(value, row, index) {
    if (value === 'menu') {
        return '菜单';
    }
    if (value === 'button') {
        return '按钮';
    }
    if (value === 'api') {
        return '接口';
    }
    return '-';
}


/**
 * 初始化操作按钮的方法
 */
window.operateEvents = {
    'click .RoleOfadd': function (e, value, row, index) {
        add(row.id);
    },
    'click .RoleOfdelete': function (e, value, row, index) {
        del(row.id);
    },
    'click .RoleOfedit': function (e, value, row, index) {
        console.log("row:" + row.name);
        update(row);
    }
};

/**
 * 选中父项时，同时选中子项
 * @param datas 所有的数据
 * @param row 当前数据
 * @param id id 字段名
 * @param pid 父id字段名
 */
function selectChilds(datas, row, id, pid, checked) {
    for (var i in datas) {
        if (datas[i][pid] == row[id]) {
            datas[i].check = checked;
            selectChilds(datas, datas[i], id, pid, checked);
        }
        ;
    }
}

function selectParentChecked(datas, row, id, pid) {
    for (var i in datas) {
        if (datas[i][id] == row[pid]) {
            datas[i].check = true;
            selectParentChecked(datas, datas[i], id, pid);
        }
        ;
    }
}

function test() {
    var $table = $('#table_menu_list');
    var selRows = $table.bootstrapTable("getSelections");
    if (selRows.length == 0) {
        alert("请至少选择一行");
        return;
    }

    var postData = "";
    $.each(selRows, function (i) {
        postData += this.id;
        if (i < selRows.length - 1) {
            postData += "， ";
        }
    });
    alert("你选中行的 id 为：" + postData);

}

function add(id) {
    $("#txt_add_parent_menu_id").val(id);
    $("#modal_add_menu").modal("show");
}

function del(id) {
    // alert("del 方法 , id = " + id);
    $.ajax({
        type: "GET",
        url: "/sys/admin/menu/delete/" + id,
        success: function (response) {
            console.log("menu 删除成功." + JSON.stringify(response));
            // $("#table_menu_list").bootstrapTable('refresh');
            $('#table_menu_list').bootstrapTable('remove', {
                field: "id",   //此处的 “id”对应的是字段名
                values: [parseInt(id)]
            });
        }
    });

}

function update(row) {
    console.log(row.name);
    $("#txt_update_menu_id").val(row.id);
    $("#txt_update_parent_menu_id").val(row.parentId);
    $("#txt_update_menu_name").val(row.name);
    $("#txt_update_menu_url").val(row.url);
    $("#txt_update_icon").val(row.icon);
    $("#txt_update_permission").val(row.permission);
    // $("#form_update_menu_detail .modal-title").html("更新菜单");
    $("#modal_update_menu").modal("show");
}

function menuTreegridInit(){
    var $table = $('#table_menu_list');
    $table.bootstrapTable('destroy');
    $table.bootstrapTable({
        url: "/sys/admin/menu/listMenus",
        idField: 'id',
        uniqueId:"id",
        showRefresh: true,
        showToggle: true,
        locale: "zh-CN",
        striped: true,
        queryParamsType:"limit",// offset
        pagination: true,
        search:true,
        pageSize: "15",
        columns: [
            {
                field: 'check', checkbox: true, formatter: function (value, row, index) {
                    if (row.check == true) {
                        // console.log(row.serverName);
                        //设置选中
                        return {checked: true};
                    }
                }
            },
            {field: 'id', title: '主键',hidden:true},
            {field: 'name', title: '名称'},
            {field: 'url', title: '链接(Href)'},
            {field: 'level', title: '层级'},
            {field: 'id', title: '编号', sortable: true, align: 'center'},
            {field: 'parentId', title: '上级菜单'},
            {field: 'status', title: '状态', sortable: true, align: 'center', formatter: 'statusFormatter'},
            {field: 'permission', title: '权限值'},
            {
                field: 'operate',
                title: '操作',
                align: 'center',
                events: operateEvents,
                formatter: 'operateFormatter'
            },
        ],

       //bootstrap-table-treegrid.js 插件配置 start
        // //在哪一列展开树形
        treeShowField: 'name',
        // //指定父id列
        parentIdField: 'parentId',
        onResetView: function (data) {
            $table.treegrid({
                initialState: 'collapsed',// 所有节点都折叠
                // initialState: 'expanded',// 所有节点都展开，默认展开
                treeColumn: 2,
                // expanderExpandedClass: 'glyphicon glyphicon-minus',  //图标样式
                // expanderCollapsedClass: 'glyphicon glyphicon-plus',
                onChange: function () {
                    $table.bootstrapTable('resetWidth');
                }
            });
            //只展开树形的第一级节点
            $table.treegrid('getRootNodes').treegrid('expand');

        },
        onCheck: function (row) {
            var datas = $table.bootstrapTable('getData');
            // 勾选子类
            selectChilds(datas, row, "id", "parentId", true);

            // 勾选父类
            selectParentChecked(datas, row, "id", "parentId")

            // 刷新数据
            $table.bootstrapTable('load', datas);
        },

        onUncheck: function (row) {
            var datas = $table.bootstrapTable('getData');
            selectChilds(datas, row, "id", "parentId", false);
            $table.bootstrapTable('load', datas);
        }
    });
}