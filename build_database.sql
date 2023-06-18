
-- The database contains one user, with both username and password 'user', and a few test positions.

DROP DATABASE if exists codfish_2000; 
CREATE DATABASE codfish_2000; 
USE codfish_2000; 
-- MySQL dump 10.13  Distrib 5.7.28, for Win64 (x86_64)
--
-- Host: localhost    Database: codfish_2000
-- ------------------------------------------------------
-- Server version	5.7.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `analysis`
--

DROP TABLE IF EXISTS `analysis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `analysis` (
  `username` varchar(50) NOT NULL,
  `fen` varchar(255) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(50) NOT NULL DEFAULT 'Unnamed analysis',
  `depth` varchar(15) DEFAULT '-',
  `best_move` varchar(15) DEFAULT '-',
  `evaluation` varchar(15) DEFAULT '-',
  PRIMARY KEY (`username`,`fen`),
  CONSTRAINT `fk_username` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analysis`
--

LOCK TABLES `analysis` WRITE;
/*!40000 ALTER TABLE `analysis` DISABLE KEYS */;
INSERT INTO `analysis` VALUES ('user','1r1q1r2/2p2p1k/p2pbp1p/3P3Q/1Pp1PR2/P7/6PP/RN4K1 b - - 0 1','2023-06-16 18:48:02','Critical position','6','Bd7','0.87'),('user','3r4/8/3k4/8/8/3K4/8/8 w - - 0 1','2023-06-16 18:49:15','Rook endgame','9','Kd4','-5.70'),('user','8/2P4k/5K2/5N2/8/8/8/8 w - - 0 1','2023-06-16 18:50:35','Stalemate','6','Kf7','Mate in 2'),('user','8/2Pk4/8/5K2/8/8/8/8 w - - 0 1','2023-06-16 18:51:01','Draw by material','3','c8Q','Game to draw'),('user','8/3K4/4P3/8/8/8/6k1/7q w - - 0 1','2023-06-16 18:50:21','Queen promotion endgame','7','e7','-6.90'),('user','8/8/8/8/5n2/5k2/2p4K/8 b - - 0 1','2023-06-16 18:50:49','Stalemate black','6','Ne2','Mate in 2'),('user','r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w Qkq - 0 1','2023-06-16 18:48:54','Complex position','5','dxe6','2.25'),('user','R6R/8/3K4/8/8/3k4/8/8 b - - 0 1','2023-06-16 18:50:00','Two rooks endgame white','8','Ke4','10.40'),('user','r6r/8/3k4/8/8/3K4/8/8 w - - 0 1','2023-06-16 18:49:38','Two rooks endgame','8','Ke4','-10.40'),('user','r7/1k6/5K2/5N2/8/8/8/8 w - - 98 1','2023-06-16 18:51:20','Draw by 50 move rule','3','Ke7','Game to draw');
/*!40000 ALTER TABLE `analysis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('user','$2y$10$PMUvQgRkUF4qkcRAvTth/eQtqNk4XiVdLALda.Zz.J5A4NXjNDxsq');
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

-- Dump completed on 2023-06-16 23:55:54
