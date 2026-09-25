let usuarios = [];

function ocultarTodo() {
  document.getElementById("vista-login").classList.add("oculto");
  document.getElementById("vista-registro").classList.add("oculto");
  document.getElementById("contenedor-modulos").classList.add("oculto");
  document.getElementById("modulo-dashboard").classList.add("oculto");
  document.getElementById("modulo-muro").classList.add("oculto");
  document.getElementById("modulo-viga").classList.add("oculto");
  document.getElementById("modulo-columna").classList.add("oculto");
  document.getElementById("modulo-contrapiso").classList.add("oculto");
  document.getElementById("modulo-techo").classList.add("oculto");
  document.getElementById("modulo-pisos").classList.add("oculto");
  document.getElementById("modulo-pintura").classList.add("oculto");
}

function irARegistro() {
  ocultarTodo();
  document.getElementById("header-app").classList.add("oculto");
  document.getElementById("vista-registro").classList.remove("oculto");
}

function irALogin() {
  ocultarTodo();
  document.getElementById("header-app").classList.add("oculto");
  document.getElementById("vista-login").classList.remove("oculto");
}

function volverAlMenu() {
  ocultarTodo();
  document.getElementById("header-app").classList.remove("oculto");
  document.getElementById("contenedor-modulos").classList.remove("oculto");
  document.getElementById("modulo-dashboard").classList.remove("oculto");
}

function iniciarSesion() {
  let u = document.getElementById("log-user").value.trim();
  let p = document.getElementById("log-pass").value;

  if (u === "" || p === "") {
    alert("Por favor ingresa tu usuario y contraseña.");
    return;
  }

  let usuarioEncontrado = null;
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].user.toLowerCase() === u.toLowerCase() && usuarios[i].pass === p) {
      usuarioEncontrado = usuarios[i];
      break;
    }
  }

  if (usuarioEncontrado) {
    document.getElementById("txt-usuario").innerText = usuarioEncontrado.user;
    document.getElementById("txt-rol").innerText = usuarioEncontrado.rol;
    volverAlMenu();
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
}

function guardarRegistro() {
  let u = document.getElementById("reg-user").value.trim();
  let p = document.getElementById("reg-pass").value;
  let r = document.getElementById("reg-rol").value;

  if (u === "" || p === "") {
    alert("Debes llenar todos los campos.");
    return;
  }

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].user.toLowerCase() === u.toLowerCase()) {
      alert("Este nombre de usuario ya está registrado.");
      return;
    }
  }

  usuarios.push({ user: u, pass: p, rol: r });

  alert("¡Registro exitoso! Ya puedes iniciar sesión.");

  document.getElementById("log-user").value = u;
  document.getElementById("log-pass").value = p;
  document.getElementById("log-rol").value = r;

  irALogin();
}

function recuperarClave(e) {
  e.preventDefault();
  let u = prompt("Ingrese su nombre de usuario registrado:");
  if (!u) return;

  let usuarioEncontrado = null;
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].user.toLowerCase() === u.trim().toLowerCase()) {
      usuarioEncontrado = usuarios[i];
      break;
    }
  }

  if (usuarioEncontrado) {
    alert("Hola " + usuarioEncontrado.user + ", tu contraseña registrada es: " + usuarioEncontrado.pass);
    document.getElementById("log-user").value = usuarioEncontrado.user;
    document.getElementById("log-pass").value = usuarioEncontrado.pass;
  } else {
    alert("El usuario '" + u + "' no se encuentra registrado en el sistema.");
  }
}

function cerrarSesion() {
  document.getElementById("log-user").value = "";
  document.getElementById("log-pass").value = "";
  irALogin();
}

function mostrarCalculo(nombreModulo) {
  ocultarTodo();
  document.getElementById("header-app").classList.remove("oculto");
  document.getElementById("contenedor-modulos").classList.remove("oculto");
  document.getElementById("modulo-" + nombreModulo).classList.remove("oculto");
}