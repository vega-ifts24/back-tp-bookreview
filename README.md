
# 📚 Book Reviews Website
https://bookreview-ifts24.vercel.app/

Este proyecto es una página de recomendaciones y reseñas de libros, desarrollada con JavaScript Vanilla, HTML y CSS. Los usuarios pueden iniciar sesión, leer reseñas de libros y dejar sus propias reseñas. El objetivo de la aplicación es compartir opiniones y calificaciones sobre libros de una manera intuitiva y visualmente atractiva.

## 🚀 Características

- **Inicio de sesión**: El usuario puede iniciar sesión con las siguientes credenciales:
  - **Email**: natalia@gmail.com
  - **Contraseña**: 123456

- **Formulario de reseñas**: Los usuarios pueden dejar una reseña para un libro con las siguientes opciones:
  - **Título del libro**: Campo de texto para ingresar el nombre del libro.
  - **Autor del libro**: Campo de texto para ingresar el nombre del autor.
  - **Comentario**: Campo de texto donde el usuario escribe su opinión sobre el libro.
  - **Calificación**: Sistema de calificación con estrellas (de 1 a 5), donde el usuario selecciona el número de estrellas que representa su valoración general del libro.

- **Reseñas visibles**: Todas las reseñas se muestran en la página de manera organizada, permitiendo a los usuarios leer las opiniones de otros usuarios.

- **Funciones JavaScript**:
  - **Inicio de sesión**: Valida que el correo y la contraseña sean correctos. Si el inicio de sesión es exitoso, guarda los datos en el `localStorage` y permite al usuario acceder a la sección de reseñas.
  - **Deslogueo**: Función que borra todo el `localStorage` y cierra la sesión del usuario.
  - **Creación de reseñas**: Añade la reseña a la lista de reseñas visibles y permite interactuar con la calificación en estrellas.
  - **Validación de formulario**: Se valida que todos los campos obligatorios estén llenos antes de enviar la reseña.
  - **Sistema de calificación con estrellas**: Permite seleccionar la calificación del libro, y se muestra visualmente a través de un sistema de estrellas. La cantidad de estrellas seleccionadas representa la calificación (por ejemplo, seleccionar la estrella 5 indica una calificación de 5/5).

## 📝 Estructura del Proyecto

La estructura básica del proyecto es la siguiente:

```
├── index.html       # Página principal con el formulario de reseñas y la visualización de reseñas existentes.
├── styles.css       # Archivo de estilos CSS para darle formato y diseño a la aplicación.
├── script.js        # Archivo JavaScript que contiene toda la lógica de la aplicación (login, logout, reseñas, etc.).
└── README.md        # Descripción del proyecto.
```

## 🗝️ Instrucciones para iniciar sesión

Para acceder a las funcionalidades de la página, sigue los siguientes pasos:

1. **Inicia sesión** con el siguiente correo y contraseña:
   - **Email**: natalia@gmail.com
   - **Contraseña**: 123456
2. Una vez que hayas iniciado sesión, podrás acceder al formulario para agregar reseñas de libros y leer las reseñas de otros usuarios.

## 📋 Funcionalidades del Formulario de Reseñas

El formulario de reseñas permite al usuario registrar su opinión sobre un libro de la siguiente manera:

1. **Título del libro**: Campo obligatorio para ingresar el nombre del libro.
2. **Autor del libro**: Campo obligatorio para ingresar el nombre del autor.
3. **Comentario**: Campo para que el usuario escriba sus opiniones sobre el libro.
4. **Sistema de calificación con estrellas**:
   - El sistema de calificación permite seleccionar de 1 a 5 estrellas.
   - La calificación seleccionada se guarda como un número en el sistema, reflejando el puntaje total de la reseña.
5. **Botón de enviar reseña**:
   - Al hacer clic en este botón, la reseña se guarda y se muestra automáticamente en la lista de reseñas de la página.

## 🖥️ Tecnologías Utilizadas

- **JavaScript Vanilla**: Para manejar la lógica de la aplicación.
- **HTML**: Para la estructura de la página.
- **CSS**: Para darle estilo a la página.

## 🔗 Enlace de la Página (opcional)

Si la página está desplegada, puedes agregar un enlace aquí:
https://bookreview-ifts24.vercel.app/
