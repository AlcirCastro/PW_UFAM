function jokenpoSimples() {
    let jogadorPontos = 0;

    while (true) {
        let jogadorEscolha = parseInt(prompt("Escolha sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura"));

        if (isNaN(jogadorEscolha) || jogadorEscolha < 1 || jogadorEscolha > 3) {
            alert("Jogada inválida. Você perdeu!");
            break;
        }

        let computadorEscolha = Math.floor(Math.random() * 3) + 1;

        if (jogadorEscolha === computadorEscolha) {
            alert("Empate!");
        } else if (
            (jogadorEscolha === 1 && computadorEscolha === 2) ||
            (jogadorEscolha === 2 && computadorEscolha === 3) ||
            (jogadorEscolha === 3 && computadorEscolha === 1)
        ) {
            alert("Você ganhou essa rodada!");
            jogadorPontos++;
        } else {
            alert("Você perdeu essa rodada. Fim de jogo!");
            break;
        }
    }
    alert("Pontuação final: " + jogadorPontos);
}
jokenpoSimples();
