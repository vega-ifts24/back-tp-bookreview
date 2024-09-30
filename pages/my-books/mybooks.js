import books from "../../utils/constants/books.js";

// Variables y elementos del DOM
const bookCover = document.querySelector(".book-cover");
const bookTitle = document.querySelector(".book-data h4");
const bookAuthor = document.querySelector(".book-data p");
const searchResultsContainer = document.getElementById("searchResults");
const searchInput = document.getElementById("searchBook");
const form = document.getElementById("review-form");

// Variable para almacenar el libro seleccionado
let selectedBook = null;

// Función para buscar libros
function findABook(param) {
    searchResultsContainer.style.display = "block";

    if (param.length < 3) {
        searchResultsContainer.innerHTML = `
      <div style="display:flex; align-items:center; gap:4px;padding: 10px; border-bottom: 1px solid #ccc; cursor: pointer;" >
      <p style="font-size:12px;">Escribí más de 3 caracteres</p>
      </div>`;
        return;
    }

    // Filtra los libros que coinciden con el parámetro de búsqueda (título o autor)
    const bookResults = books.filter(
        (item) =>
            item.title.toLowerCase().includes(param.toLowerCase()) ||
            item.autor.toLowerCase().includes(param.toLowerCase())
    );

    // Actualiza la vista con los resultados encontrados
    updateSearchResults(bookResults);
}

// Función para actualizar los resultados de búsqueda
function updateSearchResults(results) {
    const resultsHTML = results
        .map(
            (book) => `
      <div style="display:flex; align-items:center; gap:4px;padding: 10px; border-bottom: 1px solid #ccc; cursor: pointer;" onclick="selectBook('${book.title}')">
        <img src="${book.imageSrc}" style="width:25px; height: 60px; object-fit: cover"/>
        <p style="font-size:12px;">${book.title} - ${book.autor}</p>
      </div>`
        )
        .join("");

    // Si hay resultados, muestra el contenedor y agrega el HTML, de lo contrario se oculta
    if (results.length > 0) {
        searchResultsContainer.innerHTML = resultsHTML;
    } else {
        searchResultsContainer.innerHTML = `
      <div style="display:flex; align-items:center; gap:4px;padding: 10px; border-bottom: 1px solid #ccc; cursor: pointer;">
        <p style="font-size:12px;">No se encontraron resultados.</p>
      </div>`;
    }
}

// Función para seleccionar un libro del desplegable
window.selectBook = (title) => {
    selectedBook = books.find((book) => book.title === title);
    updateBookData(selectedBook);
    searchResultsContainer.style.display = "none";
    searchInput.value = selectedBook.title;
};

// Función para actualizar la información del libro seleccionado
function updateBookData(book) {
    if (book) {
        bookCover.src = book.imageSrc;
        bookCover.alt = book.title;
        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.autor;
    } else {
        bookCover.src = "";
        bookCover.alt = "No se encontró el libro";
        bookTitle.textContent = "No se encontró el libro";
        bookAuthor.textContent = "";
    }
}

// Asocia la función de búsqueda al campo de entrada
searchInput.addEventListener("input", (event) => {
    const searchValue = event.target.value.trim();
    findABook(searchValue);
});

// Función para generar un ID único
function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// // Función para enviar la reseña y almacenarla en localStorage
// function postReview(event) {
//     // Evita la recarga de la página al enviar el formulario
//     event.preventDefault();

//     if (!selectedBook) {
//         alert("Selecciona un libro antes de publicar una reseña.");
//         return;
//     }

//     // Obtener los valores del formulario
//     const rating = document.querySelectorAll(".star:checked").length;
//     const comment = document.getElementById("comment").value.trim();
//     const startDate = document.getElementById("start-date").value;
//     const endDate = document.getElementById("end-date").value;

//     // Validar que se haya completado al menos el campo de comentario
//     if (!comment) {
//         alert("El comentario no puede estar vacío.");
//         return;
//     }

//     // Crear un nuevo objeto de reseña
//     const newReview = {
//         reviewId: generateUniqueId(),
//         bookId: selectedBook.id,
//         rating: rating,
//         comment: comment,
//         startDate: startDate,
//         endDate: endDate,
//     };

//     // Obtener las reseñas almacenadas en localStorage (o crear un array vacío si no existen)
//     const reviews = JSON.parse(localStorage.getItem("bookReviews")) || [];

//     // Agregar la nueva reseña al array de reseñas
//     reviews.push(newReview);

//     // Guardar el array actualizado en localStorage
//     localStorage.setItem("bookReviews", JSON.stringify(reviews));

//     // Mostrar mensaje de éxito y limpiar el formulario
//     alert("Reseña publicada con éxito.");
//     form.reset();
//     updateBookData(null); // Restablecer la información del libro seleccionado
//     selectedBook = null;
//     searchInput.value = ""; // Limpiar el campo de búsqueda
//     searchResultsContainer.style.display = "none";
// }

// Asocia el evento de envío del formulario a la función postReview
form.addEventListener("submit", postReview);


