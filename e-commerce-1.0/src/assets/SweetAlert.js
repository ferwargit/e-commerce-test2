import Swal from "sweetalert2";

export function dispararSweetBasico(titulo, text, icon, textoBoton) {
  Swal.fire({
    title: titulo || "¡Éxito!",
    text: text || "",
    icon: icon || "success",
    confirmButtonText: textoBoton || "Aceptar",
  });
}
