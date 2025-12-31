let cliques = 0;
let bafometroCooldown = 0; // Contador para evitar repetição nos próximos 15 números
let ultimoBafometro = 0; // Guarda o último clique em que o bafômetro foi ativado

document.getElementById('btnAleatorizar').addEventListener('click', function() {
    cliques++;
    let numeroAleatorio;

    // Verifica se o bafômetro pode ser ativado
    if (bafometroCooldown === 0 && Math.random() < 1 / 20) {
        numeroAleatorio = 20; // Ativa o bafômetro
        ultimoBafometro = cliques; // Registra o clique em que o bafômetro foi ativado
        bafometroCooldown = 2; // Inicia o cooldown de 2 números

    } else {
        // Gera um número aleatório entre 1 e 19 (20 está bloqueado durante o cooldown)
        numeroAleatorio = Math.floor(Math.random() * 19) + 1;
    }



    // Atualiza o cooldown
    if (bafometroCooldown > 0) {
        bafometroCooldown--;
    }

    // Exibe o resultado na interface
    const resultadoDiv = document.getElementById('resultado');
    const alarme = document.getElementById('alarme');

    if (numeroAleatorio === 20) {
        resultadoDiv.innerHTML = `<span class="alerta">Resultado: ${numeroAleatorio} 🚨 - TESTE DO BAFÔMETRO OBRIGATÓRIO! 🚨</span>`;

        alarme.pause();

        alarme.currentTime = 0;
        alarme.play().catch(error => {
            console.error("Erro ao reproduzir o som:", error);
        });
    } else {
        resultadoDiv.innerHTML = `<span class="liberado">Resultado: ${numeroAleatorio} ✅ - LIBERADO</span>`;
    }

    // Debug: Exibe o estado das variáveis no console
    console.log(`Clique: ${cliques}, Número: ${numeroAleatorio}, Cooldown: ${bafometroCooldown}`);
});