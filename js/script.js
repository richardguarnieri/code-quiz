// Variables Declaration
const quizQuestions = [
    {
        question: 'Commonly used data types DO NOT include:',
        options: [
            '1. Strings',
            '2. Booleans',
            '3. Alerts',
            '4. Numbers'
        ],
        answer: '3. Alerts'
    },
    {
        question: 'The condition in an if / else statement is enclosed within __________.',
        options: [
            '1. Quotes',
            '2. Curly Brackets',
            '3. Parenthesis',
            '4. Square Brackets'
        ],
        answer: '3. Parenthesis'
    },
    {
        question: 'Arrays in JavaScript can be used to store __________.',
        options: [
            '1. Numbers and Strings',
            '2. Other Arrays',
            '3. Booleans',
            '4. All of the Above'
        ],
        answer: '4. All of the Above'
    },
    {
        question: 'String values must be enclosed within __________ when being assigned to variables.',
        options: [
            '1. Commas',
            '2. Curly Brackets',
            '3. Quotes',
            '4. Parenthesis'
        ],
        answer: '3. Quotes'
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        options: [
            '1. JavaScript',
            '2. Terminal / Bash',
            '3. For Loops',
            '4. Console.log'
        ],
        answer: '4. Console.log'
    }
]

const navBar = document.querySelector('nav');
const viewHighscores = document.querySelector('#view-highscores');
const timeTracker = document.querySelector('#time-tracker');

const startQuizDiv = document.querySelector('#start-quiz');
const startBtn = document.querySelector('#start-btn');

const progressQuizDiv = document.querySelector('#progress-quiz');
const progressTitle = document.querySelector('#progress-title');
const progressOption1 = document.querySelector('#progress-option1');
const progressOption2 = document.querySelector('#progress-option2');
const progressOption3 = document.querySelector('#progress-option3');
const progressOption4 = document.querySelector('#progress-option4');
const progressHr = document.querySelector('#progress-hr');
const progressMsg = document.querySelector('#progress-msg');

const endQuizDiv = document.querySelector('#end-quiz');
const endTitle = document.querySelector('#end-title');
const endScore = document.querySelector('#end-score');
const endForm = document.querySelector('#end-form');
const endFormNameInput = document.querySelector('#end-form-name');

const highscoresQuizDiv = document.querySelector('#highscores-quiz');
const highscoresTitle = document.querySelector('#highscores-title');
const highscoresContainer = document.querySelector('#highscores-container');
const goBackBtn = document.querySelector('#go-back-btn');
const clearScoresBtn = document.querySelector('#clear-scores-btn');

let totalQuestions = quizQuestions.length;
let currentQuestion = 0;
let question;
let answer;
let quizInterval;
let highscoresArray;
let secondsLeft = 75;

// displayQuestion function
const displayQuestion = () => {
    question = quizQuestions[currentQuestion];
    answer = question.answer;
    progressTitle.innerHTML = question.question;
    progressOption1.innerHTML = question.options[0];
    progressOption2.innerHTML = question.options[1];
    progressOption3.innerHTML = question.options[2];
    progressOption4.innerHTML = question.options[3];
};

// checkAnswer function
const checkAnswer = (e) => {
    currentQuestion++
    progressHr.classList.remove('hidden');
    progressMsg.classList.remove('hidden');
    let chosenAnswer = e.target.innerHTML;
    if (answer === chosenAnswer) {
        progressMsg.innerHTML = 'Correct! Good Job!';
    } else {
        progressMsg.innerHTML = 'Incorrect!';
        secondsLeft -= 10;
    }
    if (currentQuestion === totalQuestions) {
        clearInterval(quizInterval);
        if (secondsLeft <= 0) {
            secondsLeft = 0;
        };
        timeTracker.innerHTML = 'Time Left: ' + secondsLeft;
        endQuiz();
    } else {
        displayQuestion();
    };
};

// endQuiz function
const endQuiz = () => {
    progressQuizDiv.classList.add('hidden');
    endQuizDiv.classList.remove('hidden');
    endScore.innerHTML = 'Your final score is: ' + secondsLeft;
};

// highscores function
const highscores = (e) => {
    e.preventDefault();
    navBar.classList.add('hidden');
    endQuizDiv.classList.add('hidden');
    highscoresQuizDiv.classList.remove('hidden');
    highscoresArray = Object.values(JSON.parse(localStorage.getItem('players')) ?? 0);
    let userInitials = {
        name: endFormNameInput.value,
        score: secondsLeft
    };
    highscoresArray.push(userInitials);
    highscoresArray.sort((a, b) => b.score - a.score);
    localStorage.setItem('players', JSON.stringify(highscoresArray));
    highscoresArray.forEach((e, i) => {
        let pElement = document.createElement('p');
        let name = e.name;
        let score = e.score;
        pElement.innerHTML = 'Rank ' + (parseInt(i) + 1) + ": " + name + ' - ' + score;
        highscoresContainer.append(pElement);
    });
};

// goBack function
const goBack = () => {
    location.reload();
};

// clearHighscores function
const clearHighscores = () => {
    highscoresContainer.innerHTML = '';
    localStorage.clear();
};

// viewHighscores function
const viewHighscoresFunc = () => {
    navBar.classList.add('hidden');
    startQuizDiv.classList.add('hidden');
    progressQuizDiv.classList.add('hidden');
    endQuizDiv.classList.add('hidden');
    highscoresQuizDiv.classList.remove('hidden');
    highscoresArray = Object.values(JSON.parse(localStorage.getItem('players')) ?? 0);
    highscoresArray.sort((a, b) => b.score - a.score);
    highscoresArray.forEach((e, i) => {
        let pElement = document.createElement('p');
        let name = e.name;
        let score = e.score;
        pElement.innerHTML = i + " " + name + ' - ' + score;
        highscoresContainer.append(pElement);
    });
};

// startQuiz function
const startQuiz = () => {
    quizInterval = setInterval(() => {
        secondsLeft--;
        timeTracker.innerHTML = 'Time Left: ' + secondsLeft;
        if (secondsLeft <= 0) {
            clearInterval(quizInterval);
            timeTracker.innerHTML = 'Time Left: ' + secondsLeft;
            endQuiz();
        }
        }, 1_000);
    startQuizDiv.classList.add('hidden');
    progressQuizDiv.classList.remove('hidden');
    displayQuestion();
};

// Adding 'click' type event listeners
startBtn.addEventListener('click', startQuiz);
progressOption1.addEventListener('click', checkAnswer);
progressOption2.addEventListener('click', checkAnswer);
progressOption3.addEventListener('click', checkAnswer);
progressOption4.addEventListener('click', checkAnswer);
endForm.addEventListener('submit', highscores);
viewHighscores.addEventListener('click', viewHighscoresFunc);
goBackBtn.addEventListener('click', goBack);
clearScoresBtn.addEventListener('click', clearHighscores);