var engine = {
    "cores": ['green', 'purple', 'pink', 'red', 'yellow', 'black', 'orange', 'grey'],
    "hexadecimais": {
        'green': '#02EF00',
        'purple': '#790093',
        'pink': '#ff0084',
        'red': '#E90808',
        'yellow': '#E7D703',
        'black': '#141414',
        'orange': '#F16529',
        'grey': '#EBEBEB',
    },
    'moedas': 0
}

const audioMoeda = new Audio('audio/moeda.mp3');
const audioErrou = new Audio('audio/errou.mp3');

function sortearCor() {
    var indexCorSorteada = Math.floor(Math.random() * engine.cores.length);
    var legendaCorDaCaixa = document.querySelector('#box-color');
    var nomeCorSorteada = engine.cores[indexCorSorteada];

    legendaCorDaCaixa.innerText = nomeCorSorteada.toUpperCase();

    return engine.hexadecimais[nomeCorSorteada];
    
}

function aplicarCorNaCaixa(nomeDaCor) {
    var colorBox = document.querySelector('#current-color');

    colorBox.style.backgroundColor = nomeDaCor;
    colorBox.style.backgroundImage = "url('/img/caixa-fechada.png')";
    colorBox.style.backgroundSize = '100%'
}

function atualizarPontuacao(valor) {
    var pontuacao = document.querySelector('#current-score');

    engine.moedas += valor;

    if (valor < 0) {
        audioErrou.play();
    } else {
        audioMoeda.play();
    }

    pontuacao.innerText = engine.moedas;
}

aplicarCorNaCaixa(sortearCor());

var btnGravador = document.querySelector('#btn-respond');
var transcricaoAudio = '';
var respostaCorreta = '';

if(window.SpeechRecognition || window.webkitSpeechRecognition) {
    var SpeechApi = window.SpeechRecognition || window.webkitSpeechRecognition;
    var gravador = new SpeechApi();

    gravador.continuos = false;
    gravador.lang = "en-US";

    gravador.onstart = function() {
        btnGravador.innerText = 'Estou ouvindo';

        btnGravador.style.backgroundColor = 'white';
        btnGravador.style.color = 'black';
    }

    gravador.onend = function() {
        btnGravador.innerText = 'Responder';

        btnGravador.style.backgroundColor = 'transparent';
        btnGravador.style.color = 'white';
    }

    gravador.onresult = function(event) {
        transcricaoAudio = event.results[0][0].transcript.toUpperCase().replace('.', '');
        respostaCorreta = document.querySelector('#box-color').innerText.toUpperCase();
        
        if(transcricaoAudio === respostaCorreta) {
            atualizarPontuacao(1);
        } else {
            atualizarPontuacao(-1);
        }

        aplicarCorNaCaixa(sortearCor());
    }

} else {
    alert('Navegador não tem suporte')
}

btnGravador.addEventListener('click', function(e) {
    gravador.start();
})