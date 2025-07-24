const perguntas = [
  {
    pergunta: "Quem é o Pokémon número #001 na Pokédex?",
    opcoes: ["Charmander", "Squirtle", "Pikachu", "Bulbasaur"],
    resposta: 3
  },
  {
    pergunta: "Qual o nome da Mãe do Ash?",
    opcoes: ["Delia", "Neliah", "Sellia", "Helya"],
    resposta: 0
  },
  {
    pergunta: "Em qual Geração foi introduzido o tipo Fada?",
    opcoes: ["Geração IV", "Geração V", "Geração VI", "Geração VII"],
    resposta: 2
  },
  {
    pergunta: "Quantas formas o Pokémon Deoxys possui?",
    opcoes: ["2", "3", "4", "5"],
    resposta: 2
  },
  {
    pergunta: "Quantas formas evolutivas o Eevee possui?",
    opcoes: ["7", "8", "9", "10"],
    resposta: 1
  },
  {
    pergunta: "Qual Pokémon é conhecido como 'Espada da Justiça'?",
    opcoes: ["Keldeo", "Terrakion", "Groudon", "Virizion"],
    resposta: 0
  },
  {
    pergunta: "Qual o Maior Pokémon em altura já descoberto?",
    opcoes: ["Eternatus", "Wailord", "Dondozo", "Celesteela"],
    resposta: 0
  },
  {
    pergunta: "Existem 2 Pokémons empatados como os mais pesados, um é o Celesteela, qual é o outro?",
    opcoes: ["Groudon", "Cosmoem", "Guzzlord", "Stakataka"],
    resposta: 1
  },
  {
    pergunta: "Quais as tipagens de Charizard?",
    opcoes: ["Dragão/Fogo", "Lutador/Fogo", "Voador/Fogo", "Terrestre/Fogo"],
    resposta: 2
  },
  {
    pergunta: "Qual Pokémon evolui para Raichu?",
    opcoes: ["Jigglypuff", "Meowth", "Pikachu", "Zubat"],
    resposta: 2
  },
  {
    pergunta: "Qual é o inicial de água da região de Kanto?",
    opcoes: ["Totodile", "Squirtle", "Piplup", "Froakie"],
    resposta: 1
  },
  {
    pergunta: "Qual é o tipo principal do Gengar?",
    opcoes: ["Fada", "Fantasma", "Normal", "Água"],
    resposta: 1
  },
  {
    pergunta: "Qual Pokémon é conhecido por dormir o tempo todo?",
    opcoes: ["Snorlax", "Abra", "Slowpoke", "Eevee"],
    resposta: 0
  },
  {
    pergunta: "Qual desses não é um Pokémon lendário?",
    opcoes: ["Mewtwo", "Zapdos", "Charizard", "Articuno"],
    resposta: 2
  },
  {
    pergunta: "Qual tipo é forte contra o tipo Pedra?",
    opcoes: ["Fogo", "Voador", "Água", "Elétrico"],
    resposta: 2
  },
  {
    pergunta: "Qual é a evolução do Bulbasaur?",
    opcoes: ["Venusaur", "Ivysaur", "Wartortle", "Charmander"],
    resposta: 1
  },
  {
    pergunta: "Qual desses Pokémon tem uma pedra na testa?",
    opcoes: ["Onix", "Golem", "Geodude", "Solrock"],
    resposta: 3
  }
];

let telaInicial = document.getElementById("tela-inicial");
let telaQuiz = document.getElementById("tela-quiz");
let telaFinal = document.getElementById("tela-final");

let perguntaAtual = 0;
let pontuacao = 0;
let tempo;
let cronometro;

document.getElementById("btn-comecar").onclick = () => {
  telaInicial.style.display = "none";
  telaQuiz.style.display = "flex";
  iniciarPergunta();
};

document.getElementById("sair").onclick = () => {
  resetarQuiz();
};

document.getElementById("btn-recomecar").onclick = () => {
  resetarQuiz();
};

function iniciarPergunta() {
  if (perguntaAtual >= perguntas.length) {
    mostrarResultado();
    return;
  }

  document.getElementById("pergunta").textContent = perguntas[perguntaAtual].pergunta;

  const opcoesContainer = document.getElementById("opcoes");
  opcoesContainer.innerHTML = "";

  perguntas[perguntaAtual].opcoes.forEach((opcao, index) => {
    const btn = document.createElement("button");
    btn.textContent = opcao;
    btn.onclick = () => verificarResposta(index);
    opcoesContainer.appendChild(btn);
  });

  atualizarPaginacao();
  iniciarCronometro();
}

function verificarResposta(index) {
  pararCronometro();

  const opcoesBotoes = document.querySelectorAll("#opcoes button");
  const respostaCorreta = perguntas[perguntaAtual].resposta;

  opcoesBotoes.forEach((btn, i) => {
    btn.disabled = true; // Desativa botões
    if (i === respostaCorreta) {
      btn.classList.add("correta");
    }
    if (i === index && i !== respostaCorreta) {
      btn.classList.add("errada");
    }
  });

  if (index === respostaCorreta) pontuacao++;

  setTimeout(() => {
    perguntaAtual++;
    iniciarPergunta();
  }, 800); // aguarda antes de ir para a próxima
}

function iniciarCronometro() {
  tempo = 10;
  atualizarTempo();

  cronometro = setInterval(() => {
    tempo--;
    atualizarTempo();
    if (tempo <= 0) {
      pararCronometro();
      mostrarResultado(true);
    }
  }, 1000);
}

function pararCronometro() {
  clearInterval(cronometro);
}

function atualizarTempo() {
  document.getElementById("tempo").textContent = `00:${tempo.toString().padStart(2, '0')}`;
}

function atualizarPaginacao() {
  const paginacao = document.getElementById("paginacao");
  paginacao.innerHTML = "";

  for (let i = 0; i < perguntas.length; i++) {
    const span = document.createElement("span");
    span.textContent = i + 1;
    if (i === perguntaAtual) span.style.backgroundColor = "yellow";
    paginacao.appendChild(span);
  }
}

function mostrarResultado(timeout = false) {
  telaQuiz.style.display = "none";
  telaFinal.style.display = "flex";

  const fraseFinal = document.getElementById("frase-final");
  const mensagemFinal = document.getElementById("mensagem-final");
  const linkEstudo = document.getElementById("link-estudo");

  if (timeout) {
    mensagemFinal.textContent = "O tempo acabou...";
    fraseFinal.textContent = `Você acertou apenas ${pontuacao} de ${perguntas.length} perguntas.`;
    linkEstudo.textContent = "";
  } else if (pontuacao > perguntas.length / 2) {
    mensagemFinal.textContent = "Parece que você entende mesmo sobre Pokémon!";
    fraseFinal.textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas.`;
    linkEstudo.textContent = "";
  } else {
    mensagemFinal.textContent = "Se esforce mais para se tornar um Mestre Pokémon...";
    fraseFinal.textContent = `Você acertou apenas ${pontuacao} de ${perguntas.length} perguntas.`;
  }
}

function resetarQuiz() {
  perguntaAtual = 0;
  pontuacao = 0;
  pararCronometro();
  telaFinal.style.display = "none";
  telaQuiz.style.display = "none";
  telaInicial.style.display = "flex";
}

document.getElementById("btn-comecar").onclick = () => {
  document.getElementById("musica-fundo").play();
  telaInicial.style.display = "none";
  telaQuiz.style.display = "flex";
  iniciarPergunta();
};