// Variáveis Base
let pontos = 0, tempoRestante = 60, lixoSelecionado = null;
let loopGerador = null, loopTempo = null, jogoRodando = false;

// Novas Variáveis de Mecânica
let combo = 0;
let emFrenesi = false;
let velGeracao = 1500; // Gera lixo a cada 1.5s
let velEsteira = 7; // Lixo demora 7s pra atravessar a tela

// Sistema de Áudio (Tente carregar, se não achar, ignora)
const somAcerto = new Audio('./audio/Acerto.mp3');
const somErro = new Audio('./audio/erro.mp3');
const musicaFundo = new Audio('./audio/musica.mp3');
musicaFundo.loop = true;
musicaFundo.volume = 0.4;

// Elementos da Tela
const spanPontos = document.getElementById('pontos');
const spanTempo = document.getElementById('tempo');
const spanCombo = document.getElementById('combo');
const alertaFrenesi = document.getElementById('frenesi-alerta');
const areaEsteira = document.getElementById('area-esteira');
const lixeiras = document.querySelectorAll('.lixeira');
const telaMenu = document.getElementById('tela-menu');

// Banco de Dados com HAZARDS (Pegadinhas)
const tiposDeLixo = [
    { tipo: 'papel', icone: '📄' }, { tipo: 'papel', icone: '📦' },
    { tipo: 'plastico', icone: '💿' }, { tipo: 'plastico', icone: '🥤' },
    { tipo: 'vidro', icone: '💡' }, { tipo: 'vidro', icone: '🫙' },
    { tipo: 'metal', icone: '🛢️' }, { tipo: 'metal', icone: '⛓️' },
    { tipo: 'organico', icone: '🍫' }, { tipo: 'organico', icone: '🍕' },
    // Pegadinhas que punem o jogador:
    { tipo: 'perigo', icone: '🐱' }, { tipo: 'perigo', icone: '☢️'}
];

function iniciarJogo() {
    pontos = 0; tempoRestante = 60; combo = 0;
    velGeracao = 1500; velEsteira = 7;
    jogoRodando = true; lixoSelecionado = null;
    quebrarCombo();
    
    // Tenta tocar a música de fundo
    musicaFundo.currentTime = 0;
    musicaFundo.play().catch(e => console.log("Áudio bloqueado pelo navegador até o primeiro clique."));

    atualizarHud();
    telaMenu.classList.remove('visivel');
    document.querySelectorAll('.residuo').forEach(el => el.remove());

    loopTempo = setInterval(contarTempo, 1000);
    loopGerador = setInterval(gerarResiduo, velGeracao);
}

// Dificuldade Progressiva no Cronômetro
function contarTempo() {
    tempoRestante--;

    // A cada 15 segundos, o jogo fica mais rápido!
    if (tempoRestante % 15 === 0 && tempoRestante < 60 && tempoRestante > 0) {
        velEsteira = Math.max(3, velEsteira - 1.5); // Aumenta a velocidade da animação CSS
        velGeracao = Math.max(600, velGeracao - 300); // Gera lixos mais rápido
        
        clearInterval(loopGerador); // Atualiza o loop gerador com a nova velocidade
        loopGerador = setInterval(gerarResiduo, velGeracao);
    }

    atualizarHud();
    if (tempoRestante <= 0) finalizarJogo();
}

function atualizarHud() {
    spanPontos.innerText = pontos;
    spanTempo.innerText = tempoRestante;
    spanCombo.innerText = combo;
}

// Gera Resíduo ou Pegadinha
function gerarResiduo() {
    if (!jogoRodando) return;

    const lixoSorteado = tiposDeLixo[Math.floor(Math.random() * tiposDeLixo.length)];
    const elementoLixo = document.createElement('div');
    
    elementoLixo.classList.add('residuo');
    elementoLixo.innerText = lixoSorteado.icone;
    elementoLixo.dataset.tipo = lixoSorteado.tipo;
    elementoLixo.style.animationDuration = `${velEsteira}s`; // Aplica a dificuldade atual

    // Clicar no lixo na esteira
    elementoLixo.addEventListener('click', function(e) {
        if (!jogoRodando) return;

        // VERIFICA SE É PEGADINHA
        if (this.dataset.tipo === 'perigo') {
            aplicarErro(e.clientX, e.clientY);
            tempoRestante -= 10; // Punição Severa: -10 segundos!
            if (tempoRestante < 0) tempoRestante = 0;
            this.innerText = '❌';
            setTimeout(() => this.remove(), 500);
            return;
        }

        if (lixoSelecionado) lixoSelecionado.classList.remove('selecionado');
        lixoSelecionado = this;
        this.classList.add('selecionado');
    });

    areaEsteira.appendChild(elementoLixo);
    setTimeout(() => { if (elementoLixo.parentNode) elementoLixo.remove(); }, velEsteira * 1000);
}

