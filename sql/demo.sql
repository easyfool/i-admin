/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : iadmin

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 13/09/2019 14:36:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for demo
-- ----------------------------
DROP TABLE IF EXISTS `demo`;
CREATE TABLE `demo` (
  `id` bigint(64) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

SET FOREIGN_KEY_CHECKS = 1;



/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : ibuy

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 08/09/2019 22:13:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_sys_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_sys_user`;
CREATE TABLE `admin_sys_user` (
  `id` bigint(32) unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '用户名',
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '密码',
  `salt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '加密盐值',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '邮箱',
  `status` int(4) NOT NULL DEFAULT '0' COMMENT '数据状态',
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '创建者',
  `update_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '更新者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

SET FOREIGN_KEY_CHECKS = 1;


INSERT INTO `iadmin`.`admin_sys_menu`(`id`, `name`, `left`, `right`, `level`, `icon`, `url`, `create_date`, `create_by`, `update_date`, `update_by`, `status`, `permission`, `parent_id`) VALUES (1, 'Food1', 1, 22, 1, NULL, NULL, '2019-09-08 20:35:56', NULL, '2019-09-15 22:54:18', NULL, 0, NULL, 0);
INSERT INTO `iadmin`.`admin_sys_menu`(`id`, `name`, `left`, `right`, `level`, `icon`, `url`, `create_date`, `create_by`, `update_date`, `update_by`, `status`, `permission`, `parent_id`) VALUES (2, 'Fruit', 2, 11, 2, 'icon', 'url', NULL, NULL, '2019-09-15 22:49:50', NULL, 0, 'p', 1);
INSERT INTO `iadmin`.`admin_sys_menu`(`id`, `name`, `left`, `right`, `level`, `icon`, `url`, `create_date`, `create_by`, `update_date`, `update_by`, `status`, `permission`, `parent_id`) VALUES (3, 'Meat', 12, 21, 2, 'icon', 'url', NULL, NULL, '2019-09-15 22:54:18', NULL, 0, 'p', 1);
INSERT INTO `iadmin`.`admin_sys_menu`(`id`, `name`, `left`, `right`, `level`, `icon`, `url`, `create_date`, `create_by`, `update_date`, `update_by`, `status`, `permission`, `parent_id`) VALUES (4, 'Red', 3, 6, 3, 'icon', 'url', NULL, NULL, '2019-09-15 14:32:53', NULL, 0, 'p', 2);
INSERT INTO `iadmin`.`admin_sys_menu`(`id`, `name`, `left`, `right`, `level`, `icon`, `url`, `create_date`, `create_by`, `update_date`, `update_by`, `status`, `permission`, `parent_id`) VALUES (5, 'Yellow', 7, 10, 3, 'icon', 'url', NULL, NULL, '2019-09-15 17:19:22', NULL, 0, 'p', 2);
INSERT INTO `iadmin`.`admin_sys_menu`(`id`, `name`, `left`, `right`, `level`, `icon`, `url`, `create_date`, `create_by`, `update_date`, `update_by`, `status`, `permission`, `parent_id`) VALUES (6, 'Beef', 13, 18, 3, 'icon', 'url', NULL, NULL, '2019-09-15 22:54:18', NULL, 0, 'p', 3);
INSERT INTO `iadmin`.`admin_sys_menu`(`id`, `name`, `left`, `right`, `level`, `icon`, `url`, `create_date`, `create_by`, `update_date`, `update_by`, `status`, `permission`, `parent_id`) VALUES (7, 'Pork', 19, 20, 3, 'icon', 'url', NULL, NULL, '2019-09-15 22:54:18', NULL, 0, 'p', 3);
INSERT INTO `iadmin`.`admin_sys_menu`(`id`, `name`, `left`, `right`, `level`, `icon`, `url`, `create_date`, `create_by`, `update_date`, `update_by`, `status`, `permission`, `parent_id`) VALUES (8, 'Cherry', 4, 5, 4, 'icon', 'url', NULL, NULL, '2019-09-15 14:32:53', NULL, 0, 'p', 4);
INSERT INTO `iadmin`.`admin_sys_menu`(`id`, `name`, `left`, `right`, `level`, `icon`, `url`, `create_date`, `create_by`, `update_date`, `update_by`, `status`, `permission`, `parent_id`) VALUES (9, 'Banana', 8, 9, 4, 'icon', 'url', NULL, NULL, '2019-09-15 14:32:53', NULL, 0, 'p', 5);
INSERT INTO `iadmin`.`admin_sys_menu`(`id`, `name`, `left`, `right`, `level`, `icon`, `url`, `create_date`, `create_by`, `update_date`, `update_by`, `status`, `permission`, `parent_id`) VALUES (18, '顶顶顶顶', 14, 15, 4, '', '', NULL, NULL, NULL, NULL, 0, '', 6);
INSERT INTO `iadmin`.`admin_sys_menu`(`id`, `name`, `left`, `right`, `level`, `icon`, `url`, `create_date`, `create_by`, `update_date`, `update_by`, `status`, `permission`, `parent_id`) VALUES (19, '顶顶顶顶1', 16, 17, 4, '', '的说法都是', NULL, NULL, '2019-09-15 22:54:32', NULL, 0, '', 6);