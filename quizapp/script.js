const quizData = [
    {
        question: 'How old is Florin',
        a: '10',
        b: '17',
        c: '26',
        d: '110',
        correct: 'c'
    },
    {
        question: 'What is the most used programmin language in 2019?',
        a: 'Java',
        b: 'C',
        c: 'Python',
        d: 'JavaScript',
        correct: 'd'
    }, {
        question: 'Who is the president of US?',
        a: 'Florin Pop',
        b: 'Donald Trump',
        c: 'Ivan Saldano',
        d: 'Mihai Andrei',
        correct: 'b'
    }, {
        question: 'What does HTML stand for?',
        a: 'HyperText Markup Language',
        b: 'Cascading Style Sheet',
        c: 'Json Object Notation',
        d: 'Helicopters Terminals Mototboats Lamborginis',
        correct: 'a'
    }, {
        question: "What year was JavaScript Launched",
        a: '1996',
        b: '1995',
        c: '1994',
        d: 'none of the above',
        correct: 'b'
    }

];

let score = 0;
const questionEl = document.getElementById('question');
const a_text = document.getElementById("a_text");
console.log("This  is >>",a_text);
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const next = document.getElementById("next");

let currentQuestion = 0;

function loadQuiz() {
    questionEl.innerHTML = quizData[currentQuestion].question;
    a_text.innerHTML = quizData[currentQuestion].a;
    b_text.innerHTML = quizData[currentQuestion].b;
    c_text.innerHTML = quizData[currentQuestion].c;
    d_text.innerHTML = quizData[currentQuestion].d;
    currentQuestion++;
    if (currentQuestion == quizData.length) {
        next.innerHTML = "Submit";
    }
}

loadQuiz();
document.getElementById('next').addEventListener("click", () => {
    let value = document.querySelector('input[name="answer"]:checked').value;
    if (value== quizData[currentQuestion-1].correct){
         score++;
        }
    if (next.innerHTML == 'Next') {
        loadQuiz();        
    }
    else {
        document.querySelector(".quiz-container").innerHTML = `<p style="padding: 3rem; height:200px; font-size: 2rem; display:flex; justify-content: center; align-items:center;">Your Score is: ${score}</p>`
    }
});