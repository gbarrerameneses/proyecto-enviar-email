document.addEventListener("DOMContentLoaded", function () {
  const email = {
    email: "",
    asunto: "",
    mensaje: "",
  };

  //   // console.log(email);

  // Seleccionar los elementos de la interfaz
  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector("#spinner");

  // Asignar eventos
  inputEmail.addEventListener("blur", validarFormulario);
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
    // // console.log(e.target.id);
    // // console.log(e.target.parentElement.nextElementSibling);
    if (e.target.value === "") {
      // pasamos dos parámetros mensaje, referencia
      mostrarAlerta(
        `El campo ${e.target.id} es obligatorio`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }
    // // console.log('Después del if');

    // Validación email
    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta("El email no es válido", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    limpiarAlerta(e.target.parentElement);
    // // console.log(e.target.value);

    // Asignar los valores
    email[e.target.name] = e.target.value.trim().toLowerCase();
    // //   console.log(email);

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

  // Comprobación de Email para habilitar bottun Enviar
  function comprobarEmail() {
    // // console.log(email);
    // // console.log(Object.values(email).includes(''));
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
      return;
    }
    // // else {
    // //   btnSubmit.classList.remove("opacity-50");
    // //   btnSubmit.disabled = false;
    // // }
    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
  }

  // Resetea el formulario, se hizo una función porque se utiliza en dos partes así como limpiarAlerta()
  function resetFormulario() {
    // reiniciar el objeto email
    email.email = "";
    email.asunto = "";
    email.mensaje = "";

    formulario.reset();
    comprobarEmail();
  }
});
