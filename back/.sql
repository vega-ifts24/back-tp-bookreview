-- BOOKS
CREATE TABLE `book-review`.books (
	id BIGINT UNSIGNED auto_increment NOT NULL,
	title varchar(255) NOT NULL,
	coverLink TEXT NULL,
	author varchar(255) NULL,
	gender varchar(255) NULL,
	CONSTRAINT books_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci
COMMENT='Base de datos de libros para visualizar en el front de la web. A su vez, la posibilidad de crear, editar y eliminar libros.';

-- REVIEWS
CREATE TABLE `reviews` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `bookId` bigint unsigned NOT NULL,
  `userId` bigint unsigned NOT NULL,
  `description` text,
  `rating` float DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `archived` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Base de datos de reseñas para visualizar en el front de la web. A su vez, la posibilidad de crear, editar y eliminar reseñas. Se asocia a un libro y un usuario';

-- USERS
-- `book-review`.users definition
CREATE TABLE `users` (
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `birth_date` date NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Base de datos de usuarios para su logueo. Se puede visualizar, crear, editar, eliminar el usuario.';