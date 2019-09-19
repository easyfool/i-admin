/**
 * 角色分配用户页面js
 *
 */
var overAllUserIds = new Set();                // 选择要添加的用户
var overAllRoleUserRelIds = new Set();                // 选择要进行角色操作(删除)的记录
$(document).ready(function () {
  overAllUserIds = new Set();
  overAllRoleUserRelIds = new Set();
  //初始化角色用户列表，现实拥有该角色的用户列表
  initRoleUsersTable();
  console.log("获取cookie中角色roleId（该roleId由角色列表页点击分配用户按钮时set到cookie[admin.sys.role.add.user.role.id]）:"+$.cookie("admin.sys.role.add.user.role.id"));
  var  roleId = $.cookie("admin.sys.role.add.user.role.id");
  //根据roleId+查询条件查询并展现列表
  $("#btn_query").click(function(){
    $("#table_admin_sys_role_list").bootstrapTable('refresh');
  });

  //新增用户modal 点击保存按钮
  $("#btn_submit_modal_add_user").click(function () {
    addUsersToRole(roleId,overAllUserIds);
    $("#modal_add_user").modal("hide");
    $("#table_user_has_role_list").bootstrapTable('refresh');

  });

  // $("#btn_submit_modal_update_role").click(function () {
  //   var roleJsonObj = $("#form_update_role_detail").serializeFormJSON();
  //   console.log("更新数据：" + JSON.stringify(roleJsonObj));
  //   updateRoleData(roleJsonObj);
  // });

  //点击新增用户按钮弹出用户列表选择modal
  $("#btn_add_user").click(function(){
    initAdminSysUserTable(roleId);
    $("#modal_add_user").modal("show");

  });

  //新增用户modal显示时，显示用户列表供选择
  $("#modal_add_user").on('show.bs.modal',function(){
    $('#table_admin_sys_user_list').bootstrapTable('refresh');
  });

  $("#btn_query_user").click(function(){
    $('#table_admin_sys_user_list').bootstrapTable('refresh');
  });
});

/**
 * 用户列表bootstraptable
 */
function initAdminSysUserTable(roleId) {
  $('#table_admin_sys_user_list').bootstrapTable({
    url: '/sys/admin/user/listUsers/hasNoRole/'+roleId,
    method: 'post',
    queryParams: 'queryUserToAddParams',
    queryParamsType: 'undefined',//如果queryParamsType = 'limit'，params对象包含：limit，offset，search，sort，order。否则，它包含：pageSize，pageNumber，searchText，sortName，sortOrder。
    toolbar: "#toolbar",
    locale: "zh-CN",
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
    pagination: true, // 在表格底部显示分页组件，默认false
    pageSize: "2",//TODO 上线时修改
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
      align: 'center', // 居中显示
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
        field: 'status',
        title: '状态',
        formatter: 'statusFormatter'
      }

    ],
    responseHandler: function (response) {
      return response.content;
    }
  });
  $('#table_admin_sys_user_list').on('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table check-some.bs.table uncheck-some.bs.table',function(e,rows){
    var datas = $.isArray(rows) ? rows : [rows];        // 点击时获取选中的行或取消选中的行
    console.log(JSON.stringify(datas));
    examineUsers(e.type,datas);                                 // 保存到全局 Set() 里
  });
}

