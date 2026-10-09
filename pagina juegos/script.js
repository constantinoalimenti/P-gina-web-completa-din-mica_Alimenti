const botonMenu = document.getElementById("botonMenu");
const menu = document.getElementById("menu");
const enlacesMenu = menu.querySelectorAll("a");

function abrirCerrarMenu() {
    const abierto = menu.classList.toggle("abierto");
    botonMenu.setAttribute("aria-expanded", abierto);
    botonMenu.setAttribute("aria-label", abierto ? "Cerrar menu" : "Abrir menu");
}

function cerrarMenu() {
    menu.classList.remove("abierto");
    botonMenu.setAttribute("aria-expanded", "false");
    botonMenu.setAttribute("aria-label", "Abrir menu");
}

botonMenu.addEventListener("click", abrirCerrarMenu);

enlacesMenu.forEach(function (enlace) {
    enlace.addEventListener("click", cerrarMenu);
});

window.addEventListener("resize", function () {
    if (window.innerWidth >= 900) {
        cerrarMenu();
    }
});

const campoBusqueda = document.getElementById("campoBusqueda");
const tarjetas = document.querySelectorAll("#grilla .tarjeta");
const sinResultados = document.getElementById("sinResultados");

function normalizar(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function filtrarTarjetas() {
    const busqueda = normalizar(campoBusqueda.value);
    let visibles = 0;

    tarjetas.forEach(function (tarjeta) {
        const coincide = normalizar(tarjeta.textContent).includes(busqueda);
        tarjeta.style.display = coincide ? "" : "none";
        if (coincide) {
            visibles++;
        }
    });

    sinResultados.hidden = visibles !== 0;
}

campoBusqueda.addEventListener("input", filtrarTarjetas);

const botonCopiar = document.getElementById("botonCopiar");
const usuarioDiscord = document.getElementById("usuarioDiscord");
const avisoCopiado = document.getElementById("avisoCopiado");

botonCopiar.addEventListener("click", function () {
    const usuario = usuarioDiscord.textContent;

    navigator.clipboard.writeText(usuario).then(function () {
        avisoCopiado.textContent = "Usuario copiado: " + usuario;
    }).catch(function () {
        avisoCopiado.textContent = "No se pudo copiar, anotalo a mano: " + usuario;
    });
});

document.getElementById("anio").textContent = new Date().getFullYear();

const imagenes = document.querySelectorAll(".tarjeta__imagen");
const extensiones = ["jpg", "jpeg", "png", "webp", "svg"];

imagenes.forEach(function (imagen) {
    imagen.dataset.intento = "0";

    imagen.addEventListener("error", function () {
        const siguiente = Number(imagen.dataset.intento) + 1;

        if (siguiente < extensiones.length) {
            imagen.dataset.intento = String(siguiente);
            imagen.src = "img/" + imagen.dataset.nombre + "." + extensiones[siguiente];
        }
    });
});
