/**
 * 用户管理界面js
 */

var overAllUserIds = new Set();                // 全局保存选中行的对象
$(document).ready(function () {
    //初始化用户bootstraptable分页列表
    initAdminSysUserTable();
    //新增用户form 校验
    initValidateAddForm();
    $("#btn_query").click(function(){
        $("#table_admin_sys_user_list").bootstrapTable('refresh');
    });
    // 新增菜单modal框保存按钮点击
    $("#btn_submit_modal_add_user").click(function () {
        var menuJsonObj = $("#form_add_user_detail").serializeFormJSON();
        console.log("保存数据：" + JSON.stringify(menuJsonObj));
        $('#form_add_user_detail').data("bootstrapValidator").validate();
        var isValid = $('#form_add_user_detail').data("bootstrapValidator").isValid();
        if(isValid){ addUserData(menuJsonObj);}

    });

    $("#btn_submit_modal_update_user").click(function () {
        var menuJsonObj = $("#form_update_user_detail").serializeFormJSON();
        console.log("更新数据：" + JSON.stringify(menuJsonObj));
        updateUserData(menuJsonObj);
    });
    $("#btn_add_user").click(function(){
        $("#modal_add_user").modal("show");

    });

    //新增user modal show 方法触发后
    $("#modal_add_user").on('show.bs.modal',function(){
            //动态加载性别 下拉框菜单
        loadSexSelectOption();
    });

    //用户详情modal触发后
    $("#modal_view_user").on('show.bs.modal',function(){
        //加载详情field
        // fullFillViewFormContent();
    });

$("#checkAllSelected").click(function(){

    console.log(overAllUserIds);

    console.log("dangqianye:"+$('#table_admin_sys_user_list').bootstrapTable('getOptions').pageNumber);
    console.log("dangqianye:"+JSON.stringify());
});

//删除选中用户
$("#btn_delete_user").click(function(){
    deleteAllSelectedUsers();
});
//锁定选中用户
    $("#btn_lock_user").click(function(){
        lockAllSelectedUsers();
    });

    //解锁选中用户
    $("#btn_unlock_user").click(function(){
        unlockAllSelectedUsers();
    });


});

//删除选中用户
function deleteAllSelectedUsers(){
    $.ajax({
        type: 'POST',
        url: '/sys/admin/user/deleteSelected',
        contentType: 'application/json',
        data: JSON.stringify({"ids":Array.from(overAllUserIds)}),
        success: function (response) {
            $("#table_admin_sys_user_list").bootstrapTable('refresh');
        }
    });
}

//锁定选中用户
function lockAllSelectedUsers(){
    $.ajax({
        type: 'POST',
        url: '/sys/admin/user/lockSelected',
        contentType: 'application/json',
        data: JSON.stringify({"ids":Array.from(overAllUserIds)}),
        success: function (response) {
            $("#table_admin_sys_user_list").bootstrapTable('refresh');
        }
    });
}

//解锁选中用户
function unlockAllSelectedUsers(){
    $.ajax({
        type: 'POST',
        url: '/sys/admin/user/unlockSelected',
        contentType: 'application/json',
        data: JSON.stringify({"ids":Array.from(overAllUserIds)}),
        success: function (response) {
            $("#table_admin_sys_user_list").bootstrapTable('refresh');
        }
    });
}

/**
 * 新增表单初始化bootstrap validate校验
 */
function initValidateAddForm(){
    $('#form_add_user_detail').bootstrapValidator({
        // 默认的提示消息
        message: 'This value is not valid',
        // 表单框里右侧的icon
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // submitHandler: function (validator, form, submitButton) {
            // 表单提交成功时会调用此方法
            // validator: 表单验证实例对象
            // form  jq对象  指定表单对象
            // submitButton  jq对象  指定提交按钮的对象
        // },
        fields: {
            loginName: {
                message: '用户名验证失败',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {  //长度限制
                        min: 2,
                        max: 20,
                        message: '用户名长度必须在2到20位之间'
                    },
                    // regexp: { //正则表达式
                    //     regexp: /^[a-zA-Z0-9_]+$/,
                    //     message: '用户名只能包含大写、小写、数字和下划线'
                    // },
                    // different: {  //比较
                    //     field: 'username', //需要进行比较的input name值
                    //     message: '密码不能与用户名相同'
                    // },
                    // identical: {  //比较是否相同
                    //     field: 'password',  //需要进行比较的input name值
                    //     message: '两次密码不一致'
                    // },
                    remote: { // ajax校验，获得一个json数据（{'valid': true or false}）
                        url: '/sys/admin/user/isUnique',       //验证地址
                        message: '用户名已存在',   //提示信息
                        type: 'GET'          //请求方式
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: '邮箱地址不能为空'
                    },
                    emailAddress: {
                        message: '邮箱地址格式有误'
                    }
                }
            }
        }
    });
}
/**
 * 动态加载 性别下拉框
 */
