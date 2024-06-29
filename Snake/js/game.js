(function () {
    // Configurações iniciais do corpo do documento
    document.body.style.backgroundColor = "#90EE90";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.margin = '80px';
    document.body.style.padding = 0;

    // Variáveis iniciais e constantes
    let FPS = 10;
    const SIZE = 40;
    let mudouDirecao = false;
    let intervalId;
    let board;
    let snake;
    let pontuacao = 0;
    let frames = 0;
    let comecouJogo = false;
    let pause = false;

    // Elemento para exibir a pontuação
    let score = document.createElement("h1");
    score.innerText = formatScore(pontuacao);
    score.style.position = "absolute";
    score.style.top = "20px";
    score.style.left = "460px";
    document.body.appendChild(score);

    // Texto de instrução para iniciar o jogo
    let iniciarTexto = document.createElement("h2");
    iniciarTexto.innerText = "Pressione 'S' para iniciar";
    iniciarTexto.style.position = "absolute";
    iniciarTexto.style.top = "35px";
    iniciarTexto.style.right = "400px";
    iniciarTexto.style.color = "red";
    document.body.appendChild(iniciarTexto);

    // Mensagem de pausa
    let pauseMessage = document.createElement("h2");
    pauseMessage.innerText = "Jogo Pausado";
    pauseMessage.style.position = "absolute";
    pauseMessage.style.top = "35px";
    iniciarTexto.style.right = "400px";
    pauseMessage.style.color = "blue";
    pauseMessage.style.display = "none";
    document.body.appendChild(pauseMessage);
    
    // Função para formatar a pontuação
    function formatScore(score) {
        return score.toString().padStart(5, '0');
    }

    // Função para inicializar o jogo
    function init() {
        board = new Board(SIZE);
        snake = new Snake([[4, 4], [4, 5], [4, 6]]);
        board.adicionarFruta(snake);
    }

    // Função para iniciar o loop do jogo
    function iniciarJogo() {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(run, 1000 / FPS);
        iniciarTexto.style.display = "none";
        pauseMessage.style.display = "none"; 
    }

    // Função para parar o loop do jogo
    function pararLoop() {
        if (intervalId) clearInterval(intervalId);
    }

    // Função para finalizar o jogo
    function acabarJogo() {
        pararLoop();
        alert("Game Over! Pontuação: " + formatScore(pontuacao) + "\nPressione a letra 'R' para reiniciar");
        iniciarTexto.innerText = "Fim de Jogo! 'R' para reiniciar";
        iniciarTexto.style.display = "block";
    }

    // Listener para eventos de teclado
    window.addEventListener("keydown", (e) => {
        if (!comecouJogo && e.key.toLowerCase() === "s") {
            comecouJogo = true;
            iniciarJogo();
        } else if (comecouJogo && !mudouDirecao) {
            if (e.key.toLowerCase() === "p") {
                // Lógica de pausa e continuação do jogo
                if (pause) {
                    pause = false;
                    iniciarJogo(); 
                } else {
                    pause = true;
                    pararLoop(); 
                    pauseMessage.style.display = "block"; 
                }
            } else {
                // Mudança de direção da cobra
                switch (e.key) {
                    case "ArrowUp":
                        snake.changeDirection(0);
                        mudouDirecao = true;
                        break;
                    case "ArrowRight":
                        snake.changeDirection(1);
                        mudouDirecao = true;
                        break;
                    case "ArrowDown":
                        snake.changeDirection(2);
                        mudouDirecao = true;
                        break;
                    case "ArrowLeft":
                        snake.changeDirection(3);
                        mudouDirecao = true;
                        break;
                    default:
                        break;
                }
            }
        }

        // Reiniciar o jogo
        if (acabarJogo && e.key.toLowerCase() === "r") {
            location.reload();
        }
    });

    // Classe do tabuleiro
    class Board {
        constructor(size) {
            this.size = size;
            this.element = document.createElement("table");
            this.element.setAttribute("id", "board");
            this.color = "#ccc";
            document.body.appendChild(this.element);
            for (let i = 0; i < size; i++) {
                const row = document.createElement("tr");
                this.element.appendChild(row);
                for (let j = 0; j < size; j++) {
                    const field = document.createElement("td");
                    row.appendChild(field);
                }
            }
            this.fruta = null;
        }

        // Função para adicionar uma fruta ao tabuleiro
        adicionarFruta(snake) {
            let posX, posY;
            let posicaoValida = false;

            const probabilidade = Math.random();

            // Gera uma posição válida para a fruta
            while (!posicaoValida) {
                posX = Math.floor(Math.random() * SIZE) + 1;
                posY = Math.floor(Math.random() * SIZE) + 1;
                posicaoValida = true;
                for (let i = 0; i < snake.body.length; i++) {
                    if (snake.body[i][0] === posX && snake.body[i][1] === posY) {
                        posicaoValida = false;
                        break;
                    }
                }
            }

            // Adiciona a fruta ao tabuleiro com base na probabilidade
            if (probabilidade < 0.67) {
                if (this.fruta) {
                    document.querySelector(`#board tr:nth-child(${this.fruta[0]}) td:nth-child(${this.fruta[1]})`).style.backgroundColor = this.color;
                }
                this.fruta = [posX, posY, "black"];
                document.querySelector(`#board tr:nth-child(${posX}) td:nth-child(${posY})`).style.backgroundColor = "black";
            } else {
                if (this.fruta) {
                    document.querySelector(`#board tr:nth-child(${this.fruta[0]}) td:nth-child(${this.fruta[1]})`).style.backgroundColor = this.color;
                }
                this.fruta = [posX, posY, "red"];
                document.querySelector(`#board tr:nth-child(${posX}) td:nth-child(${posY})`).style.backgroundColor = "red";
            }
        }
    }
    
    // Classe da cobra
    class Snake {
        constructor(body) {
            this.body = body;
            this.color = "#222";
            this.direction = 1; // 0 para cima, 1 para direita, 2 para baixo, 3 para esquerda
            this.body.forEach(field => document.querySelector(`#board tr:nth-child(${field[0]}) td:nth-child(${field[1]})`).style.backgroundColor = this.color);
        }
        // Função para movimentar a cobra
        walk() {
            const head = this.body[this.body.length - 1];
            let newHead;
            switch (this.direction) {
                case 0:
                    newHead = [head[0] - 1, head[1]];
                    break;
                case 1:
                    newHead = [head[0], head[1] + 1];
                    break;
                case 2:
                    newHead = [head[0] + 1, head[1]];
                    break;
                case 3:
                    newHead = [head[0], head[1] - 1];
                    break;
                default:
                    break;
            }
            // Verifica se a cobra colidiu com as bordas do tabuleiro
            if (newHead[0] < 1 || newHead[0] > SIZE || newHead[1] < 1 || newHead[1] > SIZE) {
                pararLoop();
                acabarJogo();
                return;
            }
           // Verifica se a cobra colidiu com ela mesma 
            if (this.colisao()) {
                pararLoop();
                acabarJogo();
                return;
            }
            // Adiciona a nova posição da cabeça da cobra
            this.body.push(newHead);
            document.querySelector(`#board tr:nth-child(${newHead[0]}) td:nth-child(${newHead[1]})`).style.backgroundColor = this.color;

            // Verifica se a cobra comeu a fruta
            if (this.comeFruta(newHead)) {
                let frutaCor = board.fruta[2];
                if (frutaCor === "red") {
                    pontuacao += 2;
                } else if (frutaCor === "black") {
                    pontuacao += 1;
                }
                score.innerText = formatScore(pontuacao);
                board.fruta = null;
                board.adicionarFruta(this);
            } else {
                const oldTail = this.body.shift();
                document.querySelector(`#board tr:nth-child(${oldTail[0]}) td:nth-child(${oldTail[1]})`).style.backgroundColor = board.color;
            }
        }
        // Função para mudar a direção da cobra
        changeDirection(direction) {
            // Verifica se a cobra não está indo na direção oposta
            if (this.direction === 0 && direction === 2) return;
            if (this.direction === 2 && direction === 0) return;
            if (this.direction === 1 && direction === 3) return;
            if (this.direction === 3 && direction === 1) return;
            this.direction = direction;
        }
        // Função para verificar se a cobra colidiu com ela mesma
        colisao() {
            let cabeca = this.body[this.body.length - 1];
            for (let i = 0; i < this.body.length - 1; i++) {
                if (cabeca[0] === this.body[i][0] && cabeca[1] === this.body[i][1]) {
                    return true;
                }
            }
            return false;
        }
        // Função para verificar se a cobra comeu a fruta
        comeFruta(cabeca) {
            let fruta = board.fruta;
            if (cabeca[0] === fruta[0] && cabeca[1] === fruta[1]) {
                return true;
            }
            return false;
        }
    }
    // Função para executar o jogo
    function run() {
        if (!pause) {  
            snake.walk();
            mudouDirecao = false;
            frames++;
            if (frames % 60 === 0) {
                FPS += 0.5;
                iniciarJogo();
            }
        }
    }
    // Inicializa o jogo
    init();
})();
