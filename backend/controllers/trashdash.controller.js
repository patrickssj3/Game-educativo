import fs from 'fs';
import path from 'path';

// Caminho para o seu banco de dados
const dbPath = path.resolve('database.json');

export function salvarRanking(req, res) {
    const { nome, pontuacao } = req.body;

    // 1. Lê o arquivo database.json atual
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: "Erro ao ler o banco de dados." });

        let db = {};
        if (data) {
            db = JSON.parse(data);
        }

        // 2. Garante que existe uma lista para o TrashDash
        if (!db.trashdashRanking) {
            db.trashdashRanking = [];
        }

        // 3. Adiciona a nova jogada
        db.trashdashRanking.push({
            nome: nome || "Jogador Anônimo",
            pontuacao: pontuacao,
            data: new Date().toISOString()
        });

        // 4. Salva as informações de volta no arquivo JSON
        fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
            if (err) return res.status(500).json({ message: "Erro ao salvar no banco de dados." });
            
            res.status(201).json({ 
                message: "Pontuação salva com sucesso!", 
                pontuacao: pontuacao 
            });
        });
    });
}
// Função para buscar e ordenar o ranking
export function obterRanking(req, res) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: "Erro ao ler o banco de dados." });

        let db = {};
        if (data) {
            db = JSON.parse(data);
        }

        let ranking = db.trashdashRanking || [];

        // Ordena a lista de pontos (do maior para o menor)
        ranking.sort((a, b) => b.pontuacao - a.pontuacao);

        // Pega apenas os 10 melhores (Top 10)
        const top10 = ranking.slice(0, 10);

        // Envia a lista pronta para o frontend
        res.status(200).json(top10);
    });
}