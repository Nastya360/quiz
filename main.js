const questions = [
  {
    question: "Какой язык работает в браузере?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 4,
  },
  {
    question: "Что означает CSS?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    correct: 2,
  },
  {
    question: "Что означает HTML?",
    answers: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis",
    ],
    correct: 1,
  },
  {
    question: "В каком году был создан JavaScript?",
    answers: ["1996", "1995", "1994", "все ответы неверные"],
    correct: 2,
  },
];

//находим элементы

const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");

let score = 0;
let questionIndex = 0; //текущий вопрос

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

//очищаем контейнет от текста
function clearPage() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
}

function showQuestion() {
  //вопрос

  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace(
    "%title%",
    questions[questionIndex]["question"]
  );
  headerContainer.innerHTML = title;

  //варианты ответа извлеченные из массива

  let answerNumber = 1;

  for (item of questions[questionIndex]["answers"]) {
    const questionTemplate = `<li>
	    <label>
		   <input value = "%number%" type="radio" class="answer" name="answer" />
		   <span>%answer%</span>
	    </label>
</li>`;
    const answerHTML = questionTemplate
      .replace("%answer%", item)
      .replace("%number%", answerNumber);

    listContainer.innerHTML = listContainer.innerHTML + answerHTML;

    answerNumber++;
  }
}

function checkAnswer() {
  //находим выбранную радиокнопку
  const checkedRadio = listContainer.querySelector(
    'input[type = "radio"]:checked'
  );

  //если ответ не выбран, то выходим из функции
  if (!checkedRadio) {
    submitBtn.blur();
    return;
  }
  const userAnswer = parseInt(checkedRadio.value);

  if (userAnswer === questions[questionIndex]["correct"]) {
    score++;
  }
  if (questionIndex !== questions.length - 1) {
    questionIndex++;
    clearPage();
    showQuestion();
  } else {
    clearPage();
    showResults();
  }
}
function showResults() {
  const resultsTemplate = `<h2 class="title">%title%</h2>
	<h3 class="summary">%message%</h3>
	<p class="result">%result%</p>`;

  let title, message;
  if (score === questions.length) {
    title = "✨Поздравляем!✨";
    message = "Вы ответили верно на все вопросы!🔥";
  } else if ((score * 100) / questions.length >= 50) {
    title = "✨Неплохой результат!✨";
    message = "Вы дали более половины правильных ответов!";
  } else {
    title = "Ну вот...";
    message = "Ты лох!";
  }
  let result = `${score} из ${questions.length}`;

  const finalMessage = resultsTemplate
    .replace("%title%", title)
    .replace("%message%", message)
    .replace("%result%", result)

	headerContainer.innerHTML = finalMessage;

	//меняем кнопку на "Играть снова"
	submitBtn.blur();
	submitBtn.innerText = "Начать заново";
	submitBtn.onclick = ()=> history.go();
}
