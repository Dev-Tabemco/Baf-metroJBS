let cliques = 0;
let bafometroCooldown = 0;
let ultimoBafometro = 0;

document.getElementById('btnAleatorizar').addEventListener('click', function() {
    cliques++;
    let numeroAleatorio;

    // Verifica se o bafômetro pode ser ativado
    if (bafometroCooldown === 0 && Math.random() < 1 / 20) {
        numeroAleatorio = Math.random() < 0.5 ? 19 : 20; // 19 ou 20
        ultimoBafometro = cliques;
        bafometroCooldown = 1;

    } else {
        // Gera número de 1 a 18
        numeroAleatorio = Math.floor(Math.random() * 18) + 1;
    }

    // Atualiza o cooldown
    if (bafometroCooldown > 0) {
        bafometroCooldown--;
    }

    const resultadoDiv = document.getElementById('resultado');
    const alarme = document.getElementById('alarme');

    if (numeroAleatorio === 19 || numeroAleatorio === 20) {
        resultadoDiv.innerHTML = `<span class="alerta">Resultado: ${numeroAleatorio} 🚨 - TESTE DO BAFÔMETRO OBRIGATÓRIO! 🚨</span>`;

        alarme.pause();
        alarme.currentTime = 0;
        alarme.play().catch(error => {
            console.error("Erro ao reproduzir o som:", error);
        });
    } else {
        resultadoDiv.innerHTML = `<span class="liberado">Resultado: ${numeroAleatorio} ✅ - LIBERADO</span>`;
    }

    console.log(`Clique: ${cliques}, Número: ${numeroAleatorio}, Cooldown: ${bafometroCooldown}`);
});
