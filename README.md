# BuildCalc

Calculadora de materiales de construcción con sistema de login, registro de usuarios, backend en Python y persistencia de datos en JSON.

## Descripción

BuildCalc es una aplicación web Fullstack desarrollada como proyecto práctico para la asignatura de Diseño de Interfaces. Permite a un usuario registrarse, iniciar sesión y acceder a un panel con módulos de cálculo de materiales. La lógica matemática y el almacenamiento de datos se manejan en el backend, usando el patrón de arquitectura Cliente-Servidor.

## Módulos disponibles

- Muro de Ladrillo
- Viga de Hormigón
- Columnas de Hormigón
- Contrapisos
- Techo
- Pisos
- Pintura

## Tecnologías usadas

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Python (Flask)
- **Base de datos:** JSON

## Estructura del proyecto

```text
buildcalc/
├── index.html
├── style.css
├── script.js
├── app.py
└── README.md
```

## Cómo ejecutar el proyecto

1. Descarga o clona el repositorio.
2. Instala las dependencias de Python:
   ```
   pip install flask flask-cors
   ```
3. Ejecuta el servidor backend:
   ```
   python app.py
   ```
4. Abre el archivo index.html en tu navegador.
5. Regístrate, inicia sesión y comienza a calcular.

## Autores

- David Santiago Ortiz Rincon
- Michel Dayana Rodríguez

## Institución

Fundación Escuela Tecnológica de Neiva - FET
Ingeniería de Software - Grupo 6