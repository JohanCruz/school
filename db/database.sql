DROP TABLE IF EXISTS `test_students`;
CREATE TABLE `test_students` (
  `s_id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `lv_id` smallint DEFAULT NULL COMMENT 'Level or grade',
  `group` varchar(5) DEFAULT NULL COMMENT 'Student group or classroom',
  `email` varchar(100) DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `geolocation` varchar(200) DEFAULT NULL COMMENT 'String containing latitude and longitude',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0=Inactive, 1=Active',
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `test_courses`;
CREATE TABLE `test_courses` (
  `c_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT 'Course name',
  `credits` smallint DEFAULT '1' COMMENT 'Academic credits',
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `test_courses_x_student`;
CREATE TABLE `test_courses_x_student` (
  `cxs_id` int unsigned NOT NULL AUTO_INCREMENT,
  `c_id` int unsigned NOT NULL,
  `s_id` int unsigned NOT NULL,
  PRIMARY KEY (`cxs_id`),
  KEY `FK_test_1_idx` (`s_id`),
  KEY `FK_test_2_idx` (`c_id`),
  CONSTRAINT `FK_test_1` FOREIGN KEY (`s_id`) REFERENCES `test_students` (`s_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_test_2` FOREIGN KEY (`c_id`) REFERENCES `test_courses` (`c_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


INSERT INTO `test_students` VALUES (1,'Aitor','Menta',1,'A','aitor@google.com','345346-54','10.253652685182912,-75.34695290787532',1),(2,'Soila','Puerta del Corral',1,'B','sp@nasa.gov','6244566','10.249488499691639,-75.3477954475428',1),(3,'Pere','Gil',1,'A','PERE@SAMSUNG.COM','73563456','10.249799123271258,-75.34925152563993',0),(4,'Aquiles','Pinto Cuadros',2,'A','aquiles@amazon.com','456345634','-11.329163673002578,-101.05707217964823',1),(5,'Aitor','Tilla',2,'A','aitor@fbi.gov','5345355','6.173310260137041,-75.33102681081111',1),(6,'Elba','Surero',2,'B','elba@area51.org','456654 ext 2','10.250401717562466,-75.35398133602904',1),(7,'Lola','Mento',3,'C','lola@facebook.com','555555','10.249548377811047,-75.34752227877071',0),(8,'Helen','Chufe',3,'C','HELEN@APPLE.COM','666666','6.171133491565565,-75.33362885177205',1);
INSERT INTO `test_courses` VALUES (1,'Open sea survival',10),(2,'Genetic manipulation',100),(3,'Crocodile training',2),(4,'Advanced mapalé dancing',4),(5,'Metaverse extreme sports',5);
INSERT INTO `test_courses_x_student` VALUES (1,1,1),(2,1,3),(3,2,3),(4,3,2),(5,4,7),(6,5,7),(7,1,4),(8,1,8),(9,2,5),(10,3,3),(11,5,3);
