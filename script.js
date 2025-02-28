let cliques = 0; // Contador de cliques
let saiu20 = false; // Flag para saber se o número 20 já saiu nesta rodada
let numerosSorteados = []; // Lista para armazenar os números já sorteados
let ultimoNumero = null; // Variável para armazenar o último número sorteado
let modoAleatorio = false; // Ativa quando os cliques ultrapassam 20 e aguarda sair o 20

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

    if (modoAleatorio) {
        numeroAleatorio = gerarNumeroUnico();
        if (numeroAleatorio === 20) {
            modoAleatorio = false; // Sai do modo aleatório ao sortear 20
            cliques = 0;
            numerosSorteados = [];
        }
    } else {
        if (cliques >= 20) {
            modoAleatorio = true; // Ativa o modo aleatório após 20 cliques
            numeroAleatorio = gerarNumeroUnico();
        } else {
            numeroAleatorio = gerarNumeroUnico();
            if (numeroAleatorio === 20) {
                saiu20 = true;
            }
        }
    }

    ultimoNumero = numeroAleatorio;
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
