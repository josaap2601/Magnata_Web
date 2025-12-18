// Seleção dos elementos do DOM
const hamburguer = document.querySelector(".hamburguer");
const container = document.querySelector(".container");
const sidebar = document.querySelector(".sidebar");
const menuLinks = document.querySelectorAll(".menu-link");

/**
 * Alternar Menu via Click
 */
hamburguer.addEventListener("click", () => {
    container.classList.toggle("show-menu");
});

/**
 * Fechar ao clicar em um link
 */
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        container.classList.remove("show-menu");
    });
});

/**
 * Fechar ao clicar fora da sidebar (opcional, melhora UX)
 */
window.addEventListener("click", (e) => {
    if (container.classList.contains("show-menu") && 
        !sidebar.contains(e.target) && 
        !hamburguer.contains(e.target)) {
        container.classList.remove("show-menu");
    }
});

// Efeito de scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
