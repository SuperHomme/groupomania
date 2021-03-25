CREATE DATABASE  IF NOT EXISTS `groupomania` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `groupomania`;
-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `_id` int unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `_id_UNIQUE` (`_id`),
  KEY `fk_comment_post_id_idx` (`post_id`),
  KEY `fk_comment_user_id_idx` (`user_id`),
  CONSTRAINT `fk_comment_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_comment_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (17,5,19,'ah, les hommes...','2021-03-17 23:58:30'),(18,9,19,'sexiste... supprime !','2021-03-17 23:58:46'),(19,7,19,'je tente un truc','2021-03-18 00:03:32'),(20,7,19,'je tente un autre truc','2021-03-18 00:04:01'),(21,7,19,'encore un autre truc','2021-03-18 00:04:31'),(22,7,19,'encore encore','2021-03-18 00:05:14'),(23,9,19,'on va voir ce que tu diras','2021-03-18 00:07:59'),(31,9,19,'je ne sais plus','2021-03-18 00:52:48'),(32,9,19,'admettons','2021-03-18 00:53:21'),(33,9,19,'je ne sais plus très bien','2021-03-18 00:54:02'),(34,9,19,'je ne sais plus très bien','2021-03-18 00:55:32'),(35,29,20,'il ne va pas tarder à casser sa pipe','2021-03-18 00:59:49'),(36,2,20,'je ne capte pas','2021-03-18 01:01:07'),(37,2,20,'enfin si maintenant','2021-03-18 01:01:34'),(38,2,20,'et là ? double fuck ?','2021-03-18 01:01:49'),(39,7,21,'il est complètement stone !','2021-03-18 10:19:17'),(40,9,21,'oui... un peu sexiste... nazi !','2021-03-18 10:19:38'),(41,32,21,'que voulez-vous :)','2021-03-18 10:19:59'),(42,2,21,'euh, assez bof sur un réseau pro...','2021-03-18 10:20:37'),(43,29,21,'je sais pas','2021-03-18 10:28:11'),(44,5,22,'ahah on dirait moi quand je fume','2021-03-18 10:46:27'),(53,32,24,'euh, il faut couper l\'eau là','2021-03-18 12:17:27'),(54,37,24,'voilà un commentaire','2021-03-18 19:10:15'),(55,2,24,'hello','2021-03-19 21:44:41');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `_id` int unsigned NOT NULL AUTO_INCREMENT,
  `img` varchar(255) DEFAULT NULL,
  `legend` text,
  `date` datetime NOT NULL,
  `user_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `fk_post_user_id_idx` (`user_id`),
  CONSTRAINT `fk_post_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (2,'http://localhost:3000/images/homer-double-f_4-2-2021-13-43.gif','homer nous insulte ou je rêve ?!','2016-02-22 01:34:18',4),(5,'http://localhost:3000/images/homer-brainfucked.gif','homer sans cervelle','2013-02-24 04:43:32',4),(7,'http://localhost:3000/images/homer-stoned.gif','j\'en ai trop pris','2011-02-24 04:43:32',4),(9,'http://localhost:3000/images/marge-new-breasts.gif','c\'est du bon silicon !','2009-02-24 04:43:32',4),(29,'http://localhost:3000/images/grandpa-burning_17-2-2021-23-25.gif','je crois que papy brule.. mince !','2021-03-17 23:25:41',19),(31,'http://localhost:3000/images/homer-in-adam_18-2-2021-1-14.gif','je suis sur un petit nuage','2021-03-18 01:14:27',4),(32,'http://localhost:3000/images/milhouse_18-2-2021-10-18.gif','en mode \"Tsunami dans ma baignoire\"','2021-03-18 10:18:55',21),(33,'http://localhost:3000/images/bart-towel_18-2-2021-10-43.gif','j\'ai tellement faim, j\'me taperai bien 1 marcassin','2021-03-18 10:43:42',22),(37,'http://localhost:3000/images/maggie_simpson_no_18-2-2021-12-16.gif',' je suis très très circonslecte... moui ','2021-03-18 12:16:28',24),(38,'http://localhost:3000/images/homer-hungry_19-2-2021-21-47.gif',' ça gargouille','2021-03-19 21:47:11',24),(39,'http://localhost:3000/images/grandpa-burning_19-2-2021-22-31.gif','nnnnnnnnnnnnn','2021-03-19 22:31:19',4);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reactions`
--

