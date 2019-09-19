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



INSERT INTO `iadmin`.`admin_sys_user` (`id`, `user_code`, `login_name`, `nick_name`, `real_name`, `password`, `salt`, `mobile`, `email`, `sex`, `remark`, `status`, `create_date`, `create_by`, `update_date`, `update_by`) VALUES ('19', NULL, '刘备', '刘皇叔', '刘备', NULL, NULL, '', 'liubei@shuhan.com', '1', '爱哭鬼', '1', '2019-09-19 10:54:53', NULL, '2019-09-19 13:08:28', NULL);
INSERT INTO `iadmin`.`admin_sys_user` (`id`, `user_code`, `login_name`, `nick_name`, `real_name`, `password`, `salt`, `mobile`, `email`, `sex`, `remark`, `status`, `create_date`, `create_by`, `update_date`, `update_by`) VALUES ('20', NULL, '关羽', '关云长', '关羽', NULL, NULL, '', 'guanyu@shuhan.com', '1', '', '0', '2019-09-19 10:58:28', NULL, '2019-09-19 10:58:28', NULL);
INSERT INTO `iadmin`.`admin_sys_user` (`id`, `user_code`, `login_name`, `nick_name`, `real_name`, `password`, `salt`, `mobile`, `email`, `sex`, `remark`, `status`, `create_date`, `create_by`, `update_date`, `update_by`) VALUES ('21', NULL, '张飞', '张翼德', '张飞', NULL, NULL, '', 'zhangfei@shuhan.com', '1', '', '1', '2019-09-19 10:59:01', NULL, '2019-09-19 15:47:16', NULL);
INSERT INTO `iadmin`.`admin_sys_user` (`id`, `user_code`, `login_name`, `nick_name`, `real_name`, `password`, `salt`, `mobile`, `email`, `sex`, `remark`, `status`, `create_date`, `create_by`, `update_date`, `update_by`) VALUES ('22', NULL, '曹操', '曹孟德', '曹操', NULL, NULL, '', 'caocao@weiguo.com', '1', '', '1', '2019-09-19 11:00:04', NULL, '2019-09-19 15:47:16', NULL);
INSERT INTO `iadmin`.`admin_sys_user` (`id`, `user_code`, `login_name`, `nick_name`, `real_name`, `password`, `salt`, `mobile`, `email`, `sex`, `remark`, `status`, `create_date`, `create_by`, `update_date`, `update_by`) VALUES ('23', NULL, '赵云', '赵子龙', '赵云', NULL, NULL, '', 'zhaoyun@shuhan.com', '1', '', '0', '2019-09-19 11:00:42', NULL, '2019-09-19 11:00:42', NULL);
INSERT INTO `iadmin`.`admin_sys_user` (`id`, `user_code`, `login_name`, `nick_name`, `real_name`, `password`, `salt`, `mobile`, `email`, `sex`, `remark`, `status`, `create_date`, `create_by`, `update_date`, `update_by`) VALUES ('24', NULL, '孙权', '孙仲谋', '孙权', NULL, NULL, '', 'sunquan@wuguo.com', '1', '', '0', '2019-09-19 11:01:08', NULL, '2019-09-19 11:01:08', NULL);
INSERT INTO `iadmin`.`admin_sys_user` (`id`, `user_code`, `login_name`, `nick_name`, `real_name`, `password`, `salt`, `mobile`, `email`, `sex`, `remark`, `status`, `create_date`, `create_by`, `update_date`, `update_by`) VALUES ('25', NULL, '贾宝玉', '宝二哥', '贾宝玉', NULL, NULL, '', 'jiaobaoyu@daguanyuan.com', '1', '不是甄宝玉', '0', '2019-09-19 11:02:10', NULL, '2019-09-19 11:02:28', NULL);
INSERT INTO `iadmin`.`admin_sys_user` (`id`, `user_code`, `login_name`, `nick_name`, `real_name`, `password`, `salt`, `mobile`, `email`, `sex`, `remark`, `status`, `create_date`, `create_by`, `update_date`, `update_by`) VALUES ('26', NULL, '武松', '行者', '武松', NULL, NULL, '', 'wusong@shuihu.com', '1', '', '0', '2019-09-19 13:02:26', NULL, '2019-09-19 13:02:26', NULL);
INSERT INTO `iadmin`.`admin_sys_user` (`id`, `user_code`, `login_name`, `nick_name`, `real_name`, `password`, `salt`, `mobile`, `email`, `sex`, `remark`, `status`, `create_date`, `create_by`, `update_date`, `update_by`) VALUES ('27', NULL, '宋江', '及时雨', '宋江', NULL, NULL, '', 'songjiang@shuihu.com', '1', '', '0', '2019-09-19 13:04:46', NULL, '2019-09-19 13:04:46', NULL);
INSERT INTO `iadmin`.`admin_sys_user` (`id`, `user_code`, `login_name`, `nick_name`, `real_name`, `password`, `salt`, `mobile`, `email`, `sex`, `remark`, `status`, `create_date`, `create_by`, `update_date`, `update_by`) VALUES ('28', NULL, '鲁智深', '花和尚', '鲁智深', NULL, NULL, '', 'luzhishen@liuhesi.com', '1', '鲁提辖', '0', '2019-09-19 13:06:58', NULL, '2019-09-19 13:07:09', NULL);
