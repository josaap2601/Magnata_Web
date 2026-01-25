
// Seletores
const hamburguer = document.querySelector(".hamburguer");
const body = document.querySelector("body");
const menuLinks = document.querySelectorAll(".menu-link");
const typingElement = document.getElementById("typing-text");
const modal = document.getElementById("projectModal");

// Menu Toggle
if (hamburguer) {
    hamburguer.addEventListener("click", () => {
        if (body) body.classList.toggle("show-menu");
    });
}

menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (body) body.classList.remove("show-menu");
    });
});

// Efeito Máquina de Escrever
const text = "Magnata Production.";
let charIndex = 0;

function typeEffect() {
    if (typingElement && charIndex < text.length) {
        typingElement.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 120);
    }
}

// Modal Logic
function openModal(img, title, desc) {
    document.getElementById("modal-img").src = img;
    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-desc").innerText = desc;
    modal.style.display = "block";
    body.style.overflow = "hidden";
}

function closeModalFunc() {
    modal.style.display = "none";
    body.style.overflow = "auto";
}

const closeModalBtn = document.querySelector(".close-modal");
if (closeModalBtn) closeModalBtn.onclick = closeModalFunc;

window.onclick = (event) => {
    if (event.target == modal) closeModalFunc();
};

// Scroll Suave
function scrollToId(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Init
window.addEventListener("DOMContentLoaded", typeEffect);
