-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Май 27 2019 г., 19:33
-- Версия сервера: 10.1.38-MariaDB-0ubuntu0.18.04.2
-- Версия PHP: 7.2.17-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `diplom_new`
--

-- --------------------------------------------------------

--
-- Структура таблицы `avatars`
--
-- Создание: Май 18 2019 г., 19:31
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

--
-- Дамп данных таблицы `avatars`
--

INSERT INTO `avatars` (`id`, `uri`)
VALUES (1, 'd_avatar.jpg'),
       (100, 'no-avatar.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `bugreport`
--
-- Создание: Май 18 2019 г., 19:59
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
-- Создание: Май 18 2019 г., 19:36
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
-- Создание: Май 18 2019 г., 19:33
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
-- Создание: Май 18 2019 г., 19:57
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
VALUES (1, 'Добавлен'),
       (2, 'Обработан'),
       (3, 'Занят');

-- --------------------------------------------------------

--
-- Структура таблицы `support`
--
-- Создание: Май 21 2019 г., 17:47
--

CREATE TABLE `support`
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
-- СВЯЗИ ТАБЛИЦЫ `support`:
--   `file`
--       `files` -> `id`
--   `status`
--       `status` -> `id`
--   `user`
--       `users` -> `id`
--

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--
-- Создание: Май 27 2019 г., 16:27
--

CREATE TABLE `users`
(
    `id`                int(11)     NOT NULL,
    `login`             varchar(16) NOT NULL,
    `password`          varchar(40) NOT NULL,
    `role`              int(11)     NOT NULL,
    `phone`             varchar(20)          DEFAULT NULL,
    `email`             varchar(40)          DEFAULT NULL,
    `avatar`            int(11)              DEFAULT '100',
    `registration_date` datetime    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `reputation`        int(11)              DEFAULT '0',
    `education`         int(11)              DEFAULT NULL,
    `balance`           int(11)              DEFAULT '0'
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
                     `registration_date`, `reputation`, `education`, `balance`)
VALUES (1, 'support', '123456', 1, '+79999999999', 'email@ma.il', 1, '2019-05-18 22:34:55', 0, NULL,
        0);

-- --------------------------------------------------------

--
-- Структура таблицы `works`
--
-- Создание: Май 18 2019 г., 19:59
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
-- Дамп данных таблицы `works`
--

INSERT INTO `works` (`id`, `type`, `user`, `date`, `topic`, `text`, `file`, `price`, `executor`,
                     `status`)
VALUES (2, NULL, 1, '2019-05-21 21:10:11', 'Task',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat felis a risus ullamcorper hendrerit. Praesent vel turpis vitae metus consequat posuere. Ut congue condimentum diam, vel tempus dolor ornare vel. Nunc in gravida nunc. Nunc ullamcorper ultricies pharetra. Donec at sodales lacus. Fusce lorem ante, cursus ullamcorper gravida eu, fringilla id orci. Pellentesque tincidunt auctor lacus facilisis ullamcorper. Cras ullamcorper in purus et consequat. Proin mauris quam, convallis vitae nunc ac, molestie consequat lectus. Etiam et efficitur odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae vestibulum odio, et consequat nulla. Mauris et sapien eu velit facilisis tincidunt eget a eros. Nunc lacinia rutrum sapien eu mollis.\nSuspendisse egestas ultricies dolor eu rhoncus. Duis imperdiet magna sit amet orci tincidunt pulvinar. Ut ipsum elit, mattis id semper efficitur, ultricies a tortor. Aenean semper nulla velit, non sollicitudin sem feugiat sit amet. Donec mattis pellentesque commodo. Phasellus varius nisl sit amet libero tincidunt auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida arcu neque, et vestibulum turpis aliquet vitae. Vivamus imperdiet aliquet consectetur.\nVivamus id bibendum ligula. In erat ipsum, consequat id magna sit amet, accumsan placerat tellus. Duis porta, ipsum vitae egestas egestas, lorem turpis placerat leo, ac porttitor ex orci sed velit. Donec ut tellus id magna molestie pretium. Mauris tincidunt euismod sem id tristique. Aenean tristique nisl id volutpat dapibus. In ullamcorper, urna vitae gravida sollicitudin, mauris lorem finibus nunc, lobortis viverra nisi massa in magna. In ac pellentesque odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis nunc massa. Nunc quis finibus nisi.\nDuis ac imperdiet mauris. Maecenas est mauris, varius vestibulum massa et, pellentesque pharetra odio. Nullam egestas ultrices dolor vitae laoreet. Maecenas venenatis maximus vestibulum. Mauris tempus lorem a ipsum consectetur rutrum. Vestibulum mollis sollicitudin lectus, sit amet fermentum ipsum accumsan vitae. Sed lobortis erat vitae malesuada vestibulum. Pellentesque at volutpat elit. Integer facilisis quis ante at lobortis. Nam id enim in justo blandit aliquet et vitae ex. Donec pharetra porta enim, sollicitudin lacinia ex. Quisque eget mi scelerisque, suscipit sem vulputate, semper urna. Fusce sit amet arcu nisl.\nSuspendisse non enim nec sapien dapibus placerat. Quisque eu varius magna. Suspendisse lacinia, libero ut sodales posuere, urna velit fringilla leo, id efficitur erat metus ut magna. Nunc feugiat diam et nunc finibus, quis porttitor lectus tristique. Aenean feugiat laoreet nibh, in eleifend diam accumsan at. Etiam et neque vel nulla molestie iaculis. Vivamus ut enim in massa eleifend fringilla a quis nunc. Sed ac maximus felis, condimentum accumsan purus. Fusce nec convallis augue, a efficitur orci. Praesent feugiat nulla vitae bibendum interdum. Ut et ligula suscipit, fringilla dui sit amet, eleifend est. Ut in nulla est.',
        NULL, 0, 1, 1);

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
-- Индексы таблицы `support`
--
ALTER TABLE `support`
    ADD PRIMARY KEY (`id`),
    ADD KEY `support_files_id_fk` (`file`),
    ADD KEY `support_status_id_fk` (`status`),
    ADD KEY `support_users_id_fk` (`user`);

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
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 101;
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
    AUTO_INCREMENT = 4;
--
-- AUTO_INCREMENT для таблицы `support`
--
ALTER TABLE `support`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
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
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 3;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `bugreport`
--
ALTER TABLE `bugreport`
    ADD CONSTRAINT `bugreport_files_id_fk` FOREIGN KEY (`file`) REFERENCES `files` (`id`),
    ADD CONSTRAINT `bugreport_status_id_fk` FOREIGN KEY (`status`) REFERENCES `status` (`id`),
    ADD CONSTRAINT `bugreport_users_id_fk` FOREIGN KEY (`user`) REFERENCES `diplom`.`users` (`id`);

--
-- Ограничения внешнего ключа таблицы `support`
--
ALTER TABLE `support`
    ADD CONSTRAINT `support_files_id_fk` FOREIGN KEY (`file`) REFERENCES `files` (`id`),
    ADD CONSTRAINT `support_status_id_fk` FOREIGN KEY (`status`) REFERENCES `status` (`id`),
    ADD CONSTRAINT `support_users_id_fk` FOREIGN KEY (`user`) REFERENCES `diplom`.`users` (`id`);

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
    ADD CONSTRAINT `works_users_id_fk` FOREIGN KEY (`user`) REFERENCES `diplom`.`users` (`id`),
    ADD CONSTRAINT `works_users_id_fk_2` FOREIGN KEY (`executor`) REFERENCES `diplom`.`users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
