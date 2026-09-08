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
if (btnMenu) {
    btnMenu.onclick = () => document.body.classList.toggle("show-menu");
}

function handleNav(id) {
    document.body.classList.remove("show-menu");
    scrollToId(id);
}

function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) {
        window.scrollTo({ 
            top: el.offsetTop - 80, 
            behavior: 'smooth' 
        });
    }
}

// FILTROS DE PROJETOS
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.onclick = () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        document.querySelectorAll('.card').forEach(card => {
            if (filter === 'all' || card.classList.contains(filter)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    };
});

// ABRIR E FECHAR MODAL DE VÍDEO
function abrirVideo(id, titulo, descricao) {
    const modal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");

    if (modalTitle) modalTitle.innerText = titulo;
    if (modalDesc) modalDesc.innerText = descricao;
    
    if (modal) {
        modal.classList.add("active-modal");
        document.body.classList.add("no-scroll");
    }

    if (ytPlayer && typeof ytPlayer.loadVideoById === 'function') {
        ytPlayer.loadVideoById(id);
    } else {
        ytPlayer = new YT.Player('player', {
            height: '100%',
            width: '100%',
            videoId: id,
            playerVars: { 
                'autoplay': 1, 
                'rel': 0, 
                'origin': window.location.origin 
            },
        });
    }
}

function closeModalFunc() {
    const modal = document.getElementById("projectModal");
    if (modal) modal.classList.remove("active-modal");
    if (ytPlayer && typeof ytPlayer.stopVideo === 'function') {
        ytPlayer.stopVideo();
    }
    document.body.classList.remove("no-scroll");
}

// ABRIR E FECHAR MODAL DE IMAGEM
function abrirImagem(src, titulo, descricao) {
    const imgModal = document.getElementById("imageModal");
    const imgModalSrc = document.getElementById("imgModalSrc");
    const imgModalTitle = document.getElementById("imgModalTitle");
    const imgModalDesc = document.getElementById("imgModalDesc");

    if (imgModalSrc) imgModalSrc.src = src;
    if (imgModalTitle) imgModalTitle.innerText = titulo;
    if (imgModalDesc) imgModalDesc.innerText = descricao;

    if (imgModal) {
        imgModal.classList.add("active-modal");
        document.body.classList.add("no-scroll");
    }
}

function closeImageModal() {
    const imgModal = document.getElementById("imageModal");
    if (imgModal) imgModal.classList.remove("active-modal");
    document.body.classList.remove("no-scroll");
}

// FECHAR MODAL AO CLICAR FORA
window.onclick = (e) => {
    const projectModal = document.getElementById("projectModal");
    const imageModal = document.getElementById("imageModal");

    if (e.target === projectModal) closeModalFunc();
    if (e.target === imageModal) closeImageModal();
};

// ANIMAÇÃO REVEAL
function checkReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const triggerBottom = window.innerHeight - 50;

    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < triggerBottom) {
            el.classList.add('active');
        }
    });
}

// INICIALIZAÇÃO
window.addEventListener("DOMContentLoaded", () => {
    typeEffect();
    checkReveal();
});

window.addEventListener("scroll", checkReveal);