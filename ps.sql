-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2021 at 12:19 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ps`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `categoryName` varchar(45) NOT NULL,
  `categoryDescription` varchar(45) DEFAULT NULL,
  `image` mediumblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryName`, `categoryDescription`, `image`) VALUES
('Meetings', 'Meetings Desc', NULL),
('Online Training', 'Training desc', NULL),
('Sailing', 'Sailing desc', NULL),
('Workshop', 'Workshop desc', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `certification`
--

CREATE TABLE `certification` (
  `certificationName` varchar(100) NOT NULL,
  `certificationDetails` varchar(100) DEFAULT NULL,
  `validityPeriod` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `certification`
--

INSERT INTO `certification` (`certificationName`, `certificationDetails`, `validityPeriod`) VALUES
('RYA Boat 1& 2', 'RYA Boat 1& 2 desc', '1 year'),
('RYA First Aid', 'RYA First Aid desc', '2 years'),
('RYA Safety Boat', 'RYA Safety Boat desc', '1 year');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `eventNumber` int(11) NOT NULL,
  `eventName` varchar(55) DEFAULT NULL,
  `eventDescription` varchar(100) DEFAULT NULL,
  `eventStartDateTime` datetime DEFAULT NULL,
  `eventEndDateTime` datetime DEFAULT NULL,
  `eventAddress1` varchar(45) DEFAULT NULL,
  `eventAddress2` varchar(45) DEFAULT NULL,
  `eventPostcode` char(11) DEFAULT NULL,
  `categoryName` varchar(45) DEFAULT NULL,
  `eventStatus` varchar(45) DEFAULT NULL,
  `uniqueCode` varchar(100) DEFAULT NULL,
  `latitude` decimal(16,8) DEFAULT NULL,
  `longitude` decimal(16,8) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`eventNumber`, `eventName`, `eventDescription`, `eventStartDateTime`, `eventEndDateTime`, `eventAddress1`, `eventAddress2`, `eventPostcode`, `categoryName`, `eventStatus`, `uniqueCode`, `latitude`, `longitude`, `avatar`) VALUES
(79, 'Tuesday Sailing', 'Tuesday Event  descriptiom', '2021-03-09 09:00:38', '2021-03-09 17:31:38', NULL, 'Peterborough', 'PE2 5RU', 'Sailing', 'In Progress', '0+Trtyuz', '52.56557510', '-0.31596920', 'https://www.rya.org.uk/SiteCollectionImages/460x460-general/460-optimist.jpg'),
(80, 'Thursday Sailing', 'Thursday Event Description', '2021-03-11 08:00:38', '2021-03-11 17:30:38', '9 Russell Mews', 'Peterborough', 'PE1 2FB', 'Sailing', 'In Progress', 'lw8KmEDq', '52.57821700', '-0.24787800', 'https://www.yachtsandyachting.com/photos/optimist/yandy135611.jpg'),
(81, 'Tuesday Sailing', 'Tuesday Event Description', '2021-05-04 12:38:40', '2021-03-11 17:53:40', NULL, 'Peterborough', 'PE2 5RU', 'Sailing', 'In Progress', 'EWj6zdrt', '52.56557510', '-0.31596920', 'https://www.yachtsandyachting.com/photos/optimist/2000bowmoor_1.jpg'),
(82, 'Test 1', 'Test 1 description', '2021-04-05 12:14:57', '2021-04-05 12:14:57', NULL, 'Peterborough', 'PE1 2FB', 'Sailing', 'Released', 'PBnH2tyl', '52.57821700', '-0.24787800', 'https://www.rya.org.uk/SiteCollectionImages/460x460-general/460-optimist.jpg'),
(83, 'Test 2', 'Test 2 description', '2021-04-06 12:14:57', '2021-04-06 12:14:57', NULL, 'Peterborough', 'PE1 3HP', 'Sailing', 'Released', 'v2psj1D8', '52.59527400', '-0.25456600', 'https://www.yachtsandyachting.com/photos/optimist/yandy135611.jpg'),
(84, 'Test 3', 'Test 3 description', '2021-04-07 12:14:57', '2021-04-07 12:14:57', NULL, 'Peterborough', 'PE1 2FB', 'Sailing', 'Released', 'VO8hYXU+', '52.57821700', '-0.24787800', 'https://www.yachtsandyachting.com/photos/optimist/2000bowmoor_1.jpg'),
(85, 'Test 4', 'Test 4 description', '2021-04-08 12:14:57', '2021-04-08 12:14:57', NULL, 'Peterborough', 'PE1 2FB', 'Sailing', 'Released', '8ePdI2js', '52.57821700', '-0.24787800', 'https://www.rya.org.uk/SiteCollectionImages/460x460-general/460-optimist.jpg'),
(86, 'Test 5', 'Test 5 description', '2021-04-09 12:14:57', '2021-04-09 12:14:57', NULL, 'Peterborough', 'PE1 2FB', 'Sailing', 'Released', '5GBjXoff', '52.57821700', '-0.24787800', 'https://www.yachtsandyachting.com/photos/optimist/yandy135611.jpg'),
(87, 'Test 6', 'Test 6 description', '2021-04-10 12:14:57', '2021-04-10 12:14:57', NULL, 'Peterborough', 'PE1 4HP', 'Sailing', 'Released', 'rO2iOboU', '52.59506100', '-0.23543800', 'https://www.rya.org.uk/SiteCollectionImages/460x460-general/460-optimist.jpg'),
(88, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'https://www.rya.org.uk/SiteCollectionImages/460x460-general/460-optimist.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `eventstatus`
--

CREATE TABLE `eventstatus` (
  `statusName` varchar(45) NOT NULL,
  `statusDescription` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `eventstatus`
--

INSERT INTO `eventstatus` (`statusName`, `statusDescription`) VALUES
('Cancelled', 'Cancelled status desc'),
('Completed', 'Completed status des'),
('In Progress', 'In Progress status desc'),
('Released', 'Released status desc');

-- --------------------------------------------------------

--
-- Table structure for table `frequentlyaskedquestion`
--

CREATE TABLE `frequentlyaskedquestion` (
  `id` int(11) NOT NULL,
  `question` varchar(100) DEFAULT NULL,
  `answer` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `frequentlyaskedquestion`
--

INSERT INTO `frequentlyaskedquestion` (`id`, `question`, `answer`) VALUES
(1, 'I don\'t know how to sail, can I still help?', 'Sailability has a variety of Volunteer roles availability from helping with the shore crew, Office work, to meet and greeting our users. If you are interested in Sailing, we will provide full sailing training enabling you to become a sailing buddy.'),
(2, 'How do I get started as a volunteer with Peterborough Sailability?', 'Follow the link to register button above or feel free to call 07948262919 for an informal chat. Once you have registered you will be invited for a short informal chat and the application process will be explained to you.'),
(3, 'What is a typical week for a volunteer with Peterborogh Sailability?', 'You will be volunteering a Tuesday or/and Thursday. On a day you could be a sailing buddy volunteer and take out our users in a Challenger sailing boat, following the agreed training program for our sailors. Alternatively, you could be part of a shore crew that will help safely launch or recover boats from the water, including the use of a quad bike. As part of the office crew, you will meet and greeting users, check in and kitting out users with equipment.');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `roleName` varchar(45) NOT NULL,
  `roleDescription` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`roleName`, `roleDescription`) VALUES
('Admin', 'Admin role desc'),
('Office', 'Office role desc'),
('Sailor', 'Sailor role desc'),
('Shorecrew', 'Shorecrew');

-- --------------------------------------------------------

--
-- Table structure for table `volunteer`
--

CREATE TABLE `volunteer` (
  `volunteerId` int(11) NOT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `address1` varchar(45) DEFAULT NULL,
  `address2` varchar(45) DEFAULT NULL,
  `postcode` char(11) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `mobileNumber` char(16) DEFAULT NULL,
  `weight` smallint(6) DEFAULT NULL,
  `noKinFullName` varchar(45) DEFAULT NULL,
  `noKinMobileNumber` varchar(45) DEFAULT NULL,
  `noKinRelationship` varchar(45) DEFAULT NULL,
  `statusName` varchar(45) DEFAULT NULL,
  `roleName` varchar(45) DEFAULT NULL,
  `medicalConditions` varchar(45) DEFAULT NULL,
  `criminalOffence` tinyint(1) DEFAULT NULL,
  `activationCode` varchar(100) DEFAULT NULL,
  `emailVerified` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `volunteer`
--

INSERT INTO `volunteer` (`volunteerId`, `firstName`, `lastName`, `address1`, `address2`, `postcode`, `email`, `password`, `mobileNumber`, `weight`, `noKinFullName`, `noKinMobileNumber`, `noKinRelationship`, `statusName`, `roleName`, `medicalConditions`, `criminalOffence`, `activationCode`, `emailVerified`) VALUES
(189, 'Ernasi', 'Pikouli', '9 Russell Mews', 'Peterborough', 'PE1 2FB', 'ernasi.pikouli@gousto.co.uk', '$2a$11$JMLjVemdPB7jV.xkF1FBnOqmlYlYIeM/toQFaFrAQU57yP2T/VVSO', '+447753190727', 0, 'Greta Iljazi', '+447736910625', 'wife', 'Active', 'Office', 'n/a', 0, 'MwClEFFZ', 1),
(191, 'Ernasi', 'Pikouli', '9 Russell Mews', 'feff', 'PE1 2FB', 'ernasjobs@gmail.com', '$2a$11$.Wfr6zRss596I3Ya3TwENODR.TsJq5RCdQl/F9B4wrJQjvRJhTflW', '+447736910625', 0, 'Ernasi Pikouli', '+447736910625', 'efe', 'Active', 'Admin', 'efef', 0, 'PCR4fIQT', 1),
(192, 'Roman', 'Tangl', '! Test Streer', 'HHHH', 'PE2 6YD', 'roman.psailability@gmail.com', '$2a$11$3PdlqC2Z7iQ7/veFshOZg.Fz0BLMpSdkSgiGnRJPi8Wm4X6cOlsM6', '+447753190727', 0, 'jjjj', '+447753190727', 'jjjj', 'Active', 'Admin', 'none', 0, 'gPtdA7D+', 1);

-- --------------------------------------------------------

--
-- Table structure for table `volunteercertification`
--

CREATE TABLE `volunteercertification` (
  `volunteerId` int(11) NOT NULL,
  `certificationName` varchar(45) NOT NULL,
  `certificationNote` varchar(45) DEFAULT NULL,
  `certificationDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `volunteerevent`
--

CREATE TABLE `volunteerevent` (
  `eventNumber` int(11) NOT NULL,
  `volunteerId` int(11) NOT NULL,
  `volunteerEventAttended` tinyint(1) DEFAULT NULL,
  `volunteerEventNote` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `volunteerevent`
--

INSERT INTO `volunteerevent` (`eventNumber`, `volunteerId`, `volunteerEventAttended`, `volunteerEventNote`) VALUES
(81, 192, 0, 'test');

-- --------------------------------------------------------

--
-- Table structure for table `volunteerstatus`
--

CREATE TABLE `volunteerstatus` (
  `statusName` varchar(45) NOT NULL,
  `statusDescription` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `volunteerstatus`
--

INSERT INTO `volunteerstatus` (`statusName`, `statusDescription`) VALUES
('Activating', 'Activating'),
('Active', 'Active desc'),
('In Progress', 'In Progress desc'),
('Locked', 'Locked account desc'),
('New', 'New user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryName`);

--
-- Indexes for table `certification`
--
ALTER TABLE `certification`
  ADD PRIMARY KEY (`certificationName`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`eventNumber`),
  ADD KEY `category_id` (`categoryName`),
  ADD KEY `event_id` (`eventStatus`);

--
-- Indexes for table `eventstatus`
--
ALTER TABLE `eventstatus`
  ADD PRIMARY KEY (`statusName`);

--
-- Indexes for table `frequentlyaskedquestion`
--
ALTER TABLE `frequentlyaskedquestion`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`roleName`);

--
-- Indexes for table `volunteer`
--
ALTER TABLE `volunteer`
  ADD PRIMARY KEY (`volunteerId`),
  ADD KEY `volunteer_status_id` (`statusName`),
  ADD KEY `role_name_id` (`roleName`);

--
-- Indexes for table `volunteercertification`
--
ALTER TABLE `volunteercertification`
  ADD PRIMARY KEY (`volunteerId`,`certificationName`),
  ADD KEY `volunteer_id_cert_idk` (`volunteerId`),
  ADD KEY `certification_name_id` (`certificationName`);

--
-- Indexes for table `volunteerevent`
--
ALTER TABLE `volunteerevent`
  ADD PRIMARY KEY (`eventNumber`,`volunteerId`),
  ADD KEY `event_number_idk` (`eventNumber`),
  ADD KEY `volunteer_name_idk` (`volunteerId`);

--
-- Indexes for table `volunteerstatus`
--
ALTER TABLE `volunteerstatus`
  ADD PRIMARY KEY (`statusName`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `eventNumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `frequentlyaskedquestion`
--
ALTER TABLE `frequentlyaskedquestion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `volunteer`
--
ALTER TABLE `volunteer`
  MODIFY `volunteerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=193;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `category_id_fk` FOREIGN KEY (`categoryName`) REFERENCES `category` (`categoryName`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `event_id_fk` FOREIGN KEY (`eventStatus`) REFERENCES `eventstatus` (`statusName`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `volunteer`
--
ALTER TABLE `volunteer`
  ADD CONSTRAINT `role_name_id_fk` FOREIGN KEY (`roleName`) REFERENCES `role` (`roleName`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `volunteer_status_id_fk` FOREIGN KEY (`statusName`) REFERENCES `volunteerstatus` (`statusName`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `volunteercertification`
--
ALTER TABLE `volunteercertification`
  ADD CONSTRAINT `certification_name_fk` FOREIGN KEY (`certificationName`) REFERENCES `certification` (`certificationName`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `volunteer_id_fk` FOREIGN KEY (`volunteerId`) REFERENCES `volunteer` (`volunteerId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `volunteerevent`
--
ALTER TABLE `volunteerevent`
  ADD CONSTRAINT `event_id_fk2` FOREIGN KEY (`eventNumber`) REFERENCES `event` (`eventNumber`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `volunteer_id_fk2` FOREIGN KEY (`volunteerId`) REFERENCES `volunteer` (`volunteerId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
