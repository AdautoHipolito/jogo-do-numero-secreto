// o document.querySelector identificou o h1 no HTML e na proxima linha inserimos o conteudo pelo innerHTML o texto ' JOgo do numero secreto', tudo isso pelo JAVA
// let titulo = document.querySelector('h1');
// titulo.innerHTML = ' Jogo do numero secreto ';

let listaDeNumerosGerados = [];
let numeroLimite = 10;
// Serve para guardar o numero aleatorio
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um numero entre 1 e 100';

// Nesse caso para nao repertirmos os codigos acima toda vez deixaremos comose fosse uma funcao unica EXEBIRTEXTONATELA para todas as vezes que quisermos que apareca na TextTrackList.
function exebirTextoNaTela (tag, texto) {

    let paragrafo = document.querySelector(tag);
    paragrafo.innerHTML = texto;
    // Esse Responsive serve para deixar voz nas escritas, aqui vamos deixar voz no TEXTO, escolhemos a mulher brasileira e colocamos a velocidade com o RATE. Essa funcao so ira funcionar devido ao script no HTML na linha 7.
    ResponsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});

}

function exibirMensagemInicial() {
    // Com esses codigos iremos exibir o conteudo que quisermos sem modificar o HTML
    exebirTextoNaTela ('h1', 'Jogo do numero secreto');
    exebirTextoNaTela ('p','Escolha um numero entre 1 e 10');
}

exibirMensagemInicial();

// Para criar uma funcao Function
function verificarChute() {
    // o ponto value serve para dizer o que alguem colocou algum valor dentro da caixa
    let chute = document.querySelector('input').value;
    // console.log(chute == numeroSecreto);

    if (chute == numeroSecreto) {
        exebirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativas'
        let mensagemTentativas = `Voce descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
        exebirTextoNaTela('p', mensagemTentativas);
        // Esse codigo a gentepega o ID da classe do HTML para usar
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if (chute > numeroSecreto){
            exebirTextoNaTela('p','O numero secreto eh menor');
        } else {
            exebirTextoNaTela('p','O numero secreto eh maior');
        }
        tentativas++;
        limparCampo();
    }
}


function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosGerados.length;

    // Nesse IF quando a quantidadesde elementos chegar a 3 ele esvazia
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosGerados = [];
    }

    // O includes verifica se existe algum elemento na lista
    if (listaDeNumerosGerados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        // O push funciona pegando esse parametro e colocando ao final da lista
        listaDeNumerosGerados.push(numeroEscolhido);
        console.log(listaDeNumerosGerados);
        return numeroEscolhido;
    }
}

// essa funcao serve para limpar o campo
function limparCampo() {
    // Aqui apenas pegamos o campo INPUT e no codigo abaixo descrevemos que nao queremos nada dentron do campo
    chute = document.querySelector('input');
    // Aqui ficou uma string vazia
    chute.value = '';    
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    // Nesse codigo Habilitamos o desabilitar do botao
    document.getElementById('reiniciar').setAttribute('disabled', true);
}