DROP TABLE IF EXISTS `reactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reactions` (
  `post_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `likes` tinyint unsigned NOT NULL DEFAULT '0',
  `dislikes` tinyint unsigned NOT NULL DEFAULT '0',
  `favs` tinyint unsigned NOT NULL DEFAULT '0',
  `dateLike` datetime DEFAULT NULL,
  `dateDislike` datetime DEFAULT NULL,
  `dateFav` datetime DEFAULT NULL,
  PRIMARY KEY (`post_id`,`user_id`),
  KEY `fk_reaction_user_id_idx` (`user_id`),
  CONSTRAINT `fk_reaction_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reaction_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reactions`
--

LOCK TABLES `reactions` WRITE;
/*!40000 ALTER TABLE `reactions` DISABLE KEYS */;
INSERT INTO `reactions` VALUES (2,4,1,0,1,'2021-03-17 18:35:59',NULL,'2021-03-17 20:44:51'),(2,20,0,1,0,NULL,'2021-03-18 01:02:09',NULL),(2,21,0,1,0,NULL,'2021-03-18 10:28:59',NULL),(2,24,0,1,1,NULL,'2021-03-18 12:16:49','2021-03-18 12:16:34'),(5,4,1,0,0,'2021-03-17 20:44:54',NULL,NULL),(5,19,0,0,1,NULL,NULL,'2021-03-17 23:58:31'),(5,20,0,1,0,NULL,'2021-03-18 01:02:04',NULL),(5,21,1,0,1,'2021-03-18 10:20:19',NULL,'2021-03-18 10:20:09'),(5,22,0,0,1,NULL,NULL,'2021-03-18 10:46:29'),(7,4,0,0,0,'2021-03-18 02:04:22',NULL,NULL),(7,19,1,0,1,'2021-03-17 23:58:07',NULL,'2021-03-17 23:58:08'),(7,21,1,0,0,'2021-03-18 10:18:59',NULL,NULL),(7,24,1,0,0,'2021-03-18 12:16:36',NULL,NULL),(9,4,0,1,0,NULL,'2021-03-18 02:05:36',NULL),(9,19,0,1,0,NULL,'2021-03-17 23:58:35',NULL),(9,24,0,1,0,NULL,'2021-03-18 12:16:40',NULL),(29,4,0,1,0,NULL,'2021-03-18 01:48:16',NULL),(29,20,1,0,1,'2021-03-18 00:59:29',NULL,'2021-03-18 01:00:23'),(29,21,1,0,0,'2021-03-18 10:20:50',NULL,NULL),(29,24,1,0,0,'2021-03-18 12:16:53',NULL,NULL),(31,21,0,0,1,NULL,NULL,'2021-03-18 10:20:06'),(31,24,1,0,0,'2021-03-18 12:16:56',NULL,NULL),(32,21,1,0,0,'2021-03-18 10:20:02',NULL,NULL),(32,24,1,0,0,'2021-03-18 12:16:58',NULL,NULL),(33,22,0,0,1,NULL,NULL,'2021-03-18 10:43:47'),(33,24,1,0,0,'2021-03-18 12:17:06',NULL,NULL),(37,24,0,1,1,NULL,'2021-03-19 21:45:56','2021-03-18 12:17:17');
/*!40000 ALTER TABLE `reactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `userpicture` varchar(255) NOT NULL DEFAULT 'http://localhost:3000/images/neutral-avatar.png',
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(45) DEFAULT 'collab',
  PRIMARY KEY (`_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'Fedor Porc','http://localhost:3000/images/Fedor_Porc_19-2-2021-22-20.jpeg','srqbe.cbep@gmail.com','$2b$10$EiAiEIxDLmvNdGGx7594fuvqLor4OHshlJKnsxfDbkjTig67T86RS','admin'),(19,'Mireille Abeille','http://localhost:3000/images/Mireille_Abeille_17-2-2021-23-47.jpeg','zvervyyr.norvyyr@gmail.com','$2b$10$1dfPB04FieeuRdBFL4PAuOfYNLls9.BI/63NW2Ncl5J2w096LrauS','collab'),(20,'Hector Castor','http://localhost:3000/images/Hector_Castor_18-2-2021-0-59.jpeg','urpgbe.pnfgbe@gmail.com','$2b$10$dSn/Gb2kkrAocf67jLQ85eKGEXRYhBh1QidOaQw6ol9ddfedy8PXq','collab'),(21,'Edouard Canard','http://localhost:3000/images/Edouard_Canard_18-2-2021-10-28.jpeg','rqbhneq.pnaneq@gmail.com','$2b$10$FvrbNzdS12hUeMqt3LpQNu6V1t.ydGA45LzsNZgKNB4xyiPzD8k5q','collab'),(22,'José Sanglier','http://localhost:3000/images/Jose_Sanglier_18-2-2021-10-46.jpeg','wbfr.fnatyvre@gmail.com','$2b$10$j3Ltmh4yncDVVor8dzpjx.BUse0LsU9meT5kAoqE3fdkBcxAxIE6W','collab'),(24,'Manon Espadon','http://localhost:3000/images/Manon_Espadon_18-2-2021-12-16.jpeg','znaba.rfcnqba@undefined','$2b$10$ItycbpjPfnnQP6xGWlaUGORrVdpRznyITGe2Pxbdiv.MZoK.l0hgS','collab'),(26,' ','http://localhost:3000/images/neutral-avatar.png','@undefined','$2b$10$2qDXnL41oplxN.Z7/nK0WepQeFDmw1Q6QYzBp4hcSvzG5VDvdTKga','collab');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-24 21:50:37
