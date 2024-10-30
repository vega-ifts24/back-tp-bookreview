// Función de login
function login(event) {
  // Evita la recarga de la página al enviar el formulario
  event.preventDefault();

  // Obtiene los valores de los campos de entrada
  const userEmail = document.getElementById("userEmail").value;
  const userPass = document.getElementById("userPass").value;

  // Verifica si los campos coinciden con el valor esperado (por ejemplo, prueba con un correo y contraseña específicos)
  if (userEmail === "natalia@gmail.com" && userPass === "123456") {
    console.log("Login successful");

    // Guardar los datos de inicio de sesión en localStorage
    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("isLoggedIn", true);
    location.reload();
    window.location.href = "/pages/my-books/mybooks.html"

    alert("Inicio de sesión exitoso");
    
    return true;
  } else {
    console.log("Login failed");

    // Mostrar mensajes de error
    const emailMessage = document.getElementById("emailMessage");
    const passwordMessage = document.getElementById("passwordMessage");
    emailMessage.textContent = userEmail ? "" : "El correo es obligatorio.";
    passwordMessage.textContent = userPass ? "" : "La contraseña es obligatoria.";

    // Borrar datos de inicio de sesión en localStorage (si existen)
    localStorage.removeItem("userEmail");
    localStorage.setItem("isLoggedIn", false);
    location.reload();

    return false;
  }
}



// Asocia el evento de envío del formulario a la función login
const form = document.getElementById("loginForm");
form.addEventListener("submit", login);