// Lógica das Lixeiras
lixeiras.forEach(lixeira => {
    lixeira.addEventListener('click', function(e) {
        if (!jogoRodando || !lixoSelecionado) return;

        if (lixoSelecionado.dataset.tipo === this.id) {
            // ACERTOU!
            somAcerto.cloneNode().play().catch(e=>{}); // cloneNode permite tocar sons em sequência rápida
            pontos += emFrenesi ? 30 : 15; // Pontos em dobro se tiver Frenesi
            combo++;
            
            if (combo >= 5) ativarFrenesi();

            this.classList.add('pulo');
            setTimeout(() => this.classList.remove('pulo'), 300);
            criarParticulas(e.clientX, e.clientY);

            lixoSelecionado.remove();
            lixoSelecionado = null;
        } else {
            // ERROU!
            aplicarErro(e.clientX, e.clientY);
            pontos -= 5;
            if (pontos < 0) pontos = 0;
            
            lixoSelecionado.classList.remove('selecionado');
            lixoSelecionado.style.backgroundColor = "#ffcccc";
            setTimeout(() => { if(lixoSelecionado) lixoSelecionado.style.backgroundColor = "white"; }, 300);
            lixoSelecionado = null;
        }
        atualizarHud();
    });
});

function aplicarErro() {
    somErro.cloneNode().play().catch(e=>{});
    quebrarCombo();
    
    // Efeito de tela piscando vermelho
    document.body.classList.add('flash-vermelho');
    setTimeout(() => document.body.classList.remove('flash-vermelho'), 300);
}

function ativarFrenesi() {
    emFrenesi = true;
    alertaFrenesi.style.display = 'inline';
    document.getElementById('game-container').classList.add('frenesi-ativo');
}

function quebrarCombo() {
    combo = 0;
    emFrenesi = false;
    alertaFrenesi.style.display = 'none';
    document.getElementById('game-container').classList.remove('frenesi-ativo');
}

// Sistema de Partículas (Estrelas)
function criarParticulas(x, y) {
    for(let i = 0; i < 4; i++) {
        const estrela = document.createElement('div');
        estrela.classList.add('particula');
        estrela.innerText = '✨';
        estrela.style.left = (x + (Math.random() * 40 - 20)) + 'px';
        estrela.style.top = (y + (Math.random() * 40 - 20)) + 'px';
        document.body.appendChild(estrela);
        setTimeout(() => estrela.remove(), 1000);
    }
}

// Capturando os novos elementos da tela de salvar
const telaSalvar = document.getElementById('tela-salvar');
const inputNome = document.getElementById('input-nome');
const btnSalvar = document.getElementById('btn-salvar');
const pontosFinaisText = document.getElementById('pontos-finais');

function finalizarJogo() {
    jogoRodando = false;
    clearInterval(loopTempo);
    clearInterval(loopGerador);
    musicaFundo.pause();

    // Em vez de usar o prompt feio, abrimos a nossa tela bonita!
    pontosFinaisText.innerText = pontos;
    telaSalvar.classList.add('visivel');
    inputNome.value = ""; // Limpa a caixinha de texto
    inputNome.focus(); // Coloca o cursor piscando lá dentro
}

// O que acontece quando o jogador clica no NOVO botão de "Salvar no Ranking"
btnSalvar.addEventListener('click', async () => {
    let nomeJogador = inputNome.value.trim();
    if (nomeJogador === "") nomeJogador = "Herói Ecológico";

    telaSalvar.classList.remove('visivel'); // Esconde a caixinha de nome

    // Mostra a tela de menu padrão com a mensagem de Salvando
    document.getElementById('titulo-menu').innerText = "Salvando... ⏳";
    document.getElementById('btn-iniciar').style.display = 'none';
    telaMenu.classList.add('visivel');

    try {
        const resposta = await fetch('http://localhost:3000/api/trashdash/ranking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: nomeJogador, pontuacao: pontos })
        });

        if (resposta.ok) {
            document.getElementById('titulo-menu').innerText = "Salvo com Sucesso! 🏆";
        } else {
            document.getElementById('titulo-menu').innerText = "Erro ao Salvar ❌";
        }
    } catch (erro) {
        console.error("Erro na comunicação com o servidor:", erro);
        document.getElementById('titulo-menu').innerText = "Servidor Offline ❌";
    }

    // Restaura a tela para permitir jogar de novo
    document.getElementById('mensagem-menu').innerHTML = `Sua pontuação foi: <strong>${pontos} pontos!</strong>`;
    document.getElementById('btn-iniciar').innerText = "Jogar Novamente";
    document.getElementById('btn-iniciar').style.display = 'block';
});

// Evento do botão de iniciar (do menu principal)
document.getElementById('btn-iniciar').addEventListener('click', iniciarJogo);