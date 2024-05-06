// JavaScript Document
const Jogo_da_Velha = { // Inicia a declaração de um objeto chamado "Jogo_da_Velha".
    // ATTRIBUTOS
    board: ["", "", "", "", "", "", "", "", ""], // Cria um array chamado "board" com 9 elementos vazios para representar o tabuleiro do jogo.
    simbols: { // Define um objeto "simbols" para armazenar informações sobre os símbolos usados no jogo.
        options: ['O', 'X'], // Define um array chamado "options" com os símbolos 'O' e 'X'.
        turn_index: 0, // Inicializa um atributo "turn_index" com o valor 0, que será usado para saber de quem é a vez de jogar.
        change: function() { // Define um método "change" que inverte o "turn_index" para alternar entre 'O' e 'X' na vez de jogar
            this.turn_index = this.turn_index === 0 ? 1 : 0; // Essa linha de código alterna o valor de turn_index entre 0 e 1, alternando entre os jogadores 'O' e 'X'.
        },
    },
    container_element: null, // Inicializa um atributo "container_element" como nulo, que será usado para armazenar um elemento HTML onde o jogo será renderizado.
    gameover: false, // Inicializa o atributo "gameover" como falso para indicar que o jogo não está encerrado.
    winning_sequences: [ // Define um array com as sequências vencedoras possíveis no jogo da velha.
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ],

    // FUNÇÕES
    init: function(container) { // Define um método "init" que recebe um elemento HTML "container" e atribui a esse elemento à "container_element".
        this.container_element = container;
    },
    make_play: function(position) { // Define um método "make_play" que é usado para efetuar um movimento no jogo com base na posição fornecida.
        if (this.gameover) return false; // Verifica se o jogo já terminou e retorna falso se verdadeiro.
        if (this.board[position] === "") { // Verifica se a posição no tabuleiro está vazia.
            this.board[position] = this.simbols.options[this.simbols.turn_index]; // Se a posição estiver vazia, atribui o símbolo do jogador atual ao tabuleiro, atualiza a representação do jogo e verifica se houve uma sequência vencedora.
            this.draw();
            let winning_sequences_index = this.check_winning_sequences(this.simbols.options[this.simbols.turn_index]);
            if (winning_sequences_index >= 0) { // Se uma sequência vencedora for encontrada, chama a função "game_over" e retorna verdadeiro.
                this.game_over();
            } else { // Se não houver sequência vencedora, altera o jogador atual e retorna verdadeiro.
                this.simbols.change();
            }
            return true;
        } else { // Se a posição no tabuleiro não estiver vazia, retorna falso.
            return false;
        }
    },
    check_winning_sequences: function(simbol) { // Define um método "check_winning_sequences" que verifica se uma sequência vencedora foi alcançada.
        for (let i in this.winning_sequences) { // Loop para iterar pelas sequências vencedoras.
            if (this.board[this.winning_sequences[i][0]] === simbol && // Verifica se as posições do tabuleiro nas três posições da sequência atual contêm o símbolo fornecido.
                this.board[this.winning_sequences[i][1]] === simbol &&
                this.board[this.winning_sequences[i][2]] === simbol) {
                console.log('winning sequences INDEX: ' + i); // Se todas as posições contêm o símbolo, imprime uma mensagem e retorna o índice da sequência vencedora.
                return i;
            }
        }
        return -1; // Caso contrário, retorna -1 indicando que nenhuma sequência vencedora foi encontrada.
    },
    game_over: function() { // Define um método "game_over" que marca o jogo como encerrado.
        this.gameover = true;
        console.log('GAME OVER');
    },
    start: function() { // Define um método "start" que reinicializa o tabuleiro e o estado do jogo para começar uma nova partida.
        this.board.fill('');
        this.draw();
        this.gameover = false;
    },
    draw: function() { // Define um método "draw" que renderiza o estado atual do jogo no elemento HTML "container_element".
        let content = "";
        for (let i in this.board) {
            content += '<div onclick="Jogo_da_Velha.make_play(' + i + ')">' + this.board[i] + '</div>';
        }
        this.container_element.innerHTML = content;
    },
};