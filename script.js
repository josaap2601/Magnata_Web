// Seleção dos elementos do DOM
const hamburguer = document.querySelector(".hamburguer");
const container = document.querySelector(".container");
const sidebar = document.querySelector(".sidebar");

/**
 * 1. Alternar Menu (Click)
 * Adiciona ou remove a classe 'show-menu' ao clicar no ícone.
 */
hamburguer.addEventListener("click", () => {
    container.classList.toggle("show-menu");
});

/**
 * 2. Abrir ao passar o mouse (Hover)
 * Abre o menu lateral assim que o mouse entra na área do botão.
 */
hamburguer.addEventListener("mouseenter", () => {
    container.classList.add("show-menu");
});

/**
 * 3. Fechar ao sair com o mouse
 * Quando o mouse sai da sidebar, ela fecha sozinha para não atrapalhar a visão.
 */
sidebar.addEventListener("mouseleave", () => {
    container.classList.remove("show-menu");
});

/**
 * 4. Fechar ao clicar em um link
 * Como o site usa links internos (#), precisamos fechar o menu 
 * manualmente após o clique para que o usuário veja o conteúdo.
 */
document.querySelectorAll(".menu-link").forEach(link => {
    link.addEventListener("click", () => {
        container.classList.remove("show-menu");
    });
});
