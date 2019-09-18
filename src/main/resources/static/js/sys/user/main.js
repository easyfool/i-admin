/**
 * 用户管理界面js
 */

$(document).ready(function () {
    //初始化用户bootstraptable分页列表
    initAdminSysUserTable();
    $("#btn_query").click(function(){
        $("#table_admin_sys_user_list").bootstrapTable('refresh');
    });
    // 新增菜单modal框保存按钮点击
    $("#btn_submit_modal_add_user").click(function () {
        var menuJsonObj = $("#form_add_user_detail").serializeFormJSON();
        console.log("保存数据：" + JSON.stringify(menuJsonObj));
        addUserData(menuJsonObj);
    });

    $("#btn_submit_modal_update_user").click(function () {
        var menuJsonObj = $("#form_update_user_detail").serializeFormJSON();
        console.log("更新数据：" + JSON.stringify(menuJsonObj));
        updateUserData(menuJsonObj);
    });
    $("#btn_add_user").click(function(){
        $("#modal_add_user").modal("show");

    });
});

/**
 * 新增用户
 * @param user
 */
function addUserData(user) {
    $.ajax({
        type: "post",
        url: "/sys/admin/user/add",
        data: JSON.stringify(user),
        contentType: "application/json",
        success: function (response) {
            console.log("新增成功." + JSON.stringify(response));
            $("#modal_add_user").modal("hide");
            //TODO 查到该节点childrean的最后一个后面，目前查到该节点后面
            //TODO 直接插入在treegrid上不能实现，因为要构造树
            // var insertIndex = getInsertIndex(menu.parentId);
            // $("#table_menu_list").bootstrapTable('insertRow', {index: 2, row: {"id":10,"pid":3,"status":1,"name":"系统管理","permissionValue":"open:system:manage"}});
            $("#table_admin_sys_user_list").bootstrapTable('refresh');
        }
    });
}

/**
 * 保存
 * @param menu
 */
function updateUserData(user) {
    $.ajax({
        type: "post",
        url: "/sys/admin/user/update",
        data: JSON.stringify(user),
        contentType: "application/json",
        // contentType: "application/json",
        // dataType: "json",
        success: function (response) {
            console.log("新增成功." + JSON.stringify(response));
            $("#modal_update_user").modal("hide");
            $("#table_admin_sys_user_list").bootstrapTable('refresh');
        }
    });
}

/**
 * 初始化用户分页列表bootstraptable对象
 */
function initAdminSysUserTable() {
    $('#table_admin_sys_user_list').bootstrapTable({
        url: '/sys/admin/user/listUsers',
        method: 'post',
        queryParams: 'queryParams',
        queryParamsType: 'undefined',//如果queryParamsType = 'limit'，params对象包含：limit，offset，search，sort，order。否则，它包含：pageSize，pageNumber，searchText，sortName，sortOrder。
        toolbar: "#toolbar",
        locale: "zh-CN",
        sidePagination: "true",
        showRefresh: true,                  //是否显示刷新按钮
        pageList: [5, 10, 20, 50, 100, 200, 500,'All'], // 如果设置了分页，设置可供选择的页面数据条数。设置为All 则显示所有记录。
        pageSize: 10, // 页面数据条数
        pageNumber: 1, // 初始化加载第一页，默认第一页
        sidePagination: 'server', // 设置为服务器端分页     客户端：client
        trimOnSearch: true,//设置为 true 将自动去掉搜索字符的前后空格
        paginationDetailHAlign: 'left',//指定 分页详细信息 在水平方向的位置。'left' 或 'right'。
        search: false,
        singleSelect: false,//设置True 将禁止多选
        striped: true, // 是否显示行间隔色
        uniqueId: "ID",
        pageSize: "15",
        pagination: true, // 是否分页
        sortable: true, // 是否启用排序
        columns: [{
            checkbox: true, // 显示一个勾选框
            align: 'center' // 居中显示
        }, {
            field: 'id',
            visible: false,
            title: 'ID'
        },
            {
                field: 'loginName',
                title: '用户名'
            },
            {
                field: 'realName',
                title: '真实姓名',
            },
            {
                field: 'nickName',
                title: '昵称',
            },
            {
                field: 'mobile',
                title: '手机号码',
                visible: false
            },
            {
                field: 'sex',
                title: '性别',
                formatter: 'sexFormatter'
            },
            {
                field: 'status',
                title: '状态',
                formatter: 'statusFormatter'
            },
            {
                field: 'operate',
                title: '操作',
                align: 'center',
                events: operateEvents,
                valign: 'middle',
                formatter: 'operateFormatter',
            },

        ],
        responseHandler: function (response) {
            return response.content;
        }
    });
}

