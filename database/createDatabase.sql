SET NAMES utf8;

DROP DATABASE IF EXISTS groupomania;

CREATE DATABASE groupomania CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE USER 'root' IDENTIFIED BY 'root';
GRANT ALL
ON Groupomania.*
TO 'root';

USE Groupomania;

CREATE TABLE `comments` (
    `_id` int unsigned NOT NULL AUTO_INCREMENT,
    `post_id` int unsigned NOT NULL,
    `user_id` int unsigned NOT NULL,
    PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8

CREATE TABLE `posts` (
    `_id` int unsigned NOT NULL AUTO_INCREMENT,
    `img` varchar(255) DEFAULT NULL,
    `legend` varchar(255) DEFAULT NULL,
    `date` datetime NOT NULL,
    `userId` int unsigned DEFAULT NULL,
    PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8

CREATE TABLE `users` (
    `_id` int unsigned NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `userpicture` varchar(255) NOT NULL DEFAULT 'http://localhost:3000/images/neutral-avatar.png',
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    PRIMARY KEY (`_id`),
    UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8

CREATE TABLE `reactions` (
    `_id` int unsigned NOT NULL AUTO_INCREMENT,
    `post_id` int unsigned NOT NULL,
    `user_id` int unsigned NOT NULL,
    `like` tinyint NOT NULL DEFAULT '0',
    `dislike` tinyint NOT NULL DEFAULT '0',
    `fav` tinyint NOT NULL DEFAULT '0',
    PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8