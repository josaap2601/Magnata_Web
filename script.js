// Menu Toggle
const hamburguer = document.querySelector(".hamburguer");
const container = document.querySelector("body");

hamburguer.addEventListener("click", () => {
    container.classList.toggle("show-menu");
});

// Typing Effect
const text = "Magnata Production.";
const typingElement = document.getElementById("typing-text");
let i = 0;

function type() {
    if (i < text.length) {
        typingElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 150);
    }
}
window.onload = type;

// Modal Logic
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");

function openModal(img, title, desc) {
    modal.style.display = "block";
    modalImg.src = img;
    modalTitle.innerHTML = title;
    modalDesc.innerHTML = desc;
}

document.querySelector(".close-modal").onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }

// Smooth Scroll
function scrollToId(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}