// Función para eliminar una reseña
window.deleteReview = (reviewId) => {
    let reviews = JSON.parse(localStorage.getItem("bookReviews")) || [];

    // Filtra las reseñas para excluir la que se desea eliminar
    reviews = reviews.filter((review) => review.reviewId !== reviewId);

    // Guarda el array actualizado en localStorage y vuelve a renderizar la lista
    localStorage.setItem("bookReviews", JSON.stringify(reviews));
    displayStoredBooks();
}

// Función para editar una reseña
window.editReview = (reviewId) => {
    const reviews = JSON.parse(localStorage.getItem("bookReviews")) || [];
    const reviewToEdit = reviews.find((review) => review.reviewId === reviewId);

    if (reviewToEdit) {
        console.log(books.filter(
            (item) => reviewToEdit.bookId === item.id))
        // Actualiza el formulario con la información de la reseña seleccionada
        selectBook(books.filter(
            (item) => reviewToEdit.bookId === item.id)[0].title)
        document.getElementById("comment").value = reviewToEdit.comment;
        document.getElementById("start-date").value = reviewToEdit.startDate;
        document.getElementById("end-date").value = reviewToEdit.endDate;

        // Marca las estrellas según el puntaje actual
        document.querySelectorAll(".star").forEach((star, index) => {
            star.checked = index < reviewToEdit.rating;
        });

        // Selecciona el libro correspondiente
        selectedBook = books.find((book) => book.id === reviewToEdit.bookId);

        // Almacena el ID de la reseña editada para actualizarla al enviar el formulario
        form.dataset.editingReviewId = reviewId;
    }
}

// Función para generar el HTML de la puntuación en estrellas
function generateStarRating(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        starsHTML += `<span class="starReview ${i <= rating ? 'filled' : ''}">★</span>`;
    }
    return starsHTML;
}

// Función para mostrar los libros reseñados desde localStorage en el artículo galleryBooks
function displayStoredBooks() {
    const galleryBooks = document.querySelector(".galleryBooks");
    const reviews = JSON.parse(localStorage.getItem("bookReviews")) || [];

    if (reviews.length === 0) {
        galleryBooks.innerHTML = `<p>No has reseñado ningún libro aún.</p>`;
        return;
    }

    const booksHTML = reviews
        .map((review) => {
            const bookData = books.find((book) => book.id === review.bookId);

            return `
                <div class="book-review-container">
                    <img src="${bookData.imageSrc}" class="book-cover" alt="Portada de ${bookData.title}" />
                    <div class="book-data-review">
                        <h4>${bookData.title}</h4>
                        <div class="starsReview">
                            ${generateStarRating(review.rating)}
                        </div>
                        <p><strong>Comentario:</strong> ${review.comment}</p>
                        <p><strong>Fecha de inicio:</strong> ${review.startDate}</p>
                        <p><strong>Fecha de fin:</strong> ${review.endDate}</p>
                       
                    </div>
                    <div class="actions-container">
                        <button class="edit-review" onclick="editReview('${review.reviewId}')"><i class="ph ph-pencil-simple"></i></button>
                        <button class="delete-review" onclick="deleteReview('${review.reviewId}')"><i class="ph ph-trash"></i></button>
                    </div>
                </div>`;
        })
        .join("");

    galleryBooks.innerHTML = booksHTML;
}

// Modificar la función de envío de reseña para incluir la edición
function postReview(event) {
    event.preventDefault();

    if (!selectedBook) {
        alert("Selecciona un libro antes de publicar una reseña.");
        return;
    }

    const rating = document.querySelectorAll(".star");
    const comment = document.getElementById("comment").value.trim();
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;

    let highestRating = 0; // Inicializamos la variable para almacenar el rating más alto

    rating.forEach((item) => {
        if (item.checked) {
            // Obtenemos el id de la estrella seleccionada
            const starId = item.id; // Por ejemplo, "star1", "star2", etc.
            console.log(starId)
            const starValue = parseInt(starId.replace('star', '')); // Extraemos el número del id
            highestRating = Math.max(highestRating, starValue); // Actualizamos el rating más alto
        }
    });

    if (!comment) {
        alert("El comentario no puede estar vacío.");
        return;
    }

    const newReview = {
        reviewId: form.dataset.editingReviewId || generateUniqueId(),
        bookId: selectedBook.id,
        rating: highestRating,
        comment: comment,
        startDate: startDate,
        endDate: endDate,
    };

    let reviews = JSON.parse(localStorage.getItem("bookReviews")) || [];

    if (form.dataset.editingReviewId) {
        // Actualiza la reseña existente
        reviews = reviews.map((review) => review.reviewId === newReview.reviewId ? newReview : review);
        form.dataset.editingReviewId = ""; // Resetea el ID de edición
    } else {
        reviews.push(newReview);
    }

    localStorage.setItem("bookReviews", JSON.stringify(reviews));

    alert("Reseña publicada con éxito.");
    form.reset();
    updateBookData(null);
    selectedBook = null;
    searchInput.value = "";
    searchResultsContainer.style.display = "none";
    displayStoredBooks();
}


// Llamar a la función para mostrar los libros al cargar la página
document.addEventListener("DOMContentLoaded", displayStoredBooks);
