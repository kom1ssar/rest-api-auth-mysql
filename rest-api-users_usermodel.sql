-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: rest-api-users
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `usermodel`
--

DROP TABLE IF EXISTS `usermodel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usermodel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'NaN',
  `photo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'NaN',
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'NaN',
  `createdOn` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserModel_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usermodel`
--

LOCK TABLES `usermodel` WRITE;
/*!40000 ALTER TABLE `usermodel` DISABLE KEYS */;
INSERT INTO `usermodel` VALUES (1,'nidjat@yandex.ru','Nidjat','NaN','bd08abb2-86f9-47de-97ae-32ab89bf54dc.jpg','$2a$06$FRao7Ck6khEF3EDo1y/9U.iTk/ro8CpYjx0qDrBZLnWH2hhxe7xie','NaN','2022-06-21 10:09:25.628'),(2,'nikita@yandex.ru','Nikita','NaN','NaN','$2a$06$zHFsdKw5ZH7kwl4sXWCWmuz95shblE2EmQiag12sz3FylKtNpsbna','NaN','2022-06-21 10:11:18.868'),(3,'vadim@yandex.ru','Vadim','Dadadad','ce8da0a7-71c7-4997-b5a6-5566c975c7ae.jpg','$2a$06$rQoEwKBgErqdPlDMF62KfesCRCZ/EOGJ/ipQDWPbgXgQiIFHBue6q','male','2022-06-21 10:11:45.587'),(4,'vasda@yandex.ru','asd','NaN','4d55622f-f395-452f-924d-7e95dae957d0.jpg','$2a$06$5v9WJflf2Jy.1ouDKDKLgOVrvkehDuYYR3O2oRV1IN6N5TburHbkW','NaN','2022-06-21 10:13:33.643'),(5,'vasqweqda@yandex.ru','avdavda','NaN','1f6135c3-bda5-494b-a2ac-a26a492ebdee.jpg','$2a$06$qxC3eD1j7YaOhuiTYCcMXe7GGbXQj92Qs/r0eZJJLZVp2a0Mhw3XG','NaN','2022-06-21 10:13:38.234'),(6,'vdfgdfgda@yandex.ru','dgfgd','NaN','53989eba-9f7e-43be-ad58-d86042c1e2f5.jpg','$2a$06$lDoSWwYTHNzD8W5XC1pmvO6o0yNm7XzXK7uZdF8DJ8cQpazFLd7pG','NaN','2022-06-21 10:13:47.386'),(7,'vcvx@yandex.ru','dgfgd','NaN','NaN','$2a$06$OS2aTieYoCt6TteCsTn2Yuh4fw/DTTBtKkA2PUDB5FQxxNnfNkHl.','NaN','2022-06-21 10:13:49.612'),(8,'qwrvx@yandex.ru','dgfgd','NaN','NaN','$2a$06$/.xejguejRGJptJV9l42nuvRJaoae9R26dlkP5mCS9.aaA9f226vC','NaN','2022-06-21 10:13:52.248'),(9,'qghjx@yandex.ru','dgertgd','NaN','e019cc20-b28b-4674-9fd4-15ca2594a118.jpg','$2a$06$z8DH4ciM4mLKSmVofOaldOVAkHeEXuD1siFhQRb.S/Xj34UP8nu2W','NaN','2022-06-21 10:13:56.423'),(10,'qvasdxx@yandex.ru','dgertgd','NaN','NaN','$2a$06$7kHaXN349JLN0DeH.SRcOe/SXuGfVTSn5gjOlr/g5AaISpmAeX/CG','NaN','2022-06-21 10:13:59.337'),(11,'asdxzc@yandex.ru','dgertgd','NaN','NaN','$2a$06$N8O9kLOFBLlSfHt3iOeOQOg/AH6BsDutcOBja/uK8KL/SvSktUj0u','NaN','2022-06-21 10:15:44.864');
/*!40000 ALTER TABLE `usermodel` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-21 13:32:49
