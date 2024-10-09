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
