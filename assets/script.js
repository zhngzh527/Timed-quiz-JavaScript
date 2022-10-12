//Quzi questions//
var questionsObj = [
    {
        question: "Which HTML element do we put the JavaScript",
        a: "A.<script>",
        b: "B.<scripting>",
        c: "C.<js>",
        d: "D.<javascript>",
        correct: "A.<script>",
    },
    {
        question: "JavaScript is the same as Java.",
        a: "A.True",
        b: "B.False",
        correct: "B.False",
    },
    {
        question: "How do you create a function in Javascript",
        a: "A.function:myFuntion()",
        b: "B.funtion = myFuntion()",
        c: "C.funtion myFunction()",
        correct: "C.funtion myFunction()",
    },
    {
        question: "How do you declare a JavaScript variable",
        a: "A.var petName;",
        b: "B.v Petname",
        c: "C.variable petName",
        d: "D.All above works",
        correct: "A.var petName;",
    },
    {
        question: "Is JavaScript case-sensitive?",
        a: "A.Yes",
        b: "B.No",
        c: "C.It depends",
        correct: "A.Yes",
    },
]

var clickStart = document.getElementById("start");
var timerEl = document.getElementById("countdown");
var timeLeft = 60
var quizDuration;
var questionContainer = document.querySelector("#quiz-container");

function timer() {
    timerEl.textContent = "Time remaining: " + timeLeft + "s";
    quizDuration = setInterval(function () {
        if (timeLeft > 0) {
            adjuestTime(-1);
        }
        else {
            endQuizPage();
        }
    }, 1000);
}

function adjuestTime(amount) {
    timeLeft += amount;
    if (timeLeft < 0) {
        timeLeft = 0;
    }
    timeLeft.textContent = "Time remaining: " + timeLeft + "s";
}

clickStart.onclick = timer;
var renderQuestion = function (questionsObj) {
    questionContainer.innerHTML = "";

    var questionHeader = document.createElement("h2");
    questionHeader.textContent = questionsObj.question;

    var answerA = document.createElement("button");
    answerA.textContent = questionsObj.a;
    answerA.addEventListener("click", answeClick);

    var answerB = document.createElement("button");
    answerB.textContent = questionsObj.b;
    answerB.addEventListener("click", answeClick);

    var answerC = document.createElement("button");
    answerC.textContent = questionsObj.c;
    answerC.addEventListener("click", answeClick);

    var answerD = document.createElement("button");
    answerD.textContent = questionsObj.d;
    answerD.addEventListener("click", answeClick);

    questionContainer.appendChild(questionHeader);
    questionContainer.appendChild(answerA);
    questionContainer.appendChild(answerB);
    questionContainer.appendChild(answerC);
    questionContainer.appendChild(answerD);
}

var currentQuestionIndex = 0;
var userScore = 0;
var correctAnswer = questionsObj[currentQuestionIndex].answer;
var clickViewScores = document.getElementById("view-score");

var answeClick = function(event) {
    event.preventDefault();
    var userAnswer = event.target.textContent;
    correctAnswer = questionsObj[currentQuestionIndex].correct;
    var answerDetermination = document.querySelector("#answer-determination");
    if (userAnswer !== correctAnswer) {
        adjuestTime(-10);
        answerDetermination.textContent = "Wrong";
        currentQuestionIndex++;
        if (currentQuestionIndex >= questionsObj.length) {
            endQuizPage();
        } else {
            renderQuestion(questionsObj[currentQuestionIndex])
        };
    }
    else if (userAnswer === correctAnswer) {
        currentQuestionIndex++;
        answerDetermination.textContent = "Correct";
        userScore++;
        if (currentQuestionIndex >= questionsObj.length) {
            endQuizPage();
        } else {
            renderQuestion(questionsObj[currentQuestionIndex])
        };
    }
};

var quiz = function (event) {
    event.preventDefault();
    resetDisplay();
    renderQuestion(questionsObj[currentQuestionIndex]);
};

function resetDisplay() {
    questionContainer.innerHTML="";
    document.querySelector("#intro").getElementsByClassName.display = "none";
}

function highScores() {
    let data = localStorage.getItem("object");
    let getData =JSON.parse(data);
    let name =getData.name;
    let score = getData.score;
    questionContainer.innerHTML = "";
    questionContainer.innerHTML = name + " " + score;
}
clickViewScores.addEventListener("click", highScores);

var initials;
function endQuizPage() {
    resetDisplay();
    timerEl.textContent = "";
    clearInterval(quizDuration);
    var endPage = document.createElement("h2");
    questionContainer.appendChild(endPage);

    let blank = document.querySelector("#answer-determination");
    blank.innerHTML = "";

    endPage.innerHTML = "All done! Your final score is " + userScore + ". Enter your initials to save";

    var initialBox = document.createElement("input");
    blank.appendChild(initialBox);

    var submitInitialBtn = document.createElement("button");
    submitInitialBtn.textContent = "Submit";
    blank.appendChild(submitInitialBtn);

    submitInitialBtn.addEventListener("click", () => {
        if (initialBox.value.length === 0) return false;

        let storeInitials = (...input) => {
            let data =JSON.stringify({ "name":input[0], "score":input[1]})
            localStorage.setItem("object", data)
        }
        storeInitials(initialBox.value, userScore);

        var playAgain = document.createElement("button");
        playAgain.textContent = "Play Again!";
        blank.appendChild(playAgain);

        playAgain.addEventListener("click", () => {
            location.reload();
        })
    });

    document.querySelector("input").value = "";
    initialBox.addEventListener("submit", endQuizPage);
};

function renderInitials() {
    submitInitialBtn.addEventListener("click", function(event) {
        event.preventDefault;
    })
};

clickStart.addEventListener("click", quiz);