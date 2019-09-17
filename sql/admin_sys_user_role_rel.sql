DROP TABLE IF EXISTS `admin_sys_user_role_rel`;
CREATE TABLE `admin_sys_user_role_rel` (
  `id` bigint(64) NOT NULL,
  `user_id` bigint(64) DEFAULT NULL COMMENT '用户id',
  `role_id` bigint(64) DEFAULT NULL COMMENT '角色id',
 `remark` varchar(500) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '备注',
  `status` int(4) NOT NULL DEFAULT '0' COMMENT '数据状态',
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '创建者',
  `update_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '更新者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
