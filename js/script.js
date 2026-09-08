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
        modal.style.display = "block";
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
    if (modal) modal.style.display = "none";
    if (ytPlayer && typeof ytPlayer.stopVideo === 'function') {
        ytPlayer.stopVideo();
    }
    document.body.classList.remove("no-scroll");
}

// FECHAR MODAL AO CLICAR FORA DA CAIXA
window.onclick = (e) => {
    const modal = document.getElementById("projectModal");
    if (e.target === modal) {
        closeModalFunc();
    }
};

// ANIMAÇÃO REVEAL AO ROLAR A PÁGINA
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