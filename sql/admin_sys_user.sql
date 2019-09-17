DROP TABLE IF EXISTS `admin_sys_user`;
CREATE TABLE `admin_sys_user` (
  `id` bigint(64) unsigned NOT NULL AUTO_INCREMENT,
  `user_code` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户编号',
  `login_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户名称',
  `nick_name` varchar(255) COLLATE utf8mb4_bin NOT NULL COMMENT '昵称',
  `real_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '真实姓名',
  `password` varchar(50) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '密码',
  `salt` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '加密盐值',
  `mobile` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '手机号码',
  `email` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '邮箱',
  `sex` varchar(1) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '性别',
  `remark` varchar(500) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '备注',
  `status` int(4) NOT NULL DEFAULT '0' COMMENT '数据状态',
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '创建者',
  `update_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '更新者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;