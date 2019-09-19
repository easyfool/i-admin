DROP TABLE IF EXISTS `admin_sys_role`;
CREATE TABLE `admin_sys_role` (
  `id` bigint(64) unsigned NOT NULL AUTO_INCREMENT,
  `role_code` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '角色编码',
  `role_name` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '角色名称',
  `role_sort` int(10) DEFAULT NULL COMMENT '角色排序（升序）',
  `remarks` varchar(500) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '备注',
  `status` int(4) NOT NULL DEFAULT '0' COMMENT '数据状态',
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '创建者',
  `update_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '更新者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;