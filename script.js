let cliques = 0;
let bafometroCooldown = 0; // controla o bloqueio após positivo
let ultimoBafometro = 0;  // clique do último positivo

document.getElementById('btnAleatorizar').addEventListener('click', function () {
    cliques++;
    let numeroAleatorio;

    // Quantos cliques desde o último bafômetro
    const cliquesDesdeUltimo = cliques - ultimoBafometro;

    // Verifica se o bafômetro pode ser ativado
    if (
        bafometroCooldown === 0 &&
        (
            Math.random() < 1 / 4 ||     // chance normal
            cliquesDesdeUltimo >= 15     // garantia máxima agora é 15
        )
    ) {
        // Ativadores: 1 ou 10
        numeroAleatorio = Math.random() < 0.5 ? 1 : 10;

        ultimoBafometro = cliques;

        // Após um positivo, bloqueia por 5 números
        bafometroCooldown = 5;

    } else {
        // Números liberados: 2 a 9
        numeroAleatorio = Math.floor(Math.random() * 8) + 2;
    }

    // Atualiza o cooldown
    if (bafometroCooldown > 0) {
        bafometroCooldown--;
    }

    // Interface
    const resultadoDiv = document.getElementById('resultado');
    const alarme = document.getElementById('alarme');

    if (numeroAleatorio === 1 || numeroAleatorio === 10) {
        resultadoDiv.innerHTML =
            `<span class="alerta">Resultado: ${numeroAleatorio} 🚨 - TESTE DO BAFÔMETRO OBRIGATÓRIO! 🚨</span>`;

        alarme.pause();
        alarme.currentTime = 0;
        alarme.play().catch(error => {
            console.error("Erro ao reproduzir o som:", error);
        });
    } else {
        resultadoDiv.innerHTML =
            `<span class="liberado">Resultado: ${numeroAleatorio} ✅ - LIBERADO</span>`;
    }

    // Debug detalhado
    console.log(
        `Clique: ${cliques}, Número: ${numeroAleatorio}, ` +
        `Desde último positivo: ${cliquesDesdeUltimo}, ` +
        `Cooldown restante: ${bafometroCooldown}`
    );
});
