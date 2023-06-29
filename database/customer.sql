/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : skyicttest

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 29/06/2023 10:09:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `custname` varchar(150) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `custcode` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `address` text CHARACTER SET utf8 COLLATE utf8_bin NULL,
  `createid` int NULL DEFAULT NULL,
  `createdate` datetime NULL DEFAULT NULL,
  `modifieddate` datetime NULL DEFAULT NULL,
  `modifiedid` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES (1, 'บริษัท A จำกัด', 'A01', 'test', 0, '2023-06-29 00:14:38', '2023-06-29 00:29:20', 2);
INSERT INTO `customer` VALUES (2, 'บริษัท B จำกัด', 'B01', 'กรุงเทพฯ', 0, '2023-06-29 00:14:38', '2023-06-29 00:14:38', 0);
INSERT INTO `customer` VALUES (3, 'ทดสอบ', 'C01', 'สมุทรปราการ', 2, '2023-06-29 10:00:23', '2023-06-29 10:00:23', 2);

-- ----------------------------
-- Table structure for userlogin
-- ----------------------------
DROP TABLE IF EXISTS `userlogin`;
CREATE TABLE `userlogin`  (
  `id` int NOT NULL,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `password` text CHARACTER SET utf8 COLLATE utf8_bin NULL,
  `firstname` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `lastname` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `email` varchar(150) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `createid` int NULL DEFAULT NULL,
  `createdate` datetime NULL DEFAULT NULL,
  `modifiedid` int NULL DEFAULT NULL,
  `modifieddate` datetime NULL DEFAULT NULL,
  `roleid` int NULL DEFAULT NULL COMMENT '1 = admin , 10 = user',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `ix_username`(`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userlogin
-- ----------------------------
INSERT INTO `userlogin` VALUES (1, 'user01', '$2a$10$96zeke8WXcIR5j.4pscV4OaoYyjtT73HrS32Pqr0fMLGpSjxxY32.', 'user01', 'l01', '-', '-', 0, '2023-06-28 23:13:30', 0, '2023-06-28 23:13:32', 10);
INSERT INTO `userlogin` VALUES (2, 'user02', '$2a$10$96zeke8WXcIR5j.4pscV4OaoYyjtT73HrS32Pqr0fMLGpSjxxY32.', 'user02', 'l02', '-', '-', 0, '2023-06-28 23:13:48', 0, '2023-06-28 23:13:51', 1);

SET FOREIGN_KEY_CHECKS = 1;
