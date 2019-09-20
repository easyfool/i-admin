/**
 * 角色管理主页面js
 */
$(document).ready(function () {
  //初始化角色信息分页列表bootstraptable对象
  initAdminSysRoleTable();
  // 新增角色modal验证初始化
  initAddFormValidator();

  //点击查询根据查询条件按钮查询角色列表信息
  $("#btn_query").click(function(){
    $("#table_admin_sys_role_list").bootstrapTable('refresh');
  });

  // 新增角色modal点击保存按钮保存角色信息
  $("#btn_submit_modal_add_role").click(function () {
    var roleJsonObj = $("#form_add_role_detail").serializeFormJSON();
    console.log("保存数据：" + JSON.stringify(roleJsonObj));
    $('#form_add_role_detail').data("bootstrapValidator").validate();
    var isValid = $('#form_add_role_detail').data("bootstrapValidator").isValid();
    if(isValid){addRoleData(roleJsonObj);}

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
  showMenuTree();



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
        title: '角色编码',
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
  console.log("查询参数:"+JSON.stringify($searchForm));
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
    '<button type="button" class="RoleOfAddMenu btn-small  btn-primary" style="margin-right:15px;"><i class="fa fa-book" ></i>&nbsp;菜单(权限)</button>',
  ].join('');

}

/**
 * 给角色添加用户
 * */
function addUsersToRole(roleId){
  $.cookie("admin.sys.role.add.user.role.id",roleId,{ path:'/'});//将该行角色id写入cookie，跳转到角色用户分配页面时进行获取
  //fixme 新打开tab,此处的tab id不能写死，因为菜单配置会发生变化，当后台url发生变化时，需要修改url
  window.parent.addTabs({
    // id: '155555',//注意：此处不能固定写id，会发生变化
    text: '角色分配用户',
    title: '角色分配用户',
    close: true,
    url: '/sys/admin/role/addUsers?roleId='+roleId,
    targetType: "iframe-tab",
  })
  App.fixIframeCotent();
}

/**
 * 操作事件绑定
 * @type {{"click .RoleOfAddUser": Window.operateEvents.click .RoleOfAddUser, "click .RoleOfdelete": Window.operateEvents.click .RoleOfdelete, "click .RoleOfedit": Window.operateEvents.click .RoleOfedit}}
 */
window.operateEvents = {
  'click .RoleOfAddUser': function (e, value, row, index) {
    addUsersToRole(row.id);
  },
  'click .RoleOfAddMenu': function (e, value, row, index) {
    addMenusToRole(row.id);
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
 * 角色权限设置
 * @param roleId
 */
function addMenusToRole(roleId){
  $("txt_menu_modal_role_id").val(roleId);
  $("#modal_menu_tree").modal("show");
}

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
  $("#txt_update_modal_role_id").val(row.id);
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


/**
 * 新增角色 form 验证
 */
function initAddFormValidator(){
  $('#form_add_role_detail').bootstrapValidator({
    // 默认的提示消息
    message: 'This value is not valid',
    // 表单框里右侧的icon
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    submitHandler: function (validator, form, submitButton) {
      // 表单提交成功时会调用此方法
      // validator: 表单验证实例对象
      // form  jq对象  指定表单对象
      // submitButton  jq对象  指定提交按钮的对象
    },
    fields: {
      roleName: {
        message: '角色名称验证失败',
        validators: {
          notEmpty: {
            message: '角色名称不能为空'
          },
          stringLength: {
            min: 3,
            max: 30,
            message: '用户名长度必须在3到30之间'
          },

          // regexp: { //正则表达式
          //   regexp: /^[a-zA-Z0-9_]+$/,
          //   message: '用户名只能包含大写、小写、数字和下划线'
          // },
          // different: {  //比较
          //   field: 'username', //需要进行比较的input name值
          //   message: '密码不能与用户名相同'
          // },
          // identical: {  //比较是否相同
          //   field: 'password',  //需要进行比较的input name值
          //   message: '两次密码不一致'
          // },
          threshold :  3 ,

          remote: { // ajax校验，获得一个json数据（{'valid': true or false}）
            url: '/sys/admin/role/isRoleNameUnique',       //验证地址
            delay :  1500,//每输入一个字符，就发ajax请求，服务器压力还是太大，设置1.5秒发送一次ajax（默认输入一个字符，提交一次，服务器压力太大）
            message: '角色名称已存在',   //提示信息
            type: 'POST',          //请求方式
            // data: function(validator){  //自定义提交数据，默认为当前input name值
            //   return {
            //     act: 'is_registered',
            //     username: $("input[name='username']").val()
            //   };
            // }
          }
        }
      },
      roleCode: {
        message: '角色编码验证失败',
        validators: {
          notEmpty: {
            message: '角色编码不能为空'
          },
          stringLength: {
            min: 6,
            max: 30,
            message: '用户名长度必须在6到30之间'
          },

          // regexp: { //正则表达式
          //   regexp: /^[a-zA-Z0-9_]+$/,
          //   message: '用户名只能包含大写、小写、数字和下划线'
          // },
          // different: {  //比较
          //   field: 'username', //需要进行比较的input name值
          //   message: '密码不能与用户名相同'
          // },
          // identical: {  //比较是否相同
          //   field: 'password',  //需要进行比较的input name值
          //   message: '两次密码不一致'
          // },
          threshold :  6 ,

          remote: { // ajax校验，获得一个json数据（{'valid': true or false}）
            url: '/sys/admin/role/isRoleCodeUnique',       //验证地址
            delay :  1500,//每输入一个字符，就发ajax请求，服务器压力还是太大，设置1.5秒发送一次ajax（默认输入一个字符，提交一次，服务器压力太大）
            message: '角色编码已存在',   //提示信息
            type: 'POST',          //请求方式
            // data: function(validator){  //自定义提交数据，默认为当前input name值
            //   return {
            //     act: 'is_registered',
            //     username: $("input[name='username']").val()
            //   };
            // }
          }
        }
      }

    }
  });

}



var tree = [
  {
    text: "Parent 1",
    nodes: [
      {
        text: "Child 1",
        selectable: true, // 是否可选中，比如仅仅根节点设置为不可选中
        state: { // 初始化的状态（支持 4 种）
          checked: true, // 是否可勾选
          disabled: false, // 是否可用
          expanded: true, // 是否可折叠
          selected: false // 是否可选中
        },
        tags: ['available'], // 节点右侧徽章
        nodes: [
          {
            text: "Grandchild 1"
          },
          {
            text: "Grandchild 2"
          }
        ]
      },
      {
        text: "Child 2"
      }
    ]
  },
  {
    text: "Parent 2"
  },
  {
    text: "Parent 3"
  },
  {
    text: "Parent 4"
  },
  {
    text: "Parent 5"
  }
];

function getTree() {
  // Some logic to retrieve, or generate tree structure
  return tree;
}


function showMenuTree() {
  $('#menuPermissionTree').treeview({
    data: getTree(),
    showCheckbox: true,
    // checkedIcon: 'glyphicon glyphicon-dashboard', // 勾选图标，需要设置 option: showCheck 为 true 才有效
    // uncheckedIcon: 'glyphicon glyphicon-heart-empty', // 勾选图标，需要设置 option: showCheck 为 true 才有效
    // collapseIcon: 'glyphicon glyphicon-flash', // 折叠图标，默认 min
    // expandIcon: 'glyphicon glyphicon-earphone', // 展开图标，默认 plus
    // color: 'orange', // 此处设置的属性会全局生效（除非节点对象自己额外设置）
    // emptyIcon: 'glyphicon glyphicon-record', // 叶子节点图标，默认为 glyphicon，即空
    // enableLinks: true, // 启用超链接，需要在节点对象设置 href 属性
    // highlightSearchResults: true, // 高亮搜索结果，待研究
    // // highlightSelected: false, // 高亮选中，默认 true
    // levels: 5, // 默认状态展开的层级，默认 2
    // multiSelect: true, // 是否允许多选
    // showIcon: false, // 是否显示默认状态的图标
    // nodeIcon: 'glyphicon glyphicon-usd', // 默认状态节点图标，全局生效，除非节点对象自己额外设置
    // onhoverColor: 'gray', // 默认状态下，鼠标经过节点颜色
    // selectedIcon: 'glyphicon glyphicon-floppy-disk', // 选中状态的图标，全局生效，除非节点对象自己额外设置
    showTags: true // 是否显示右侧徽章
  });
}
