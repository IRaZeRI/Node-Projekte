SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS beest
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
use beest;


-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `rank` varchar(12) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Member',
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `lastname` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `last_login` timestamp NOT NULL DEFAULT current_timestamp(),
  `passwordcode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `passwordcode_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `username`, `rank`, `email`, `password`, `firstname`, `lastname`, `created_at`, `updated_at`, `last_login`, `passwordcode`, `passwordcode_time`) VALUES
(1, 'Admin', 'Admin', 'admin@beest.de', '123456', 'Admin', 'Beest', '0420-04-20 04:20:00', '0420-04-20 04:20:00', '0420-04-20 04:20:00', NULL, NULL),
(2, 'MaxMuster', 'Ausbilder', 'max@muster.de', '123456', 'Max', 'Muster', '0420-04-20 04:20:00', '0420-04-20 04:20:00', '0420-04-20 04:20:00', NULL, NULL),
(3, 'SchülerDemo', 'Schüler', 'schüler@beest.de', '123456', 'Max', 'Muster', '0420-04-20 04:20:00', '0420-04-20 04:20:00', '0420-04-20 04:20:00', NULL, NULL),
(4, 'MemberDemo', 'Member', 'member@beest.de', '123456', 'Max', 'Muster', '0420-04-20 04:20:00', '0420-04-20 04:20:00', '0420-04-20 04:20:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `beestlist`
--

CREATE TABLE `beestlist` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(64) NOT NULL DEFAULT 'Beest',
  `roomid` varchar(64) DEFAULT '',
  `host` varchar(64) NOT NULL DEFAULT '.beest.de',
  `status` varchar(64) NOT NULL DEFAULT 'Offline'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `beestlist`
--

INSERT INTO `beestlist` (`id`, `name`, `roomid`, `host`, `status`) VALUES
('1', 'demo.beest', '420', 'https://beest.de/room?roomid=420', 'Offline');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`) USING HASH,
  ADD UNIQUE KEY `email` (`email`);

--
-- Indizes für die Tabelle `beestlist`
--
ALTER TABLE `beestlist`
  ADD PRIMARY KEY (`id`) USING HASH,
  ADD UNIQUE KEY `host` (`host`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;