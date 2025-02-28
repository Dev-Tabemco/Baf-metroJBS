let cliques = 0; // Contador de cliques
let saiu20 = false; // Flag para saber se o número 20 já saiu nesta rodada

document.getElementById('btnAleatorizar').addEventListener('click', function() {
    cliques++;
    let numeroAleatorio;

    // Se for o 20º clique e ainda não saiu o 20, forçamos ele
    if (cliques >= 20 || saiu20 == true ) {
        numeroAleatorio = 20;
        saiu20 = false; // Marca que já saiu
        cliques = 0; // Reseta a contagem para nova rodada
    } else {
        numeroAleatorio = Math.floor(Math.random() * 20) + 1;
        if (numeroAleatorio === 20 ) {
            saiu20 = true; // Marca que o 20 já saiu
        }
    }

    const resultadoDiv = document.getElementById('resultado');
    const alarme = document.getElementById('alarme');

    if (numeroAleatorio === 20 ) {
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