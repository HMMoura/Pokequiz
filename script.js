const questions = [
  {
    question: "Qual tipo é super efetivo contra tipo Água?",
    answers: ["Fogo", "Planta", "Pedra", "Gelo"],
    correct: "Planta",
    image: "imagens/pergunta1.png"
  },
  {
    question: "Qual Pokémon é do tipo Elétrico?",
    answers: ["Pikachu", "Charmander", "Bulbasaur", "Squirtle"],
    correct: "Pikachu",
    image: "imagens/pergunta2.png"
  },
  {
    question: "Qual tipo é fraco contra Fogo?",
    answers: ["Água", "Pedra", "Inseto", "Elétrico"],
    correct: "Inseto",
    image: "imagens/pergunta3.png"
  }
];

let currentQuestion = 0;
let score = 0;
let ranking = [];

document.getElementById("start-btn").addEventListener("click", () => {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  showQuestion();
});

document.getElementById("next-btn").addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").textContent = q.question;
  document.getElementById("question-image").src = q.image;

  const answersList = document.getElementById("answers");
  answersList.innerHTML = "";

  q.answers.forEach(answer => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = answer;
    button.onclick = () => checkAnswer(answer);
    li.appendChild(button);
    answersList.appendChild(li);
  });

  document.getElementById("next-btn").style.display = "none";
}

function checkAnswer(answer) {
  const q = questions[currentQuestion];
  if (answer === q.correct) {
    score++;
  }

  Array.from(document.querySelectorAll("#answers button")).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === q.correct) {
      btn.style.backgroundColor = "green";
      btn.style.color = "white";
    } else {
      btn.style.backgroundColor = "red";
      btn.style.color = "white";
    }
  });

  document.getElementById("next-btn").style.display = "block";
}

function showResult() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  document.getElementById("score").textContent = `Você acertou ${score} de ${questions.length} perguntas.`;

  ranking.push(score);
  ranking.sort((a, b) => b - a);
  const list = document.getElementById("ranking-list");
  list.innerHTML = "";
  ranking.slice(0, 5).forEach((s, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}º lugar: ${s} pontos`;
    list.appendChild(li);
  });
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;

  document.getElementById("quiz").classList.remove("hidden");
  document.getElementById("result").classList.add("hidden");
  document.getElementById("next-btn").style.display = "none";
  showQuestion();
}
