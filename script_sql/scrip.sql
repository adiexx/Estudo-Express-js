CREATE DATABASE `escola`;

USE escola;

CREATE TABLE `professor` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `CPF` varchar(11) NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `titulacao` ENUM('Doutor', 'Mestre', 'Especialista', 'Graduado') NOT NULL,
  PRIMARY KEY (`ID`)
);

