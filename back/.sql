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



-- `book-review`.reviews definition

-- `book-review`.reviews definition

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