function examineUsers(type,datas){            // 操作类型，选中的行
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
 * 新增角色
 * @param user
 */
// function addRoleData(role) {
//   $.ajax({
//     type: "post",
//     url: "/sys/admin/role/add",
//     data: JSON.stringify(role),
//     contentType: "application/json",
//     success: function (response) {
//       console.log("新增成功." + JSON.stringify(response));
//       $("#modal_add_user").modal("hide");
//       //TODO 查到该节点childrean的最后一个后面，目前查到该节点后面
//       //TODO 直接插入在treegrid上不能实现，因为要构造树
//       // var insertIndex = getInsertIndex(menu.parentId);
//       // $("#table_menu_list").bootstrapTable('insertRow', {index: 2, row: {"id":10,"pid":3,"status":1,"name":"系统管理","permissionValue":"open:system:manage"}});
//       $("#table_admin_sys_role_list").bootstrapTable('refresh');
//     }
//   });
// }

/**
 * 保存
 * @param menu
 */
// function updateRoleData(role) {
//   $.ajax({
//     type: "post",
//     url: "/sys/admin/role/update",
//     data: JSON.stringify(role),
//     contentType: "application/json",
//     // contentType: "application/json",
//     // dataType: "json",
//     success: function (response) {
//       console.log("新增成功." + JSON.stringify(response));
//       $("#modal_update_role").modal("hide");
//       $("#table_admin_sys_role_list").bootstrapTable('refresh');
//     }
//   });
// }

/**
 * 初始化bootstraptable
 * 展示拥有该角色的用户列表
 */
function initRoleUsersTable() {
  $('#table_user_has_role_list').bootstrapTable({
    url: '/sys/admin/userRoleRel/listRoleOwners',
    method: 'post',
    queryParams: 'queryParams',
    queryParamsType: 'undefined',//如果queryParamsType = 'limit'，params对象包含：limit，offset，search，sort，order。否则，它包含：pageSize，pageNumber，searchText，sortName，sortOrder。
    toolbar: "#toolbar",
    locale: "zh-CN",
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
    pagination: true, // 在表格底部显示分页组件，默认false
    pageSize: "2",
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
 * 拥有角色的用户列表，根据角色id和查询框条件进行查询
 * @param params
 * @returns {jQuery|{}}
 */
function queryParams(params) {
  var $searchForm = $("#form_search").serializeFormJSON();
  $searchForm.pageSize = params.pageSize;
  $searchForm.pageNumber = params.pageNumber;
  console.log("获取cookie中角色roleId（该roleId由角色列表页点击分配用户按钮时set到cookie[admin.sys.role.add.user.role.id]）:"+$.cookie("admin.sys.role.add.user.role.id"));
  $searchForm.roleId =  $.cookie("admin.sys.role.add.user.role.id");
  return $searchForm;

}

/**
 * 查询待添加的用户列表
 * @param params
 */
function queryUserToAddParams(params){
  var $searchForm = $("#form_search_user_to_add").serializeFormJSON();
  $searchForm.pageSize = params.pageSize;
  $searchForm.pageNumber = params.pageNumber;
  // console.log("获取cookie中角色roleId（该roleId由角色列表页点击分配用户按钮时set到cookie[admin.sys.role.add.user.role.id]）:"+$.cookie("admin.sys.role.add.user.role.id"));
  // $searchForm.roleId =  $.cookie("admin.sys.role.add.user.role.id");
  return $searchForm;
}


// 格式化按钮
function operateFormatter(value, row, index) {

  // var addOperation = '<button type="button" class="RoleOfadd btn-small  btn-primary" style="margin-right:15px;"><i class="fa fa-plus-square-o" ></i>&nbsp;新增</button>';
  // var updateOperation = '<button type="button" class="RoleOfedit btn-small   btn-warning" style="margin-right:15px;"><i class="fa fa-pencil-square-o" ></i>&nbsp;修改</button>';
  // var removeOperation = '<button type="button" class="RoleOfdelete btn-small   btn-danger" style="margin-right:15px;"><i class="fa fa-trash-o" ></i>&nbsp;删除</button>';
  // var operations = [addOperation, updateOperation];
  // if(row.level!==1){
  //   operations.push(removeOperation);
  // }
  // return operations.join('');
  return [
    '<button type="button" class="RoleOfedit btn-small   btn-warning" style="margin-right:15px;"><i class="fa fa-pencil-square-o" ></i>&nbsp;修改</button>',
    '<button type="button" class="RoleOfdelete btn-small  btn-danger" style="margin-right:15px;"><i class="fa fa-trash-o" ></i>&nbsp;删除</button>',
    '<button type="button" class="RoleOfAddUser btn-small  btn-primary" style="margin-right:15px;"><i class="fa fa-group" ></i>&nbsp;分配用户</button>',
  ].join('');

}

/**
 * 给角色添加用户
 * */
function addUsersToRole(roleId,userIds){
  $.ajax({
    type: "POST",
    url: "/sys/admin/role/"+roleId+"/addUsers",
    data: JSON.stringify({ids:Array.from(userIds)}),
    contentType: "application/json",
    success: function (response) {
      console.log("新增成功." + JSON.stringify(response));
    }
  });
}

//初始化操作按钮的方法
window.operateEvents = {
  // 'click .RoleOfAddUser': function (e, value, row, index) {
  //   addUsersToRole(row.id);
  // },
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

function del(id) {
  // alert("del 方法 , id = " + id);
  $.ajax({
    type: "POST",
    url: "/sys/admin/role/delete/" + id,
    success: function (response) {
      console.log("删除成功." + JSON.stringify(response));
      // $("#table_menu_list").bootstrapTable('refresh');
      $('#table_admin_sys_role_list').bootstrapTable('remove', {
        field: "id",   //此处的 “id”对应的是字段名
        values: [parseInt(id)]
      });
      $('#table_admin_sys_role_list').bootstrapTable('refresh');
    }

  });

}

function update(row) {
  console.log(row.name);
  $("#txt_role_id").val(row.id);
  $("#txt_role_name").val(row.roleName);
  $("#txt_role_code").val(row.roleCode);
  $("#txt_remark").val(row.remark);
  // $("#form_update_menu_detail .modal-title").html("更新菜单");
  $("#modal_update_role").modal("show");
}