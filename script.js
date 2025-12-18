const hamburguer = document.querySelector(".hamburguer");
const container = document.querySelector(".container");
const menuLinks = document.querySelectorAll(".menu-link");
const typingElement = document.getElementById("typing-text");

// 1. Abrir/Fechar Menu
hamburguer.addEventListener("click", () => {
    container.classList.toggle("show-menu");
});

// 2. Fechar ao clicar no link e Scroll Suave
menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        container.classList.remove("show-menu");
    });
});

// 3. Efeito Máquina de Escrever
const text = "Magnata Production & Front End Designer";
let index = 0;

function typeWriter() {
    if (index < text.length) {
        typingElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100); // Velocidade da digitação
    }
}

// Inicia o efeito quando a página carrega
window.onload = typeWriter;

// 4. Envio de Formulário (Simulação)
const form = document.querySelector(".contact-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Obrigado! Sua mensagem foi enviada com sucesso.");
    form.reset();
});
