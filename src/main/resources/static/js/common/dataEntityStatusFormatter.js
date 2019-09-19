// 格式化状态
function statusFormatter(value, row, index) {
  if (value === 0) {
    return '<span class="label label-success">正常</span>';
  } else if(value===1){
    return '<span class="label label-default">删除</span>';
  }else if(value===7){
    return '<span class="label label-info">锁定</span>';
  }
}