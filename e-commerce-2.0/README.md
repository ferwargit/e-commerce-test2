
---

# TechStore - E-commerce con React

 <!-- Reemplaza esta URL con una captura de pantalla real de tu proyecto -->

**TechStore** es una aplicación de comercio electrónico moderna, responsiva y completamente funcional desarrollada con React. Este proyecto demuestra la implementación de un catálogo de productos, un carrito de compras persistente, autenticación de usuarios y un panel de administración para la gestión de productos.

El objetivo principal fue construir una aplicación robusta, escalable y con una excelente experiencia de usuario, aplicando las mejores prácticas de desarrollo en el ecosistema de React.

**[Ver Demo en Vivo](https://tu-sitio.netlify.app)** <!-- Reemplaza con el enlace a tu deploy en Netlify -->

## ✨ Características Principales

-   **Catálogo de Productos Dinámico:** Carga y muestra productos desde una API externa (`mockAPI`).
-   **Diseño Responsivo:** Interfaz completamente adaptable a dispositivos móviles, tablets y de escritorio, utilizando Bootstrap 5.
-   **Carrito de Compras Persistente:** Los productos añadidos al carrito se conservan entre sesiones gracias al uso de `localStorage`.
-   **Panel de Administración Protegido:**
    -   Ruta de acceso exclusiva (`/admin/login`).
    -   Funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) para la gestión de productos.
-   **Autenticación de Usuarios y Roles:**
    -   Registro e inicio de sesión de clientes utilizando Firebase Authentication.
    -   Rol de Administrador con permisos especiales y vistas de interfaz diferenciadas.
-   **Optimización SEO:** Metadatos (título y descripción) dinámicos para cada página, mejorando la visibilidad en motores de búsqueda de forma nativa con React 19.
-   **Notificaciones Interactivas:** Uso de `SweetAlert2` y `React-Toastify` para una retroalimentación al usuario más amigable.
-   **Componentes Reutilizables:** Desarrollo basado en componentes con una fuerte separación de incumbencias, utilizando `styled-components` para un sistema de diseño consistente.

## 🛠️ Tecnologías y Librerías Utilizadas

### Frontend

-   **[React 19](https://react.dev/):** Utilizando las últimas características, incluyendo el renderizado nativo de metadatos.
-   **[Vite](https://vitejs.dev/):** Herramienta de construcción increíblemente rápida para un desarrollo ágil.
-   **[React Router](https://reactrouter.com/):** Para la gestión de rutas y navegación en esta Single Page Application (SPA).
-   **[Bootstrap 5](https://getbootstrap.com/):** Para el layout principal, la responsividad y componentes de UI base.
-   **[Styled Components](https://styled-components.com/):** Para crear componentes estilizados, reutilizables y con lógica de variantes (ej. botones `primary`, `success`, `danger`).
-   **Context API & Hooks (`useState`, `useEffect`, `useContext`, `useCallback`):** Para una gestión de estado global y lógica de componentes eficiente y moderna.
-   **[React Icons](https://react-icons.github.io/react-icons/):** Para una iconografía clara y consistente.
-   **[SweetAlert2](https://sweetalert2.github.io/):** Para alertas y modales interactivos y atractivos.
-   **[React-Toastify](https://fkhadra.github.io/react-toastify/introduction):** Para notificaciones no intrusivas.

### Backend & Servicios

-   **[Firebase Authentication](https://firebase.google.com/docs/auth):** Para la gestión de registro e inicio de sesión de usuarios.
-   **[MockAPI](https://mockapi.io/):** Utilizado como un servicio de backend simulado para el CRUD de productos, permitiendo un desarrollo rápido y desacoplado del frontend.

## 🚀 Cómo Empezar

Para ejecutar este proyecto de forma local, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Configura las variables de entorno (si es necesario):**
    Si has movido las claves de Firebase a un archivo `.env`, asegúrate de crearlo en la raíz del proyecto.
    _Nota: En este proyecto, las claves están directamente en `src/auth/firebase.js` para fines de demostración._

4.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173`.

## 🔑 Credenciales de Acceso

-   **Cliente:** Puedes registrar un nuevo usuario en la sección de "Registrarse".
-   **Administrador:**
    -   Navega a la ruta `/admin/login`.
    -   **Usuario:** `admin`
    -   **Contraseña:** `1234`

## 💡 Conceptos Clave Implementados

Este proyecto no es solo una tienda, sino una demostración de conceptos clave en el desarrollo moderno de React:

-   **Gestión de Estado Centralizada:** Uso de Context API para manejar el estado de autenticación, productos y carrito de forma global.
-   **Renderizado Condicional:** La UI se adapta dinámicamente según el rol del usuario (cliente vs. admin) y su estado de autenticación.
-   **Hooks Personalizados y `useCallback`:** Optimización del rendimiento evitando re-renderizados innecesarios.
-   **Rutas Protegidas:** Lógica para prevenir que usuarios no autorizados accedan a rutas específicas (ej. un cliente a `/admin` o un admin a `/carrito`).
-   **Manejo de Activos Locales:** Las imágenes de los productos se sirven desde la carpeta `/public` para garantizar su disponibilidad y un rendimiento óptimo en el despliegue.

## ✍️ Autor

-   **[Fernando Warno](https://github.com/ferwargit/)** - ¡Contáctame!

---

