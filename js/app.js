document.addEventListener("DOMContentLoaded", function () {
  const email = {
    email: "",
    cc: "", // Reto
    asunto: "",
    mensaje: "",
  };

  // Seleccionar los elementos de la interfaz
  const inputEmail = document.querySelector("#email");
  const inputCc = document.querySelector("#cc"); // Reto
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector("#spinner");

  // Asignar eventos
  inputEmail.addEventListener("blur", validarFormulario);
  inputCc.addEventListener("input", validarFormulario); // Reto
  inputAsunto.addEventListener("blur", validarFormulario);
  inputMensaje.addEventListener("blur", validarFormulario);
  formulario.addEventListener("submit", enviarEmail);
  btnReset.addEventListener("click", function (e) {
    e.preventDefault();

    resetFormulario();
  });

  // spinner
  function enviarEmail(e) {
    e.preventDefault();

    spinner.classList.add("flex");
    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.remove("flex");
      spinner.classList.add("hidden");

      resetFormulario();

      // Crear una alerta
      const alertaExito = document.createElement("P");
      alertaExito.classList.add(
        "bg-green-500",
        "text-white",
        "p-2",
        "text-center",
        "rounded-lg",
        "mt-10",
        "font-bold",
        "text-sm",
        "uppercase"
      );
      alertaExito.textContent = "Mensaje enviado correctamente";

      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 3000);
  }

  // Validar el formulario
  function validarFormulario(e) {
    let contenidoInput = e.target.value; // selecionamos el vlor del elemento.
    const eventId = e.target.id; // selecionamos el id del elemento.
    const elementoPadre = e.target.parentElement; // selecionamos el padre del elemento.
    const elementoName = e.target.name; // selecionamos el name del elemento.

    if (contenidoInput.trim() === "" && eventId !== "cc") {
      /// .trim(), elimina los espacios en blanco
      mostrarAlerta(`El correo de ${eventId} es invalido`, elementoPadre);
      email[elementoName] = "";
      comprobarEmail();
      return;
    }

    // Validación - Alerta Campo Obligatorio
    if (contenidoInput === "") {
      // pasamos dos parámetros mensaje, referencia
      mostrarAlerta(`El campo ${eventId} es obligatorio`, elementoPadre);
      email[elementoName] = "";
      comprobarEmail();
      return;
    }

    if (eventId === "cc" && !validarEmail(contenidoInput)) {
      mostrarAlerta("El email no es valido", elementoPadre);
      email[elementoName] = "";
      comprobarEmail();
      return;
    }

    limpiarAlerta(elementoPadre);

    // Asignar los valores
    email[elementoName] = contenidoInput.trim().toLowerCase();

    comprobarEmail();
  }

  // Alerta
  function mostrarAlerta(mensaje, referencia) {
    // Comprueba si ya existe una alerta
    limpiarAlerta(referencia);

    // Generar alerta en HTML
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "text-center", "p-2");

    // Inyectar error al formulario
    referencia.appendChild(error);

    // Remplaza todos los campos y agrega el error
    // formulario.innerHTML = error.innerHTML;
  }

  // Limpiar Alerta, se hizo una función porque se utiliza en dos partes, en Alerta y validarFormulario
  function limpiarAlerta(referencia) {
    // Comprueba si ya existe una alerta
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  // Validación email regex
  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    // // console.log(resultado);
    return resultado;
  }

  // Comprobación de Email para habilitar botton Enviar
  function comprobarEmail() {
    const camposObligatorios = ["email", "asunto", "mensaje"];
    const camposLlenos = camposObligatorios.every((field) => email[field].trim() !== "");

    if (camposLlenos || email.cc.trim() !== "") {
      btnSubmit.classList.remove("opacity-50");
      btnSubmit.disabled = false;
    } else {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
    }
  }

  // Resetea el formulario, se hizo una función porque se utiliza en dos partes así como limpiarAlerta()
  function resetFormulario() {
    // reiniciar el objeto email
    email.email = "";
    email.cc = ""; // Reto
    email.asunto = "";
    email.mensaje = "";

    formulario.reset();
    comprobarEmail();
  }
});
