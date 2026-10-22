const API_URL = "http://127.0.0.1:5000/api";

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
    alert("Llena todos los campos.");
    return;
  }

  fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario: u, clave: p })
  })
  .then(res => res.json())
  .then(datos => {
    if (datos.error) {
      alert(datos.error);
    } else {
      document.getElementById("txt-usuario").innerText = u;
      document.getElementById("txt-rol").innerText = datos.rol;
      volverAlMenu();
    }
  })
  .catch(error => alert("Error de conexión."));
}

function guardarRegistro() {
  let u = document.getElementById("reg-user").value.trim();
  let p = document.getElementById("reg-pass").value;
  let r = document.getElementById("reg-rol").value;

  if (u === "" || p === "") {
    alert("Debes llenar todos los campos.");
    return;
  }

  fetch(`${API_URL}/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario: u, clave: p, rol: r })
  })
  .then(res => res.json())
  .then(datos => {
    if (datos.error) {
      alert(datos.error);
    } else {
      alert("¡Registro exitoso!");
      document.getElementById("log-user").value = u;
      document.getElementById("log-pass").value = p;
      irALogin();
    }
  })
  .catch(error => alert("Error de conexión."));
}

function recuperarClave(e) {
  e.preventDefault();
  let u = prompt("Ingrese su nombre de usuario:");
  if (!u) return;

  fetch(`${API_URL}/recuperar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario: u })
  })
  .then(res => res.json())
  .then(datos => {
    if (datos.error) {
      alert("Usuario no encontrado.");
    } else {
      alert("Hola " + u + ", tu clave es: " + datos.clave);
      document.getElementById("log-user").value = u;
      document.getElementById("log-pass").value = datos.clave;
    }
  })
  .catch(error => alert("Error de conexión."));
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

function enviarCalculoAlBackend(modulo, datos) {
  let payload = {
    modulo: modulo,
    fecha: new Date().toLocaleString(),
    datos: datos
  };

  fetch(`${API_URL}/guardar-calculo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(res => {
    actualizarPantalla(modulo, res.resultados);
  })
  .catch(err => console.log("Error al calcular"));
}

function actualizarPantalla(modulo, res) {
  if (modulo === "Muro") {
    document.getElementById("muro-badge").innerText = res.superficie.toFixed(2) + " m²";
    document.getElementById("muro-res-cemento").innerText = res.cemento.toFixed(1) + " kg";
    document.getElementById("muro-res-arena").innerText = res.arena.toFixed(2) + " m³";
    document.getElementById("muro-res-ladrillos").innerText = Math.round(res.ladrillos) + " unds";
  }
  
  if (modulo === "Viga") {
    document.getElementById("viga-badge").innerText = document.getElementById("viga-largo").value + " m lineales";
    document.getElementById("viga-res-cemento").innerText = res.cemento.toFixed(2) + " kg";
    document.getElementById("viga-res-arena").innerText = res.arena.toFixed(2) + " m³";
    document.getElementById("viga-res-piedra").innerText = res.piedra.toFixed(2) + " m²";
    document.getElementById("viga-res-h8").innerText = res.h8.toFixed(2) + " m";
    document.getElementById("viga-res-h4").innerText = res.h4.toFixed(2) + " m";
  }
  
  if (modulo === "Columna") {
    document.getElementById("columna-badge").innerText = document.getElementById("columna-largo").value + " m lineales";
    document.getElementById("columna-res-cemento").innerText = res.cemento.toFixed(2) + " kg";
    document.getElementById("columna-res-arena").innerText = res.arena.toFixed(3) + " m³";
    document.getElementById("columna-res-piedra").innerText = res.piedra.toFixed(3) + " m²";
    document.getElementById("columna-res-h10").innerText = res.h10.toFixed(2) + " m";
    document.getElementById("columna-res-h4").innerText = res.h4.toFixed(2) + " m";
  }
  
  if (modulo === "Contrapiso") {
    document.getElementById("contrapiso-badge").innerText = "Volumen: " + res.volumen.toFixed(2) + " m³";
    document.getElementById("contrapiso-res-cemento").innerText = res.cemento.toFixed(2) + " kg";
    document.getElementById("contrapiso-res-arena").innerText = res.arena.toFixed(2) + " m³";
    document.getElementById("contrapiso-res-piedra").innerText = res.piedra.toFixed(2) + " m³";
  }
  
  if (modulo === "Techo") {
    document.getElementById("techo-badge").innerText = "Superficie: " + res.superficie.toFixed(2) + " m²";
    document.getElementById("techo-res-cemento").innerText = res.cemento.toFixed(2) + " kg";
    document.getElementById("techo-res-arena").innerText = res.arena.toFixed(2) + " m³";
    document.getElementById("techo-res-piedra").innerText = res.piedra.toFixed(2) + " m³";
    document.getElementById("techo-res-h8").innerText = res.h8.toFixed(2) + " m";
    document.getElementById("techo-res-h6").innerText = res.h6.toFixed(2) + " m";
  }
  
  if (modulo === "Pisos") {
    document.getElementById("pisos-badge").innerText = "Superficie Neta: " + res.superficie.toFixed(2) + " m²";
    document.getElementById("pisos-res-total").innerText = res.total.toFixed(2) + " m²";
    document.getElementById("pisos-res-extra").innerText = res.recortes.toFixed(2) + " m²";
  }
  
  if (modulo === "Pintura") {
    document.getElementById("pintura-res-litros").innerText = "Pintura Necesaria: " + res.litros.toFixed(2) + " Litros";
  }
}

function calcularMuro() {
  let radios = document.getElementsByName("esp-muro");
  let espesor = "20";
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) espesor = radios[i].value;
  }
  
  enviarCalculoAlBackend("Muro", {
    espesor: espesor,
    largo: parseFloat(document.getElementById("muro-largo").value),
    alto: parseFloat(document.getElementById("muro-alto").value)
  });
}

function calcularViga() {
  enviarCalculoAlBackend("Viga", {
    largo: parseFloat(document.getElementById("viga-largo").value)
  });
}

function calcularColumna() {
  enviarCalculoAlBackend("Columna", {
    largo: parseFloat(document.getElementById("columna-largo").value)
  });
}

function calcularContrapiso() {
  enviarCalculoAlBackend("Contrapiso", {
    espesor: parseFloat(document.getElementById("contrapiso-esp").value),
    ancho: parseFloat(document.getElementById("contrapiso-ancho").value),
    largo: parseFloat(document.getElementById("contrapiso-largo").value)
  });
}

function calcularTecho() {
  enviarCalculoAlBackend("Techo", {
    espesor: parseFloat(document.getElementById("techo-esp").value),
    ancho: parseFloat(document.getElementById("techo-ancho").value),
    largo: parseFloat(document.getElementById("techo-largo").value)
  });
}

function calcularPisos() {
  enviarCalculoAlBackend("Pisos", {
    ancho: parseFloat(document.getElementById("pisos-ancho").value),
    largo: parseFloat(document.getElementById("pisos-largo").value)
  });
}

function calcularPintura() {
  enviarCalculoAlBackend("Pintura", {
    superficie: parseFloat(document.getElementById("pintura-sup").value)
  });
}

function cambiarEspesor() {
  let radios = document.getElementsByName("esp-muro");
  let cajas = document.querySelectorAll(".radios-espesor .radio");
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      cajas[i].classList.add("marcado");
    } else {
      cajas[i].classList.remove("marcado");
    }
  }
  calcularMuro();
}