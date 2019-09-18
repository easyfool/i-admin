/**
 * 角色管理主页面js
 */
$(document).ready(function () {
  //初始化角色信息分页列表bootstraptable对象
  initAdminSysRoleTable();

  //点击查询根据查询条件按钮查询角色列表信息
  $("#btn_query").click(function(){
    $("#table_admin_sys_role_list").bootstrapTable('refresh');
  });

  // 新增角色modal点击保存按钮保存角色信息
  $("#btn_submit_modal_add_role").click(function () {
    var roleJsonObj = $("#form_add_role_detail").serializeFormJSON();
    console.log("保存数据：" + JSON.stringify(roleJsonObj));
    addRoleData(roleJsonObj);
  });

  // 更新角色modal点击保存按钮保存角色信息
  $("#btn_submit_modal_update_role").click(function () {
    var roleJsonObj = $("#form_update_role_detail").serializeFormJSON();
    console.log("更新数据：" + JSON.stringify(roleJsonObj));
    updateRoleData(roleJsonObj);
  });

  //点击新增角色按钮新增角色
  $("#btn_add_role").click(function(){
    $("#modal_add_role").modal("show");

  });
});



/**
 * 初始换角色分页查询列表bootstrap table 对象
 */
function initAdminSysRoleTable() {
  $('#table_admin_sys_role_list').bootstrapTable({
    url: '/sys/admin/role/listRoles',
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
    }, {
      field: 'roleName',
      title: '角色名称'
    },
      {
        field: 'roleCode',
        title: '角色编号',
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
      return response.content;//后台封装
    }
  });
}



/**
 * bootstrap table 查询参数与自定义查询参数封装，对应bootstrap table 初始化参数 queryParams
 * 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
 * @param params
 * @returns {jQuery|{}}
 */
function queryParams(params) {
  var $searchForm = $("#form_search").serializeFormJSON();//自定义查询参数序列化
  //可根据不同的paramsType的设置取offset pageSize等不同的参数
  $searchForm.pageSize = params.pageSize;
  $searchForm.pageNumber = params.pageNumber;
  return $searchForm;
}

/**
 * 操作栏格式化
 * @param value
 * @param row
 * @param index
 * @returns {string|null}
 */
function operateFormatter(value, row, index) {
  //已删除状态无操作
  if(row.status===1){
    return null;
  }
  return [
    '<button type="button" class="RoleOfedit btn-small   btn-warning" style="margin-right:15px;"><i class="fa fa-pencil-square-o" ></i>&nbsp;修改</button>',
    '<button type="button" class="RoleOfdelete btn-small  btn-danger" style="margin-right:15px;"><i class="fa fa-trash-o" ></i>&nbsp;删除</button>',
    '<button type="button" class="RoleOfAddUser btn-small  btn-primary" style="margin-right:15px;"><i class="fa fa-group" ></i>&nbsp;分配用户</button>',
  ].join('');

}

/**
 * 给角色添加用户
 * */
function addUsersToRole(roleId){
  $.cookie("admin.sys.role.add.user.role.id",roleId);//将该行角色id写入cookie，跳转到角色用户分配页面时进行获取
  //fixme 新打开tab,此处的tab id不能写死，因为菜单配置会发生变化，当后台url发生变化时，需要修改url
  window.parent.addTabs({
    // id: '155555',//注意：此处不能固定写id，会发生变化
    text: '角色分配用户',
    title: '角色分配用户',
    close: true,
    url: '/sys/admin/role/addUsers',
    targetType: "ajax-tab",
  })
}

/**
 * 操作事件绑定
 * @type {{"click .RoleOfAddUser": Window.operateEvents.click .RoleOfAddUser, "click .RoleOfdelete": Window.operateEvents.click .RoleOfdelete, "click .RoleOfedit": Window.operateEvents.click .RoleOfedit}}
 */
window.operateEvents = {
  'click .RoleOfAddUser': function (e, value, row, index) {
    addUsersToRole(row.id);
  },
  'click .RoleOfdelete': function (e, value, row, index) {
    Ewin.confirm({ message: "确认要删除选择的数据吗？" }).on(function (e) {
      if (!e) {
        //点击取消按钮
      }else{
        //点击确定按钮
        del(row.id);
      }
    });

  },
  'click .RoleOfedit': function (e, value, row, index) {
    update(row);
  }
};

/**
 * 删除
 * @param id
 */
function del(id) {
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

/**
 * 更新
 * @param row
 */
function update(row) {
  $("#txt_role_id").val(row.id);
  $("#txt_update_role_name").val(row.roleName);
  $("#txt_update_role_code").val(row.roleCode);
  $("#txt_update_remark").val(row.remark);
  $("#modal_update_role").modal("show");
}


/**
 * 新增角色
 * @param user
 */
function addRoleData(role) {
  $.ajax({
    type: "post",
    url: "/sys/admin/role/add",
    data: JSON.stringify(role),
    contentType: "application/json",
    success: function (response) {
      console.log("新增成功." + JSON.stringify(response));
      $("#modal_add_role").modal("hide");
      //TODO 查到该节点childrean的最后一个后面，目前查到该节点后面
      //TODO 直接插入在treegrid上不能实现，因为要构造树
      // var insertIndex = getInsertIndex(menu.parentId);
      // $("#table_menu_list").bootstrapTable('insertRow', {index: 2, row: {"id":10,"pid":3,"status":1,"name":"系统管理","permissionValue":"open:system:manage"}});
      $("#table_admin_sys_role_list").bootstrapTable('refresh');
    }
  });
}

/**
 * 更新角色信息
 * @param menu
 */
function updateRoleData(role) {
  $.ajax({
    type: "post",
    url: "/sys/admin/role/update",
    data: JSON.stringify(role),
    contentType: "application/json",
    success: function (response) {
      console.log("新增成功." + JSON.stringify(response));
      $("#modal_update_role").modal("hide");
      $("#table_admin_sys_role_list").bootstrapTable('refresh');
    }
  });
}