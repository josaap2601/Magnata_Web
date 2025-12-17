// Seleciona os elementos necessários
const hamburguer = document.querySelector(".hamburguer");
const container = document.querySelector(".container");

// Função para abrir/fechar o menu ao clicar no botão hambúrguer
hamburguer.addEventListener("click", () => {
    container.classList.toggle("show-menu");
});

// Função para fechar o menu ao clicar em qualquer link da barra lateral
const menuLinks = document.querySelectorAll(".menu-link");

menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        container.classList.remove("show-menu");
    });
});
