function jokenpo() {
    
    let pontuacao = 0;
    
    let jogadas = ["Papel","Pedra","Tesoura"];

    while (true) {
        let jogadorEscolha = parseInt(prompt("Escolha sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura"));

        if (isNaN(jogadorEscolha) || jogadorEscolha < 1 || jogadorEscolha > 3) {
            console.log("Jogada inválida. Você perdeu!");
            break;
        }

        let computadorEscolha = Math.floor(Math.random() * 3) + 1;

        console.log(computadorEscolha)

        if (jogadorEscolha === computadorEscolha) {
            console.log("O computador jogou: " + jogadas[computadorEscolha-1]);         
            console.log("Empate!");
        } else if (
            (jogadorEscolha === 1 && computadorEscolha === 2) ||
            (jogadorEscolha === 2 && computadorEscolha === 3) ||
            (jogadorEscolha === 3 && computadorEscolha === 1)
        ) {
            console.log("O computador jogou: " + jogadas[computadorEscolha-1]);
            console.log("Você ganhou essa rodada!");
            pontuacao++;
        } else {
            console.log("O computador jogou: " + jogadas[computadorEscolha-1]);
            console.log("Você perdeu essa rodada. Fim de jogo!");
            break;
        }
    }
    console.log("Pontuação final: " + pontuacao);
}
jokenpo();