/**
 * bootstrap table 查询参数
 * @param params
 * @returns {jQuery|{}}
 */
function queryParams(params) { // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
    var $searchForm = $("#form_search").serializeFormJSON();
    $searchForm.pageSize = params.pageSize;
    $searchForm.pageNumber = params.pageNumber;
    return $searchForm;
}

/**
 * 性别format
 * @param value
 * @param row
 * @param index
 * @returns {string|null}
 */
function sexFormatter(value, row, index) {

    if (value === 0) {
        return '女';
    } else if (value === 1) {
        return '男';
    }
    return null;

}


// 格式化按钮
function operateFormatter(value, row, index) {
    return [
        '<button type="button" class="RoleOfedit btn-small   btn-warning" style="margin-right:15px;"><i class="fa fa-pencil-square-o" ></i>&nbsp;修改</button>',
        '<button type="button" class="RoleOfdelete btn-small  btn-danger" style="margin-right:15px;"><i class="fa fa-trash-o" ></i>&nbsp;删除</button>',
        '<button type="button" class="RoleOfdelete btn-small  btn-primary" style="margin-right:15px;"><i class="fa fa-group" ></i>&nbsp;分配角色</button>',
        '<button type="button" class="RoleOfdelete btn-small  btn-danger" style="margin-right:15px;"><i class="fa fa-key" ></i>&nbsp;重置密码</button>'
    ].join('');

}

/**
 * 初始化按钮操作方法
 * @type {{"click .RoleOfdelete": Window.operateEvents.click .RoleOfdelete, "click .RoleOfedit": Window.operateEvents.click .RoleOfedit}}
 */
window.operateEvents = {
    'click .RoleOfdelete': function (e, value, row, index) {
        Ewin.confirm({ message: "确认要删除选择的数据吗？" }).on(function (e) {
            if (!e) {
                //点击取消按钮
                console.log("cancel");
            }else{
                //点击确定按钮
                console.log("confirm");
                del(row.id);
            }
        });

    },
    'click .RoleOfedit': function (e, value, row, index) {
        console.log("row:" + row.name);
        update(row);
    }
};

/**
 * 删除
 * @param id
 */
function del(id) {
    // alert("del 方法 , id = " + id);
    $.ajax({
        type: "POST",
        url: "/sys/admin/user/remove/" + id,
        success: function (response) {
            console.log("删除成功." + JSON.stringify(response));
            // $("#table_menu_list").bootstrapTable('refresh');
            $('#table_admin_sys_user_list').bootstrapTable('remove', {
                field: "id",   //此处的 “id”对应的是字段名
                values: [parseInt(id)]
            });
            $('#table_admin_sys_user_list').bootstrapTable('refresh');
        }

    });

}

/**
 * 更新
 * @param row
 */
function update(row) {
    console.log(row.name);
    $("#txt_update_user_id").val(row.id);
    $("#txt_update_login_name").val(row.loginName);
    $("#txt_update_real_name").val(row.realName);
    $("#txt_update_nick_name").val(row.nickName);
    $("#txt_update_email").val(row.email);
    $("#txt_update_sex").val(row.sex);
    $("#txt_update_mobile").val(row.mobile);
    $("#modal_update_user").modal("show");
}