function isLoggedIn() {
  // Verificar si el usuario ya ha iniciado sesión
  document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userEmail = localStorage.getItem("userEmail")
    // Selecciona el contenedor del header usando querySelector
    const headerContainer = document.querySelector(".headerContainer");

    // Definir la estructura del navbar HTML
    let navBarHTML = `
      <nav class="navbarContainer">
        <!--MENU HAMBURGUESA-->
        <input type="checkbox" id="menu-toggle" class="menu-toggle" />
        <label for="menu-toggle" class="bars-container">
          <span></span><span></span><span></span>
        </label>

        <!-- CONTENEDOR OPCIONES -->
        <ul class="optionsNavContainer toggle">
          <div>
            <li><a href="/">Inicio</a></li>
          </div>
          <div class="signin-container">
            <li><a href="/pages/login/login.html">Iniciar sesión</a></li>
            <li><a href="/pages/signup/signup.html">Registrarse</a></li>
          </div>
        </ul>
      </nav>`;

    // Si el usuario ha iniciado sesión, personaliza el navbar
    if (isLoggedIn === "true") {
      navBarHTML = `
        <nav class="navbarContainer">
          <input type="checkbox" id="menu-toggle" class="menu-toggle" />
          <label for="menu-toggle" class="bars-container">
            <span></span><span></span><span></span>
          </label>
          
          <ul class="optionsNavContainer toggle">
            <div>
              <li><a href="/">Inicio</a></li>
              <li><a href="/pages/my-books/mybooks.html">Mis libros</a></li>
            </div>
            <div class="signin-container">
              <li><a>${userEmail}</a></li>
              <li><a id="logoutButton" onclick="logout()">Cerrar sesión</a></div></li>
            </div>
          </ul>
        </nav>`;
    }

    // Verifica que `headerContainer` se haya seleccionado correctamente antes de modificar el contenido
    if (headerContainer) {
      headerContainer.innerHTML = navBarHTML;
    }
  });
}


isLoggedIn()


// Función de logout
window.logout = ()=> {
  console.log("no")
  // Borra todo el localStorage
  localStorage.clear();

  // Actualiza el estado de inicio de sesión
  console.log("Logout successful");
  location.reload();
  window.location.href = "/"
  alert("Has cerrado sesión exitosamente");

}

