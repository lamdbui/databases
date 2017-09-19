DROP DATABASE IF EXISTS chat; 
CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT,
  username_id INT NOT NULL,
  message_text TEXT NOT NULL,
  room_id INT NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name TEXT NOT NULL,
  PRIMARY KEY(id) 
);

CREATE TABLE rooms (
  id INT NOT NULL AUTO_INCREMENT,
  name TEXT NOT NULL,
  PRIMARY KEY(id) 
);

CREATE TABLE friends (
  my_id INT NOT NULL,
  friend_id INT NOT NULL
  -- PRIMARY KEY(my_id)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `messages` ADD FOREIGN KEY (username_id) REFERENCES `users` (`id`);
ALTER TABLE `messages` ADD FOREIGN KEY (room_id) REFERENCES `rooms` (`id`);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

/*
-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Animals'
-- 
-- ---

DROP TABLE IF EXISTS `Animals`;
    
CREATE TABLE `Animals` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  `life_span` INTEGER NULL DEFAULT NULL,
  `is_poisonous` TINYINT NULL DEFAULT NULL,
  `global_population_count` INTEGER NULL DEFAULT NULL,
  `is_endangered` TINYINT NULL DEFAULT NULL,
  `id_classification` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Classification'
-- 
-- ---

DROP TABLE IF EXISTS `Classification`;
    
CREATE TABLE `Classification` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Animals` ADD FOREIGN KEY (id_classification) REFERENCES `Classification` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Animals` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Classification` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Animals` (`id`,`name`,`life_span`,`is_poisonous`,`global_population_count`,`is_endangered`,`id_classification`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Classification` (`id`,`name`) VALUES
-- ('','');

*/