const hamburguer = document.querySelector(".hamburguer");
const container = document.querySelector(".container");
const sidebar = document.querySelector(".sidebar");

// Abre ao clicar
hamburguer.addEventListener("click", () => {
    container.classList.toggle("show-menu");
});

// Abre ao passar o mouse no ícone
hamburguer.addEventListener("mouseenter", () => {
    container.classList.add("show-menu");
});

// Fecha ao tirar o mouse da barra lateral
sidebar.addEventListener("mouseleave", () => {
    container.classList.remove("show-menu");
});

// Fecha ao clicar em um link
document.querySelectorAll(".menu-link").forEach(link => {
    link.addEventListener("click", () => {
        container.classList.remove("show-menu");
    });
});
