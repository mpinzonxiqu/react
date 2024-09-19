-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-09-2024 a las 21:39:56
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `auth_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `is_deleted`) VALUES
(34, 'zzzzzzzzzzzzzzzzz', 'examplePassword', 0),
(35, 'testuser', 'testpassword', 0),
(36, 'anna', 'gym', 0),
(38, 'testdddurrrser', 'testpassdddwrrord', 0),
(39, 'andrea', '$2a$10$DzsRrbGNcdpoHTOXmA1O4OxEzBCyrVOGjHD3.g9W60/mvjiF5iSMG', 0),
(40, 'xiques', '$2a$10$SzxW7s8FTRPJVc/ipDu7EOMAzEas.KVm38UdyAlaf8EArbL7AGrRO', 0),
(41, 'carla', '$2a$10$YVzg.1Il5z2ByvE35B1teekVRaPpmn2VSBNSet0DngGK6g20V4kxm', 0),
(42, 'exampleUser', 'examplePassword', 0),
(43, 'MoisesPinzon', '1515151515', 0),
(44, 'barcelona', '$2a$10$QC4R4hWi0vDxx4fNLJSgFuUCAfGShndN8SZJSSKNdzJCPGUo1cUR.', 0),
(45, 'katalina', '$2a$10$l62GzJgdollA74oUd89K3OIdNBwa45DUvZPJFrLbE2i2AtCRPbXBa', 0),
(46, 'yyyyyyyyy', '$2a$10$3xBUAtF9BbqOROjyT4ek.e9FcsoCI1hDQMz9/5W5Q/6GgXhlpq7C2', 0),
(47, 'sssss', '$2a$10$lgfmMhACG0WgPhtn8yJSoeUe08PToihIUhV9Y0EkWH4HDIzfPPsce', 0),
(48, 'examoooooooooooooser', '$2a$10$A6IN9Ak6tEvm.elQ3oWNxu1SgSqg2UdZGTNeAAE..G3ctTyrgG81a', 0),
(49, 'mmmmmmmmmmm', '$2a$10$C9ekhyQT/LZyXPjporz5VOevZk9Xb/k9mABi6.3Kr7A5KZKRSuNia', 0),
(50, 'nnnnnnnnnnnnnnnnnnnnnnnnn', '$2a$10$vhipgJ8vXBU1Rg5P/IyhauoNrnNUU9Gs6RWAZ9WPFtjjp8ZpsCDLq', 0),
(51, 'michael', '$2a$10$ap18sLFdczNZaIxXsw7xbuQQYYG5BCykgj4VXUbS1eEDAUblRE2le', 0),
(52, 'NANA', '$2a$10$EpMXSIY5VHzFgdXa2KC8ju3q8zWnBbmBvDs.XkITCjDfaFTj4kzyS', 0),
(53, 'MAMA', '$2a$10$XZ268S1UhsPTsB8VnO4VL.A4zxDmdekSMFEDj283y5/Jtjxx8Gza2', 0),
(54, 'JJJJJJJJ', '$2a$10$7GUXPR3029ZTYnPoRIqff.MWF3vQ07qzWEyEDPKqdkN7quByMWnhm', 0),
(55, 'pinzon', '$2a$10$.sZXy5CCkC5XEUzej4pYIuh0oIsLWOTSvWmIjXbKm64o5nc2HusOm', 0),
(56, 'colombia', '$2a$10$k.9pR05caXYWgyrUzDZ5We5tynS5yTy0XpXNuW9s7HgMs1aRGR2iq', 0),
(57, 'alemania', '$2a$10$ZJPacRAfNzndmtq7y4xDHOSxwHCl/x.MAW4HMzoWffE9yGjRtKRw.', 0),
(58, 'cartagena', '$2a$10$.M5lbwNZo4rq0RgJSz1HP.zp0Gr2nduX2FAYuVbF7kUHXk6tv8mIi', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
