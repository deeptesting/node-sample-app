-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 18, 2020 at 10:40 AM
-- Server version: 8.0.13-4
-- PHP Version: 7.2.24-0ubuntu0.18.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nlHDem7JeI`
--

-- --------------------------------------------------------

--
-- Table structure for table `City`
--

CREATE TABLE `City` (
  `Id` int(11) NOT NULL,
  `City_Name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `State_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `City`
--

INSERT INTO `City` (`Id`, `City_Name`, `State_Id`) VALUES
(1, 'Indore', 1),
(2, 'Bhopal', 1),
(3, 'Gwalior', 1),
(4, 'Gwalior5', 1);

-- --------------------------------------------------------

--
-- Table structure for table `State`
--

CREATE TABLE `State` (
  `Id` int(11) NOT NULL,
  `State_Name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Code` varchar(10) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `State`
--

INSERT INTO `State` (`Id`, `State_Name`, `Code`) VALUES
(1, 'Madhya Pradesh', 'MP'),
(2, 'West Bengal', 'WB'),
(3, 'Rajasthan', 'RJ'),
(4, 'Bihar', 'BI');

-- --------------------------------------------------------

--
-- Table structure for table `UserMaster`
--

CREATE TABLE `UserMaster` (
  `Id` int(11) NOT NULL,
  `UserId` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `UserEmail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `RegistrationTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `FullName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Phone` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CityId` int(11) NOT NULL,
  `IsActive` tinyint(1) NOT NULL DEFAULT '1',
  `ProfileImage` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `UserMaster`
--

INSERT INTO `UserMaster` (`Id`, `UserId`, `UserEmail`, `Password`, `FullName`, `Phone`, `Address`, `CityId`, `IsActive`, `ProfileImage`) VALUES
(9, 'ff435ed3-b77f-42d8-9052-9ae264ff61a6', 'admin@gmail.com', '$2b$10$NKlAfteVT/JkPDyNewWoQu9NH5WvrTKaGXI5cGwWwYBB5Fa2CJwSy', 'Admin', '8777785962', 'Birati, kolkata -51', 1, 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `UserRole`
--

CREATE TABLE `UserRole` (
  `UserId` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT 'User Guid',
  `Roles` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT 'All Roles with comma separator'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `UserRole`
--

INSERT INTO `UserRole` (`UserId`, `Roles`) VALUES
('ff435ed3-b77f-42d8-9052-9ae264ff61a6', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `City`
--
ALTER TABLE `City`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `State`
--
ALTER TABLE `State`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `UserMaster`
--
ALTER TABLE `UserMaster`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `UserEmail` (`UserEmail`),
  ADD KEY `UserIdIndex` (`UserId`);

--
-- Indexes for table `UserRole`
--
ALTER TABLE `UserRole`
  ADD UNIQUE KEY `UserIDUnique` (`UserId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `City`
--
ALTER TABLE `City`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `State`
--
ALTER TABLE `State`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `UserMaster`
--
ALTER TABLE `UserMaster`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
