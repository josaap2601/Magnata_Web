const hamburguer = document.querySelector(".hamburguer");
const container = document.querySelector(".container");
const sidebar = document.querySelector(".sidebar");
const menuLinks = document.querySelectorAll(".menu-link");

// 1. Abre/Fecha ao clicar
hamburguer.addEventListener("click", () => {
    container.classList.toggle("show-menu");
});

// 2. Abre ao passar o mouse por cima do botão
hamburguer.addEventListener("mouseenter", () => {
    container.classList.add("show-menu");
});

// 3. Fecha ao tirar o mouse da área do menu lateral
sidebar.addEventListener("mouseleave", () => {
    container.classList.remove("show-menu");
});

// 4. Fecha ao clicar em um link (importante para navegação)
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        container.classList.remove("show-menu");
    });
});
