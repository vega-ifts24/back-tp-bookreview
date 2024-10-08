import books from "./books.js";
// Función para mostrar libros en la página
function displayBooks() {
    const gallery = document.getElementById('book-gallery');
    let bookHTML = '';

    // Recorre el array de libros y crea elementos HTML para cada libro
    books.forEach(book => {
        bookHTML += `<button class="book" >
        <img src="${book.imageSrc}" class="book-cover"/>
      </button>`;
    });

    // Agrega todos los contenedores de libros al contenedor principal de una sola vez
    gallery.innerHTML = bookHTML;
}

displayBooks()