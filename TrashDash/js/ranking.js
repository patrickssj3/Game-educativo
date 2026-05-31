const tabelaCorpo = document.getElementById('tabela-corpo');

async function carregarRanking() {
    try {
        // Pede os dados para a sua API
        const resposta = await fetch('http://localhost:3000/api/trashdash/ranking');
        
        if (!resposta.ok) {
            throw new Error("Erro ao buscar dados");
        }

        const topJogadores = await resposta.json();
        
        // Limpa o texto de "Carregando..."
        tabelaCorpo.innerHTML = "";

        if (topJogadores.length === 0) {
            tabelaCorpo.innerHTML = "<tr><td colspan='3'>Ninguém jogou ainda. Seja o primeiro!</td></tr>";
            return;
        }

        // Passa por cada jogador e cria uma linha na tabela
        topJogadores.forEach((jogador, index) => {
            const linha = document.createElement('tr');
            
            // Define os estilos especiais para os 3 primeiros colocados (Medalhas)
            let classePosicao = "";
            let iconePosicao = `${index + 1}º`;
            
            if (index === 0) { classePosicao = "top-1"; iconePosicao = "🥇 1º"; }
            else if (index === 1) { classePosicao = "top-2"; iconePosicao = "🥈 2º"; }
            else if (index === 2) { classePosicao = "top-3"; iconePosicao = "🥉 3º"; }

            linha.innerHTML = `
                <td class="${classePosicao}">${iconePosicao}</td>
                <td class="${classePosicao}">${jogador.nome}</td>
                <td class="${classePosicao}">${jogador.pontuacao} pts</td>
            `;

            tabelaCorpo.appendChild(linha);
        });

    } catch (erro) {
        console.error(erro);
        tabelaCorpo.innerHTML = "<tr><td colspan='3' style='color: #ef4444;'>Erro ao conectar com o servidor. ❌</td></tr>";
    }
}

// Executa a função assim que a página carrega
carregarRanking();