let cliques = 0;
let numerosSorteados = [];
let bafometroCooldown = 0; // Contador para evitar repetição nos últimos 10 números
let ultimoBafometro = 0; // Guarda a última posição do bafômetro

function gerarNumeroUnico() {
    let numero;
    let numerosPossiveis = Array.from({ length: 20 }, (_, i) => i + 1);
    
    let indice = Math.floor(Math.random() * numerosPossiveis.length);
    numero = numerosPossiveis[indice];
    
    return numero;
}

document.getElementById('btnAleatorizar').addEventListener('click', function() {
    cliques++;
    let numeroAleatorio = gerarNumeroUnico();
    
    // Define chance de acionamento aleatório do bafômetro, mantendo a proporção de 1 para 30
    let chanceBafometro = Math.random() < 1 / 35;
    
    // Garante que o bafômetro saia no máximo a cada 30 cliques e não se repita nos últimos 10 números
    if ((cliques - ultimoBafometro >= 35) || (chanceBafometro && bafometroCooldown === 0)) {
        numeroAleatorio = 20;
        ultimoBafometro = cliques;
        bafometroCooldown = 15; // Impede que o 20 saia nos próximos 10 números
    } else if (bafometroCooldown > 0 && numeroAleatorio === 20) {
        while (numeroAleatorio === 20) {
            numeroAleatorio = gerarNumeroUnico(); // Evita repetição do bafômetro em curto prazo
        }
    }
    
    if (bafometroCooldown > 0) {
        bafometroCooldown--;
    }
    
    numerosSorteados.push(numeroAleatorio);
    if (numerosSorteados.length > 30) {
        numerosSorteados.shift(); // Mantém apenas os últimos 30 números
    }

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
});