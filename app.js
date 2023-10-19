// hier gibt es eine klasse namens Question, die die Fragen, Antworten und die richtige Antwort speichert
class Question {
    constructor(question, answers, correctAnswerIndex) {
      this.question = question;
      this.answers = answers;
      this.correctAnswerIndex = correctAnswerIndex;
      this.selectedAnswer = -1;
    }
  // hier wird die funktion setAnswer definiert, die die ausgewählte Antwort speichert
    setAnswer(userAnswer) {
      this.selectedAnswer = userAnswer;
    }
  // hier wird die funktion isAnswerCorrect definiert, die überprüft, ob die ausgewählte Antwort richtig ist
    isAnswerCorrect() {
      return this.selectedAnswer === this.correctAnswerIndex;
    }
  // hier wird die funktion displayQuestionWithTimeout definiert, die die Frage und die Antwortmöglichkeiten anzeigt
    displayQuestionWithTimeout() {
      document.getElementById("question").textContent = this.question;
      const options = document.getElementById("options");
      options.innerHTML = "";
  // hier wird eine Schleife definiert, die die Antwortmöglichkeiten als Buttons anzeigt
      this.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => {
          this.setAnswer(index);
          clearTimeout(questionTimer);
          nextQuestion();
        };
        options.appendChild(button);
      });
  // hier wird ein Timer definiert, der nach 10 Sekunden die nächste Frage anzeigt
      const questionTimer = setTimeout(() => {
        this.setAnswer(-1);
        nextQuestion();
      }, 10000);
    }
  }
  // hier haben wir die fragen eingebaut
  const questions = [
    new Question(
      "Welche Methode mutiert nicht das Array",
      ["splice()", "unshift()", "slice()"],
      1
    ),
    new Question(
      "Was ist keine Schleife?",
      ["forEach", "for", "while"],
      0
    ),
    new Question(
      "Welche Funktion wird verwendet, um Inhalte in der JavaScript-Konsole auszugeben?",
      ["anzeigen()", "console.log()", "drucken()"],
      1
    ),
    new Question(
      "Welches Symbol wird für Kommentare im JavaScript-Code verwendet?",
      ["//", "%%", "##"],
      0
    ),
    new Question(
      "Wofür steht die Abkürzung DOM in JavaScript?",
      ["Document Object Model", "Data Object Model", "Digital Ordinance Model"],
      0
    ),
    new Question(
      "Für was steht OOP?",
      [
        "Object-Oriented Portal",
        "Order of Operations",
        "Object-Oriented Programming",
      ],
      2
    ),
    new Question(
      "Welche Methode wird verwendet, um ein neues Element zu einem Array in JavaScript hinzuzufügen?",
      ["push()", "insert()", "addElement()"],
      0
    ),
    new Question(
      "Welche Methode mutiert das ursprüngliche Array?",
      ["pop()", "concat()", "join()"],
      0
    )
  ];
  // hier wird die Variable currentQuestion definiert, die die aktuelle Frage speichert
  let currentQuestion = 0;
  const highscores = JSON.parse(localStorage.getItem("highscores")) || []; // hier wird die Variable highscores definiert, die die Highscores speichert
  
  // die function startQuiz wird definiert, die die erste Frage anzeigt
  function startQuiz() {
    questions[currentQuestion].displayQuestionWithTimeout();
  }
  // die function nextQuestion wird definiert, die die nächste Frage anzeigt und überprüft, ob es noch weitere Fragen gibt
  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      questions[currentQuestion].displayQuestionWithTimeout();
    } else {
      endQuiz();
    }
  }
  // die function updateHighscoreList wird definiert, die die Highscores speichert und anzeigt
  function updateHighscoreList(score) {
    const playerName = prompt("Du bist durch! Gib deinen Namen ein für die Bestenliste:");
    const entry = { name: playerName, score: score };
    highscores.push(entry);
  // hier sortieren wir die Highscores nach Punkten 
    highscores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highscores", JSON.stringify(highscores.slice(0, 5)));
    displayHighscores();
  }
  // hier wird die function displayHighscores definiert, die die Highscores anzeigt 
  function displayHighscores() {
    const highscoreList = document.getElementById("highscore-list");
    highscoreList.innerHTML = "";
  // hier wird eine Schleife definiert, die die Highscores als Liste anzeigt 
    highscores.forEach((entry, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${index + 1}. ${entry.name}: ${entry.score} Punkte`;
      highscoreList.appendChild(listItem);
    });
  }
  
  
  // die function endQuiz hier definiert, die die Punkte anzeigt und die Highscores speichert
  function endQuiz() {
    let correctAnswers = 0;
    questions.forEach((question) => {
      if (question.isAnswerCorrect()) {
        correctAnswers++;
      }
    
    });
  // hier wird die Variable totalQuestions definiert, die die Gesamtzahl der Fragen speichert und die Variable incorrectAnswers definiert, die die falschen Antworten speichert
    const totalQuestions = questions.length;
    const incorrectAnswers = totalQuestions - correctAnswers;
  // hier haben wir die summary definiert, die die Punkte anzeigt von allen und uns dann ein fenster ausgibt
    let summary;
    if (correctAnswers === totalQuestions) {
      summary = "Perfekt! Du bist der neue Quizzler Meister!";
    } else {
      summary = `Quiz Fertig!\nRichtige Antworten: ${correctAnswers}\nFalsche Antworten: ${incorrectAnswers}\nDeine Punkte: ${correctAnswers}/${totalQuestions}`;
    }
  
    alert(summary);
  
    updateHighscoreList(correctAnswers);
  }
  
  
  
  
  
  
  // das ist einfach nur ein Eventlistener, der die function startQuiz aufruft, wenn die Seite geladen ist
  window.onload = startQuiz; 