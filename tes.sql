-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Май 23 2019 г., 20:09
-- Версия сервера: 10.1.38-MariaDB-0ubuntu0.18.04.2
-- Версия PHP: 7.2.17-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `tes`
--

-- --------------------------------------------------------

--
-- Структура таблицы `avatars`
--
-- Создание: Май 18 2019 г., 20:05
--

CREATE TABLE `avatars`
(
    `id`  int(11)      NOT NULL,
    `uri` varchar(255) NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

--
-- СВЯЗИ ТАБЛИЦЫ `avatars`:
--

-- --------------------------------------------------------

--
-- Структура таблицы `bugreport`
--
-- Создание: Май 18 2019 г., 20:05
--

CREATE TABLE `bugreport`
(
    `id`     int(11) NOT NULL,
    `user`   int(11) NOT NULL,
    `title`  text    NOT NULL,
    `text`   text    NOT NULL,
    `file`   int(11) DEFAULT NULL,
    `status` int(11) DEFAULT '1'
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

--
-- СВЯЗИ ТАБЛИЦЫ `bugreport`:
--   `file`
--       `files` -> `id`
--   `status`
--       `status` -> `id`
--   `user`
--       `users` -> `id`
--

-- --------------------------------------------------------

--
-- Структура таблицы `files`
--
-- Создание: Май 18 2019 г., 20:05
--

CREATE TABLE `files`
(
    `id`  int(11)      NOT NULL,
    `uri` varchar(255) NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

--
-- СВЯЗИ ТАБЛИЦЫ `files`:
--

-- --------------------------------------------------------

--
-- Структура таблицы `roles`
--
-- Создание: Май 18 2019 г., 20:05
--

CREATE TABLE `roles`
(
    `id`   int(11)     NOT NULL,
    `name` varchar(40) NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

--
-- СВЯЗИ ТАБЛИЦЫ `roles`:
--

--
-- Дамп данных таблицы `roles`
--

INSERT INTO `roles` (`id`, `name`)
VALUES (1, 'support');

-- --------------------------------------------------------

--
-- Структура таблицы `status`
--
-- Создание: Май 18 2019 г., 20:05
--

CREATE TABLE `status`
(
    `id`     int(11) NOT NULL,
    `status` text    NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

--
-- СВЯЗИ ТАБЛИЦЫ `status`:
--

--
-- Дамп данных таблицы `status`
--

INSERT INTO `status` (`id`, `status`)
VALUES (1, 'Добавлен');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--
-- Создание: Май 18 2019 г., 20:06
--

CREATE TABLE `users`
(
    `id`                int(11)     NOT NULL,
    `login`             varchar(16) NOT NULL,
    `password`          varchar(40) NOT NULL,
    `role`              int(11)     NOT NULL,
    `phone`             varchar(20)          DEFAULT NULL,
    `email`             varchar(40)          DEFAULT NULL,
    `avatar`            int(11)              DEFAULT NULL,
    `registration_date` datetime    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `reputation`        int(11)              DEFAULT '0',
    `education`         int(11)              DEFAULT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

--
-- СВЯЗИ ТАБЛИЦЫ `users`:
--   `avatar`
--       `avatars` -> `id`
--   `role`
--       `roles` -> `id`
--

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `role`, `phone`, `email`, `avatar`,
                     `registration_date`, `reputation`, `education`)
VALUES (1, 'support', '123456', 1, NULL, NULL, NULL, '2019-05-18 22:34:55', 0, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `works`
--
-- Создание: Май 18 2019 г., 20:06
--

CREATE TABLE `works`
(
    `id`       int(11) NOT NULL,
    `type`     int(11)  DEFAULT NULL,
    `user`     int(11)  DEFAULT NULL,
    `date`     datetime DEFAULT CURRENT_TIMESTAMP,
    `topic`    text    NOT NULL,
    `text`     text    NOT NULL,
    `file`     int(11)  DEFAULT NULL,
    `price`    int(11)  DEFAULT '0',
    `executor` int(11)  DEFAULT NULL,
    `status`   int(11)  DEFAULT '1'
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

--
-- СВЯЗИ ТАБЛИЦЫ `works`:
--   `file`
--       `files` -> `id`
--   `status`
--       `status` -> `id`
--   `user`
--       `users` -> `id`
--   `executor`
--       `users` -> `id`
--

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `avatars`
--
ALTER TABLE `avatars`
    ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bugreport`
--
ALTER TABLE `bugreport`
    ADD PRIMARY KEY (`id`),
    ADD KEY `bugreport_users_id_fk` (`user`),
    ADD KEY `bugreport_files_id_fk` (`file`),
    ADD KEY `bugreport_status_id_fk` (`status`);

--
-- Индексы таблицы `files`
--
ALTER TABLE `files`
    ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `roles`
--
ALTER TABLE `roles`
    ADD PRIMARY KEY (`id`),
    ADD UNIQUE KEY `roles_name_uindex` (`name`);

--
-- Индексы таблицы `status`
--
ALTER TABLE `status`
    ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`id`),
    ADD UNIQUE KEY `users_login_uindex` (`login`),
    ADD KEY `users_avatars_id_fk` (`avatar`),
    ADD KEY `users_roles_id_fk` (`role`);

--
-- Индексы таблицы `works`
--
ALTER TABLE `works`
    ADD PRIMARY KEY (`id`),
    ADD KEY `works_files_id_fk` (`file`),
    ADD KEY `works_users_id_fk` (`user`),
    ADD KEY `works_users_id_fk_2` (`executor`),
    ADD KEY `works_status_id_fk` (`status`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `avatars`
--
ALTER TABLE `avatars`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `bugreport`
--
ALTER TABLE `bugreport`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `files`
--
ALTER TABLE `files`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `roles`
--
ALTER TABLE `roles`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 2;
--
-- AUTO_INCREMENT для таблицы `status`
--
ALTER TABLE `status`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 2;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 2;
--
-- AUTO_INCREMENT для таблицы `works`
--
ALTER TABLE `works`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `bugreport`
--
ALTER TABLE `bugreport`
    ADD CONSTRAINT `bugreport_files_id_fk` FOREIGN KEY (`file`) REFERENCES `files` (`id`),
    ADD CONSTRAINT `bugreport_status_id_fk` FOREIGN KEY (`status`) REFERENCES `status` (`id`),
    ADD CONSTRAINT `bugreport_users_id_fk` FOREIGN KEY (`user`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
    ADD CONSTRAINT `users_avatars_id_fk` FOREIGN KEY (`avatar`) REFERENCES `avatars` (`id`),
    ADD CONSTRAINT `users_roles_id_fk` FOREIGN KEY (`role`) REFERENCES `roles` (`id`);

--
-- Ограничения внешнего ключа таблицы `works`
--
ALTER TABLE `works`
    ADD CONSTRAINT `works_files_id_fk` FOREIGN KEY (`file`) REFERENCES `files` (`id`),
    ADD CONSTRAINT `works_status_id_fk` FOREIGN KEY (`status`) REFERENCES `status` (`id`),
    ADD CONSTRAINT `works_users_id_fk` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
    ADD CONSTRAINT `works_users_id_fk_2` FOREIGN KEY (`executor`) REFERENCES `users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
