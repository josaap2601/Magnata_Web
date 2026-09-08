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

// MENU HAMBÚRGUER
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

// FILTROS
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

// PLAYLIST DE VÍDEOS (AUTOPLAY SEQUENCIAL)
const playlistVideos = [
    {
        id: 'Q5U9aMsqBzo',
        titulo: 'Showreel Visual 2026',
        desc: 'Edição dinâmica, transições fluídas e color grading cinematográfico para marcas de prestígio.'
    },
    {
        id: 'goH09yHozog',
        titulo: 'Showreel Audiovisual',
        desc: 'Produção completa para campanhas publicitárias e videoclipes de alto impacto.'
    }
];

let currentVideoIndex = 0;

function abrirPlaylistIndex(index) {
    currentVideoIndex = index;
    carregarVideoModal(playlistVideos[currentVideoIndex]);
}

function carregarVideoModal(videoObj) {
    const modal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");

    if (modalTitle) modalTitle.innerText = videoObj.titulo;
    if (modalDesc) modalDesc.innerText = videoObj.desc;
    
    if (modal) {
        modal.classList.add("active-modal");
        document.body.classList.add("no-scroll");
    }

    if (ytPlayer && typeof ytPlayer.loadVideoById === 'function') {
        ytPlayer.loadVideoById(videoObj.id);
    } else {
        ytPlayer = new YT.Player('player', {
            height: '100%',
            width: '100%',
            videoId: videoObj.id,
            playerVars: { 
                'autoplay': 1, 
                'rel': 0, 
                'origin': window.location.origin 
            },
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    }
}

// PASSA AUTOMATICAMENTE AO TERMINAR
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        proximoVideo();
    }
}

function proximoVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % playlistVideos.length;
    carregarVideoModal(playlistVideos[currentVideoIndex]);
}

function videoAnterior() {
    currentVideoIndex = (currentVideoIndex - 1 + playlistVideos.length) % playlistVideos.length;
    carregarVideoModal(playlistVideos[currentVideoIndex]);
}

function closeModalFunc() {
    const modal = document.getElementById("projectModal");
    if (modal) modal.classList.remove("active-modal");
    if (ytPlayer && typeof ytPlayer.stopVideo === 'function') {
        ytPlayer.stopVideo();
    }
    document.body.classList.remove("no-scroll");
}

// MODAL DE IMAGEM
function abrirImagem(src, titulo, descricao) {
    const imgModal = document.getElementById("imageModal");
    document.getElementById("imgModalSrc").src = src;
    document.getElementById("imgModalTitle").innerText = titulo;
    document.getElementById("imgModalDesc").innerText = descricao;

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

// =========================================================
// PLAYER DE MÚSICA MP3 LOCAL / GITHUB
// =========================================================
const GITHUB_USER = 'josaap2601';
const GITHUB_REPO = 'Magnata_Web';
const GITHUB_FOLDER = 'musicas';

let playlistMp3 = [];
let mp3Index = 0;
let audioElement = null;

async function carregarMusicasDoGithub() {
    audioElement = document.getElementById("audio-element");
    if (audioElement) {
        audioElement.onended = () => nextMp3();
    }

    const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${GITHUB_FOLDER}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro na conexão");

        const files = await response.json();
        const mp3Files = files.filter(file => file.name.toLowerCase().endsWith('.mp3'));

        if (mp3Files.length > 0) {
            playlistMp3 = mp3Files.map(file => ({
                title: file.name.replace(/\.mp3$/i, ''),
                artist: "Magnata Sound",
                src: file.download_url
            }));
            loadMp3(0);
        } else {
            const el = document.getElementById("mp3-title");
            if (el) el.innerText = "Nenhuma música na pasta";
        }
    } catch (error) {
        console.error("Erro ao carregar músicas:", error);
        const el = document.getElementById("mp3-title");
        if (el) el.innerText = "Aguardando faixas...";
    }
}

function loadMp3(index) {
    if (!audioElement) audioElement = document.getElementById("audio-element");
    if (playlistMp3[index] && audioElement) {
        audioElement.src = playlistMp3[index].src;
        const title = document.getElementById("mp3-title");
        const artist = document.getElementById("mp3-artist");
        if (title) title.innerText = playlistMp3[index].title;
        if (artist) artist.innerText = playlistMp3[index].artist;
    }
}

function toggleMp3() {
    if (!audioElement) audioElement = document.getElementById("audio-element");
    const btn = document.getElementById("btn-mp3-play");

    if (!audioElement.src && playlistMp3.length > 0) loadMp3(0);

    if (audioElement.paused) {
        if (isRadioPlaying) toggleRadio();
        audioElement.play().then(() => {
            if (btn) btn.innerHTML = '<i class="fas fa-pause"></i>';
        }).catch(e => console.error("Erro ao reproduzir:", e));
    } else {
        audioElement.pause();
        if (btn) btn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function nextMp3() {
    if (playlistMp3.length === 0) return;
    mp3Index = (mp3Index + 1) % playlistMp3.length;
    loadMp3(mp3Index);
    if (audioElement) {
        audioElement.play();
        const btn = document.getElementById("btn-mp3-play");
        if (btn) btn.innerHTML = '<i class="fas fa-pause"></i>';
    }
}

function prevMp3() {
    if (playlistMp3.length === 0) return;
    mp3Index = (mp3Index - 1 + playlistMp3.length) % playlistMp3.length;
    loadMp3(mp3Index);
    if (audioElement) {
        audioElement.play();
        const btn = document.getElementById("btn-mp3-play");
        if (btn) btn.innerHTML = '<i class="fas fa-pause"></i>';
    }
}

// =========================================================
// PLAYER DA RÁDIO ONLINE
// =========================================================
let isRadioPlaying = false;
const STREAM_URL = "https://seu-servidor-de-stream.com/stream"; 

function toggleRadio() {
    const radioStream = document.getElementById("radio-stream");
    const icon = document.getElementById("radio-icon");
    const status = document.getElementById("radio-status");
    const visualizer = document.querySelector(".radio-visualizer");

    if (!radioStream) return;

    if (!isRadioPlaying) {
        radioStream.src = STREAM_URL;
        radioStream.play().then(() => {
            isRadioPlaying = true;
            if (icon) icon.className = "fas fa-stop";
            if (status) status.innerText = "Sintonizado - Transmissão Magnata";
            if (visualizer) visualizer.classList.add("playing");
            
            if (audioElement && !audioElement.paused) toggleMp3();
        }).catch(() => {
            if (status) status.innerText = "Erro ao conectar com a rádio";
        });
    } else {
        radioStream.pause();
        radioStream.src = "";
        isRadioPlaying = false;
        if (icon) icon.className = "fas fa-play";
        if (status) status.innerText = "Transmissão Pausada";
        if (visualizer) visualizer.classList.remove("playing");
    }
}

// REVEAL ANIMAÇÃO
function checkReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const triggerBottom = window.innerHeight - 50;

    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < triggerBottom) el.classList.add('active');
    });
}

window.addEventListener("DOMContentLoaded", () => {
    typeEffect();
    checkReveal();
    carregarMusicasDoGithub();
});

window.addEventListener("scroll", checkReveal);