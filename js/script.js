let ytPlayer;

// EFEITO DE DIGITAÇÃO
const text = "Magnata Production.";
let charIndex = 0;
function typeEffect() {
    const el = document.getElementById("typing-text");
    if (el && charIndex < text.length) {
        el.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 120);
    }
}

// MENU HAMBURGUER
const btnMenu = document.getElementById("btn-menu");
btnMenu.onclick = () => document.body.classList.toggle("show-menu");

function handleNav(id) {
    document.body.classList.remove("show-menu");
    scrollToId(id);
}

function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
}

// FILTROS
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.onclick = () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('hidden');
            if (filter === 'all' || card.classList.contains(filter)) card.classList.remove('hidden');
        });
    };
});

// FUNÇÃO DE VÍDEO VIA API (CORRIGE ERRO LOCAL)
function abrirVideo(id, titulo, descricao) {
    document.getElementById("modal-title").innerText = titulo;
    document.getElementById("modal-desc").innerText = descricao;
    document.getElementById("projectModal").style.display = "block";
    document.body.classList.add("no-scroll");

    if (ytPlayer) {
        ytPlayer.loadVideoById(id);
    } else {
        ytPlayer = new YT.Player('player', {
            height: '100%',
            width: '100%',
            videoId: id,
            playerVars: { 'autoplay': 1, 'rel': 0, 'origin': window.location.origin },
        });
    }
}

function closeModalFunc() {
    document.getElementById("projectModal").style.display = "none";
    if (ytPlayer) ytPlayer.stopVideo();
    document.body.classList.remove("no-scroll");
}

window.onload = typeEffect;
window.onscroll = () => {
    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add('active');
    });
};