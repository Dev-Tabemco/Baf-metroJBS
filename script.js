let cliques = 0; // Contador de cliques
let saiu20 = false; // Flag para saber se o número 20 já saiu nesta rodada
let numerosSorteados = []; // Lista para armazenar os números já sorteados
let ultimoNumero = null; // Variável para armazenar o último número sorteado

function gerarNumeroUnico() {
    let numero;
    let numerosPossiveis = Array.from({ length: 20 }, (_, i) => i + 1).filter(n => 
        !numerosSorteados.includes(n) && !(n === 20 && ultimoNumero === 20) // Evita dois 20 seguidos
    );

    if (numerosPossiveis.length === 0) {
        numerosSorteados = []; // Reinicia a lista quando todos os números forem usados
        return gerarNumeroUnico();
    }

    let indice = Math.floor(Math.random() * numerosPossiveis.length);
    numero = numerosPossiveis[indice];

    numerosSorteados.push(numero);
    return numero;
}

document.getElementById('btnAleatorizar').addEventListener('click', function() {
    cliques++;
    let numeroAleatorio;

    // Se for o 20º clique e ainda não saiu o 20, forçamos ele
    if (cliques >= 20 || saiu20) {
        if (ultimoNumero === 20) {
            numeroAleatorio = gerarNumeroUnico(); // Garante que o próximo não seja 20
        } else {
            numeroAleatorio = 20;
            saiu20 = false; // Marca que já saiu
            cliques = 0; // Reseta a contagem para nova rodada
            numerosSorteados = []; // Reinicia a lista de números sorteados
        }
    } else {
        numeroAleatorio = gerarNumeroUnico();
        if (numeroAleatorio === 20) {
            saiu20 = true; // Marca que o 20 já saiu
        }
    }

    ultimoNumero = numeroAleatorio; // Atualiza o último número sorteado
    const resultadoDiv = document.getElementById('resultado');
    const alarme = document.getElementById('alarme');

    if (numeroAleatorio === 20) {
        resultadoDiv.innerHTML = `<span class="alerta">Resultado: ${numeroAleatorio} 🚨 - TESTE DO BAFÔMETRO OBRIGATÓRIO! 🚨</span>`;
        
        // Toca o alarme
        alarme.pause();
        alarme.currentTime = 0;
        alarme.play().catch(error => {
            console.error("Erro ao reproduzir o som:", error);
        });
    } else {
        resultadoDiv.innerHTML = `<span class="liberado">Resultado: ${numeroAleatorio} ✅ - LIBERADO</span>`;
    }
});
