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

// PLAYLIST DE VÍDEOS DE PROJETOS
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
// PLAYER DE MÚSICA MP3 (BUSCA DO GITHUB)
// =========================================================
const GITHUB_USER = 'josaap2601';
const GITHUB_REPO = 'Magnata_Web';
const GITHUB_FOLDER = 'musicas';

let playlistMp3 = [];
let mp3Index = 0;
let audioElement = document.getElementById("audio-element");

async function carregarMusicasDoGithub() {
    if (!audioElement) audioElement = document.getElementById("audio-element");
    if (audioElement) {
        audioElement.onended = () => nextMp3();
    }

    const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${GITHUB_FOLDER}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro de conexão com o GitHub");

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
            if (el) el.innerText = "Nenhuma música encontrada";
        }
    } catch (error) {
        console.error("Erro ao carregar músicas:", error);
        const el = document.getElementById("mp3-title");
        if (el) el.innerText = "Selecione uma música";
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

    if (!audioElement.src && playlistMp3.length > 0) {
        loadMp3(mp3Index);
    }

    if (audioElement.paused) {
        if (isRadioPlaying) toggleRadio();
        audioElement.play().then(() => {
            if (btn) btn.innerHTML = '<i class="fas fa-pause"></i>';
        }).catch(e => console.error("Erro ao dar play:", e));
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
// PLAYER DA RÁDIO WEB (MANIA CIDADE)
// =========================================================
const RADIO_API = "https://nossa-radio.base44.app/api/apps/6a527b7903ea3715e14184a8/entities/Musicas?q=" +
    encodeURIComponent(JSON.stringify({ radio_id: "6ad5adb47b11d30c91160ee1" }));

const RADIO_FALLBACK = [
    {
        src: "https://media.base44.com/files/public/6a527b7903ea3715e14184a8/2a46df076_Akon_-_Right_Now_Na_Na_Na_Official_Video_OPUS_256kbps.opus",
        titulo: "Right Now (Na Na Na)",
        artista: "Akon"
    }
];

let isRadioPlaying = false;
let radioFila = [];
let radioIndex = 0;

function pegarCampo(obj, chaves) {
    for (const k of chaves) if (obj && obj[k]) return obj[k];
    return "";
}

function normalizarMusica(m) {
    return {
        src: pegarCampo(m, ["file_url", "audio_url", "url", "arquivo", "src", "link"]),
        titulo: pegarCampo(m, ["titulo", "title", "nome", "name", "musica"]) || "Música",
        artista: pegarCampo(m, ["artista", "artist", "cantor", "autor"]) || "Mania Cidade"
    };
}

async function carregarRadio() {
    const lista = document.getElementById("radio-schedule-list");
    try {
        const res = await fetch(RADIO_API);
        if (!res.ok) throw new Error(res.status);
        const dados = await res.json();
        const itens = Array.isArray(dados) ? dados : (dados.items || dados.data || []);
        radioFila = itens.map(normalizarMusica).filter(m => m.src);
        for (let i = radioFila.length - 1; i > 0; i--) {
            const r = Math.floor(Math.random() * (i + 1));
            [radioFila[i], radioFila[r]] = [radioFila[r], radioFila[i]];
        }
        if (!radioFila.length) throw new Error("vazio");
        atualizarProgramacao();
    } catch (e) {
        console.error("Erro ao carregar rádio, usando lista local:", e);
        radioFila = RADIO_FALLBACK.slice();
        atualizarProgramacao();
    }
}

function atualizarProgramacao() {
    const lista = document.getElementById("radio-schedule-list");
    const status = document.getElementById("radio-status");
    const artista = document.getElementById("radio-artist");
    const atual = radioFila[radioIndex];
    if (status && atual && isRadioPlaying) status.innerText = atual.titulo;
    if (artista && atual && isRadioPlaying) artista.innerText = atual.artista;
    if (!lista) return;
    lista.innerHTML = "";
    for (let i = 0; i < Math.min(radioFila.length, 6); i++) {
        const m = radioFila[(radioIndex + i) % radioFila.length];
        const li = document.createElement("li");
        li.textContent = (i === 0 ? "▶ " : "") + m.titulo + " - " + m.artista;
        if (i === 0) li.className = "atual";
        lista.appendChild(li);
    }
}

function tocarFaixaRadio() {
    const audio = document.getElementById("radio-stream");
    if (!audio || !radioFila.length) return Promise.reject();
    audio.src = radioFila[radioIndex].src;
    atualizarProgramacao();
    return audio.play();
}

function proximaFaixaRadio() {
    radioIndex = (radioIndex + 1) % radioFila.length;
    tocarFaixaRadio().catch(proximaFaixaRadio);
}

async function toggleRadio() {
    const audio = document.getElementById("radio-stream");
    const icon = document.getElementById("radio-icon");
    const status = document.getElementById("radio-status");
    const artista = document.getElementById("radio-artist");
    const visualizer = document.querySelector(".radio-visualizer");
    if (!audio) return;

    if (isRadioPlaying) {
        audio.pause();
        isRadioPlaying = false;
        if (icon) icon.className = "fas fa-play";
        if (status) status.innerText = "Mania Cidade";
        if (artista) artista.innerText = "Transmissão pausada";
        if (visualizer) visualizer.classList.remove("playing");
        return;
    }

    if (!radioFila.length) await carregarRadio();
    if (audioElement && !audioElement.paused) toggleMp3();

    audio.onended = proximaFaixaRadio;
    isRadioPlaying = true;
    tocarFaixaRadio().then(() => {
        if (icon) icon.className = "fas fa-pause";
        if (visualizer) visualizer.classList.add("playing");
        atualizarProgramacao();
    }).catch(() => {
        isRadioPlaying = false;
        if (status) status.innerText = "Erro ao conectar à rádio";
    });
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
    carregarRadio();
});

window.addEventListener("scroll", checkReveal);