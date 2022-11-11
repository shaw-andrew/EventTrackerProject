-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema exercisetrackerdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `exercisetrackerdb` ;

-- -----------------------------------------------------
-- Schema exercisetrackerdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `exercisetrackerdb` DEFAULT CHARACTER SET utf8 ;
USE `exercisetrackerdb` ;

-- -----------------------------------------------------
-- Table `exercise`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `exercise` ;

CREATE TABLE IF NOT EXISTS `exercise` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `distance_in_miles` DECIMAL(3,1) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NULL,
  `date` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `calisthenics`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `calisthenics` ;

CREATE TABLE IF NOT EXISTS `calisthenics` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Other`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Other` ;

CREATE TABLE IF NOT EXISTS `Other` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS exerciseuser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'exerciseuser'@'localhost' IDENTIFIED BY 'exerciseuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'exerciseuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `exercise`
-- -----------------------------------------------------
START TRANSACTION;
USE `exercisetrackerdb`;
INSERT INTO `exercise` (`id`, `distance_in_miles`, `type`, `description`, `date`) VALUES (1, 3.5, 'Run', 'Washington Park', '2022-08-15');
INSERT INTO `exercise` (`id`, `distance_in_miles`, `type`, `description`, `date`) VALUES (2, 35, 'Bike', 'Sandy Creek Trail', '2022-09-10');
INSERT INTO `exercise` (`id`, `distance_in_miles`, `type`, `description`, `date`) VALUES (3, 15, 'Hike', 'Lost Creek Wilderness', '2022-08-02');
INSERT INTO `exercise` (`id`, `distance_in_miles`, `type`, `description`, `date`) VALUES (4, 3.5, 'Run', 'Washington Park', '2022-11-11');
INSERT INTO `exercise` (`id`, `distance_in_miles`, `type`, `description`, `date`) VALUES (5, 45, 'Bike', 'Cherry Creek Trail', '2022-10-29');

COMMIT;


-- -----------------------------------------------------
-- Data for table `calisthenics`
-- -----------------------------------------------------
START TRANSACTION;
USE `exercisetrackerdb`;
INSERT INTO `calisthenics` (`id`, `date`, `description`) VALUES (1, '2022-08-16', 'Pushups x 45, Situps x 60, Pull-Ups x 20');
INSERT INTO `calisthenics` (`id`, `date`, `description`) VALUES (2, '2022-09-20', 'Pushups x 45, Situps x 60, Pull-Ups x 20');
INSERT INTO `calisthenics` (`id`, `date`, `description`) VALUES (3, '2022-10-13', 'Pushups x 45, Situps x 60, Pull-Ups x 20');
INSERT INTO `calisthenics` (`id`, `date`, `description`) VALUES (4, '2022-11-01', 'Pushups x 45, Situps x 60, Pull-Ups x 20');

COMMIT;


-- -----------------------------------------------------
-- Data for table `Other`
-- -----------------------------------------------------
START TRANSACTION;
USE `exercisetrackerdb`;
INSERT INTO `Other` (`id`, `date`, `description`, `type`) VALUES (1, '2022-07-25', 'Climb', 'V5');
INSERT INTO `Other` (`id`, `date`, `description`, `type`) VALUES (2, '2022-08-17', 'Climb', 'V6');
INSERT INTO `Other` (`id`, `date`, `description`, `type`) VALUES (3, '2022-09-15', 'Climb', 'V6');

COMMIT;

