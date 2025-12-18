// Controle do Menu Hamburguer
const hamburguer = document.querySelector(".hamburguer");
const body = document.querySelector("body");
const menuLinks = document.querySelectorAll(".menu-link");

hamburguer.addEventListener("click", () => {
    body.classList.toggle("show-menu");
});

// Fecha o menu ao clicar em qualquer link
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        body.classList.remove("show-menu");
    });
});

// Efeito Máquina de Escrever
const text = "Magnata Production.";
const typingElement = document.getElementById("typing-text");
let charIndex = 0;

function typeEffect() {
    if (charIndex < text.length) {
        typingElement.innerHTML += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 120);
    }
}

// Inicia a digitação após carregar
window.addEventListener("DOMContentLoaded", typeEffect);

// Lógica do Modal de Projetos
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const closeModal = document.querySelector(".close-modal");

function openModal(img, title, desc) {
    modal.style.display = "block";
    modalImg.src = img;
    modalTitle.innerText = title;
    modalDesc.innerText = desc;
    body.style.overflow = "hidden"; // Trava o scroll do fundo
}

closeModal.onclick = () => {
    modal.style.display = "none";
    body.style.overflow = "auto";
};

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
        body.style.overflow = "auto";
    }
};

// Função de Scroll Suave para botões
function scrollToId(id) {
    const element = document.getElementById(id);
    if(element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