function loadSexSelectOption(){
    $.ajax({
        type: 'GET',
        url: '/sys/dict/sex',
        success: function (response) {
            // var data = eval(data);
            var data = response.content;
            $.each(data, function (i) {
                $("<option value='" + data[i].dictCode + "'>" + data[i].dictLabel + "</option>")
                .appendTo(".selectpicker");
            });
            $('#sel_add_sex .selectpicker').selectpicker({
                //我是对所有的selectpicker操作一次性赋值，如果你想单独赋值，好ok，那么就这样赋值：
                //appendTo("#editcolor .selectpicker"),就这样，在你select元素上面罩上一个div，
                //用div的id就可以标记你要操作的selectpicker，也就是你想操作的select元素标签了
                style: 'btn-info',
                size: 8
            })
        }
    });
}

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


function getSelectCheck() {
    return overAllUserIds;
}
function examine(type,datas){            // 操作类型，选中的行
    if(type.indexOf('uncheck')==-1){
        $.each(datas,function(i,v){        // 如果是选中则添加选中行的 id
            overAllUserIds.add(v.id);
        });
    }else{
        console.log("删除选中")
        $.each(datas,function(i,v){
            console.log(datas)
            overAllUserIds.delete(v.id);     // 删除取消选中行的 id
        });
    }
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
        pageSize: "5",
        clickToSelect : true, //是否启用点击选中行
        showToggle : true,
        maintainSelected : true,
        pagination: true, // 是否分页
        sortable: true, // 是否启用排序
        onUncheckAll:function(rows){//由于取不到rows，因此单独处理
            console.log("hjejee");
            var uncheckAllRecords = $('#table_admin_sys_user_list').bootstrapTable('getData');
            $.each(uncheckAllRecords,function(index,item){
                // alert(index+"..."+item.id);
                overAllUserIds.delete(item.id);
            });

        },
        columns: [{
            checkbox: true, // 显示一个勾选框
            align: 'center',// 居中显示
            formatter: function (i,row) {            // 每次加载 checkbox 时判断当前 row 的 id 是否已经存在全局 Set() 里
                if($.inArray(row.id,Array.from(overAllUserIds))!=-1){    // 因为 Set是集合,需要先转换成数组
                    return {
                        checked : true               // 存在则选中
                    }
                }
            }
        }, {
            field: 'id',
            visible: false,
            title: 'ID'
        },
            {
                field: 'loginName',
                title: '用户名',
                events: loginNameEvents,
                formatter:'loginNameFormatter'
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
    $('#table_admin_sys_user_list').on('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table check-some.bs.table uncheck-some.bs.table',function(e,rows){
        var datas = $.isArray(rows) ? rows : [rows];        // 点击时获取选中的行或取消选中的行
        console.log(JSON.stringify(datas));
        examine(e.type,datas);                                 // 保存到全局 Set() 里
    });

    // $('#table_admin_sys_user_list').onUncheckAll()



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
    if (value == 0) {
        return '女';
    } else if (value == 1) {
        return '男';
    }
    return null;

}


// 格式化按钮
function operateFormatter(value, row, index) {
    //已删除状态无操作
    if(row.status===1){
        return null;
    }
    return [
        '<button type="button" class="RoleOfedit btn-small   btn-warning" style="margin-right:15px;"><i class="fa fa-pencil-square-o" ></i>&nbsp;修改</button>',
        '<button type="button" class="RoleOfdelete btn-small  btn-danger" style="margin-right:15px;"><i class="fa fa-remove" ></i>&nbsp;删除</button>',
        '<button type="button" class="RoleOfdelete btn-small  btn-primary" style="margin-right:15px;"><i class="fa fa-group" ></i>&nbsp;分配角色</button>',
        '<button type="button" class="RoleOfdelete btn-small  btn-danger" style="margin-right:15px;"><i class="fa fa-key" ></i>&nbsp;重置密码</button>'
    ].join('');

}

/**
 *
 */
function  loginNameFormatter(value,row,index){
    return '<a class="RoleOfview" href="javascript:void(0)">'+value+'</a>';
}

window.loginNameEvents ={
    'click .RoleOfview': function(e, value, row, index){
        showDetail(row);
    }
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

/**
 * 显示用户详细信息
 * @param row
 */
function showDetail(row){
    console.log(JSON.stringify(row))
    $("#txt_view_user_id").val(row.id);
    $("#txt_view_login_name").val(row.loginName);
    $("#txt_view_real_name").val(row.realName);
    $("#txt_view_nick_name").val(row.nickName);
    $("#txt_view_email").val(row.email);
    $("#div_view_sex .selectpicker").selectpicker('val',row.sex);
    $("#txt_view_mobile").val(row.mobile);
    $("#form_view_user_detail fieldset").attr("disabled",true)
    $("#modal_view_user").modal("show");

}