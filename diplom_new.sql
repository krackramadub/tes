-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 29 2019 г., 10:22
-- Версия сервера: 10.1.36-MariaDB
-- Версия PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `diplom_new`
--

-- --------------------------------------------------------

--
-- Структура таблицы `avatars`
--

CREATE TABLE `avatars` (
  `id` int(11) NOT NULL,
  `uri` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `avatars`
--

INSERT INTO `avatars` (`id`, `uri`) VALUES
(1, 'd_avatar.jpg'),
(100, 'no-avatar.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `bugreport`
--

CREATE TABLE `bugreport` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `title` text NOT NULL,
  `text` text NOT NULL,
  `file` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `bugreport`
--

INSERT INTO `bugreport` (`id`, `user`, `title`, `text`, `file`, `status`) VALUES
(1, 0, 'test123', 'Пример сообщения об ошибке', NULL, 1),
(2, 0, 'проверка', 'Проверка изменений в системе', NULL, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `uri` varchar(255) NOT NULL,
  `filename` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `files`
--

INSERT INTO `files` (`id`, `uri`, `filename`) VALUES
(1, '44be1ddfb79608c260a1440bd63f8d76', '1234.png');

-- --------------------------------------------------------

--
-- Структура таблицы `moder_status`
--

CREATE TABLE `moder_status` (
  `id` int(11) NOT NULL,
  `moder_status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `moder_status`
--

INSERT INTO `moder_status` (`id`, `moder_status`) VALUES
(1, 'Ожидает модерацию'),
(2, 'Прошел модерацию'),
(3, 'Отклонен');

-- --------------------------------------------------------

--
-- Структура таблицы `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(4, 'alert'),
(5, 'ban'),
(2, 'moder'),
(3, 'user');

-- --------------------------------------------------------

--
-- Структура таблицы `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `status`
--

INSERT INTO `status` (`id`, `status`) VALUES
(1, 'Добавлен'),
(2, 'Обработан'),
(3, 'Занят');

-- --------------------------------------------------------

--
-- Структура таблицы `support`
--

CREATE TABLE `support` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `title` text NOT NULL,
  `text` text NOT NULL,
  `file` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `types`
--

INSERT INTO `types` (`id`, `name`) VALUES
(13, 'Доклад'),
(17, 'Другое'),
(3, 'Контрольная работа'),
(1, 'Курсовая работа'),
(12, 'Лабораторная работа'),
(16, 'Набор текста'),
(11, 'Ответы на вопросы'),
(5, 'Отчет по практике'),
(10, 'Перевод'),
(6, 'Презентация'),
(4, 'Реферат'),
(2, 'Решение задач'),
(9, 'Сочинение'),
(14, 'Статья'),
(15, 'Творческая работа'),
(8, 'Чертеж'),
(7, 'Эссе');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(16) NOT NULL,
  `password` varchar(40) NOT NULL,
  `role` int(11) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `avatar` int(11) DEFAULT '100',
  `registration_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reputation` int(11) DEFAULT '0',
  `education` int(11) DEFAULT NULL,
  `balance` int(11) DEFAULT '0',
  `moder_text` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `role`, `phone`, `email`, `avatar`, `registration_date`, `reputation`, `education`, `balance`, `moder_text`) VALUES
(1, 'admin', '123456', 1, '+79999999999', 'email@ma.il', 1, '2019-05-18 22:34:55', 0, NULL, 0, ''),
(2, 'moderator', '123456', 2, '+79000000000', 'moder@ezreshenie.test', 100, '2019-05-29 00:40:14', 0, NULL, 0, ''),
(3, 'user', '123456', 3, NULL, NULL, 100, '2019-05-29 00:40:37', 0, NULL, 0, ''),
(4, 'ban_test', '123456', 5, NULL, NULL, 100, '2019-05-29 00:41:48', 0, NULL, 0, 'Тестовая блокировка пользователя');

-- --------------------------------------------------------

--
-- Структура таблицы `works`
--

CREATE TABLE `works` (
  `id` int(11) NOT NULL,
  `type` int(11) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `topic` text NOT NULL,
  `text` text NOT NULL,
  `file` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT '0',
  `executor` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `moder_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `works`
--

INSERT INTO `works` (`id`, `type`, `user`, `date`, `topic`, `text`, `file`, `price`, `executor`, `status`, `moder_status`) VALUES
(2, 1, 1, '2019-05-21 21:10:11', 'Task', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat felis a risus ullamcorper hendrerit. Praesent vel turpis vitae metus consequat posuere. Ut congue condimentum diam, vel tempus dolor ornare vel. Nunc in gravida nunc. Nunc ullamcorper ultricies pharetra. Donec at sodales lacus. Fusce lorem ante, cursus ullamcorper gravida eu, fringilla id orci. Pellentesque tincidunt auctor lacus facilisis ullamcorper. Cras ullamcorper in purus et consequat. Proin mauris quam, convallis vitae nunc ac, molestie consequat lectus. Etiam et efficitur odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae vestibulum odio, et consequat nulla. Mauris et sapien eu velit facilisis tincidunt eget a eros. Nunc lacinia rutrum sapien eu mollis.\nSuspendisse egestas ultricies dolor eu rhoncus. Duis imperdiet magna sit amet orci tincidunt pulvinar. Ut ipsum elit, mattis id semper efficitur, ultricies a tortor. Aenean semper nulla velit, non sollicitudin sem feugiat sit amet. Donec mattis pellentesque commodo. Phasellus varius nisl sit amet libero tincidunt auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida arcu neque, et vestibulum turpis aliquet vitae. Vivamus imperdiet aliquet consectetur.\nVivamus id bibendum ligula. In erat ipsum, consequat id magna sit amet, accumsan placerat tellus. Duis porta, ipsum vitae egestas egestas, lorem turpis placerat leo, ac porttitor ex orci sed velit. Donec ut tellus id magna molestie pretium. Mauris tincidunt euismod sem id tristique. Aenean tristique nisl id volutpat dapibus. In ullamcorper, urna vitae gravida sollicitudin, mauris lorem finibus nunc, lobortis viverra nisi massa in magna. In ac pellentesque odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis nunc massa. Nunc quis finibus nisi.\nDuis ac imperdiet mauris. Maecenas est mauris, varius vestibulum massa et, pellentesque pharetra odio. Nullam egestas ultrices dolor vitae laoreet. Maecenas venenatis maximus vestibulum. Mauris tempus lorem a ipsum consectetur rutrum. Vestibulum mollis sollicitudin lectus, sit amet fermentum ipsum accumsan vitae. Sed lobortis erat vitae malesuada vestibulum. Pellentesque at volutpat elit. Integer facilisis quis ante at lobortis. Nam id enim in justo blandit aliquet et vitae ex. Donec pharetra porta enim, sollicitudin lacinia ex. Quisque eget mi scelerisque, suscipit sem vulputate, semper urna. Fusce sit amet arcu nisl.\nSuspendisse non enim nec sapien dapibus placerat. Quisque eu varius magna. Suspendisse lacinia, libero ut sodales posuere, urna velit fringilla leo, id efficitur erat metus ut magna. Nunc feugiat diam et nunc finibus, quis porttitor lectus tristique. Aenean feugiat laoreet nibh, in eleifend diam accumsan at. Etiam et neque vel nulla molestie iaculis. Vivamus ut enim in massa eleifend fringilla a quis nunc. Sed ac maximus felis, condimentum accumsan purus. Fusce nec convallis augue, a efficitur orci. Praesent feugiat nulla vitae bibendum interdum. Ut et ligula suscipit, fringilla dui sit amet, eleifend est. Ut in nulla est.', NULL, 0, 4, 1, 3),
(3, 17, 2, '2019-05-29 03:16:37', 'Проверка создания заказа', 'Проверка создания заказа.\r\nМодератор также имеет доступ к пользовательским функциям, что позволяет производить их тестирование.', 1, 0, NULL, 1, 1);

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
-- Индексы таблицы `moder_status`
--
ALTER TABLE `moder_status`
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
-- Индексы таблицы `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `types_name_uindex` (`name`);

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
  ADD KEY `works_status_id_fk` (`status`),
  ADD KEY `works_types_id_fk` (`type`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `avatars`
--
ALTER TABLE `avatars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT для таблицы `bugreport`
--
ALTER TABLE `bugreport`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `moder_status`
--
ALTER TABLE `moder_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `support`
--
ALTER TABLE `support`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `works`
--
ALTER TABLE `works`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
