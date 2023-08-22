document.addEventListener('DOMContentLoaded', () => {
    // Captura o botão e o contêiner de informações do personagem
    const fetchButton = document.getElementById('fetchButton');
    const characterInfoDiv = document.getElementById('characterInfo');

    // Adiciona um ouvinte de evento para o clique no botão
    fetchButton.addEventListener('click', async () => {
        // Captura o valor inserido no campo de ID do personagem
        const characterIdInput = document.getElementById('characterId');
        const characterId = characterIdInput.value;

        // Verifica se foi inserido um ID de personagem válido
        if (!characterId) {
            alert('Por favor, insira um ID de personagem válido.');
            return;
        }

        // Monta a URL da API usando o ID do personagem
        const apiUrl = `https://api.disneyapi.dev/character/${characterId}`;

        try {
            // Faz uma requisição à API usando a URL construída
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados do personagem.');
            }
            // Converte a resposta em JSON
            const jsonData = await response.json();
            // Extrai os dados relevantes do objeto "data" retornado pela API
            const characterData = jsonData.data; // Acessando o objeto "data"

            console.log('Dados do personagem:', characterData);

            // Atualiza o contêiner de informações com os detalhes do personagem
            characterInfoDiv.innerHTML = `
            <h2 class="py-4">Informações do Personagem</h2>
            <div class="character-info">
                <div class="character-image-container">
                    <img src="${characterData.imageUrl || 'Imagem não disponível'}" alt="Imagem do Personagem" class="character-image" />
                </div>
                <div class="character-details">
                    <p><strong>ID:</strong> ${characterData._id || 'ID não disponível'}</p>
                    <p><strong>Nome:</strong> ${characterData.name || 'Nome não disponível'}</p>
                    <p><strong>Filmes:</strong> ${characterData.films || 'Filmes não disponíveis'}</p>
                    <p><strong>Video Games:</strong> ${characterData.videoGames || 'Video Games não disponíveis'}</p>
                </div>
            </div>
            `;
        } catch (error) {
            // Em caso de erro, exibe uma mensagem de erro no contêiner de informações
            console.error('Erro ao buscar informações do personagem:', error);
            characterInfoDiv.innerHTML = '<p>Erro ao buscar informações do personagem.</p>';
        }
    });
});