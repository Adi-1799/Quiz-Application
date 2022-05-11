//Creating Variables to store and use for DOM
const quizzes = [];//To store fetched data in this array
        //For Quiz Page
const quizBody = document.querySelector("#quizBody");
let currQues = document.getElementById("currQues");
const question = document.querySelector("#questionsDiv");
let answer = document.querySelector("#answer");
        //For buttons
const submit = document.querySelector("#sbmtbtn");
const skip = document.querySelector("#skpbtn");
const abort = document.querySelector("#abrtbtn");
        //To store scores
var score = 0;
var totalAttempted = 0;
var unattempted = 0;
var correct = 0;
var wrong = 0;
        //For results page
const resultBody = document.querySelector('#resultBody');
let totalResultsBody = document.querySelector('#totalResultsBody');
const rstrtbtn = document.querySelector('#rstrtbtn');


//Function to logout
function remove(){
    localStorage.removeItem("isUser");
    // localStorage.setItem("users",JSON.stringify(allUser));
    // localStorage.setItem("login","No");
    location.href= "/MainLoginPage/index.html";
}

//To show details of current loggedin user
var jsonString = localStorage.getItem("isUser");
var retrievedObject = JSON.parse(jsonString);
document.getElementById("namePtag").innerHTML = `${retrievedObject[0].UserName}`;
document.getElementById("emailPtag").innerHTML = `${retrievedObject[0].Email}`;

//Creating Timer
document.getElementById('timer').innerHTML =
  03 + ":" + 00;
startTimer();

function startTimer() {
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if(s==59){
        m=m-1;
    }
    if(m<0){
        alert("Time's Up!!!")
        remove();
        return;
    }
  
document.getElementById('timer').innerHTML =m + ":" + s;
setTimeout(startTimer, 1000);
  
}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
    if (sec < 0) {sec = "59"};
    return sec;
}

//fetching questions
const request = async () => {
    const response = await fetch('https://raw.githubusercontent.com/attainu/attainu-eagle/master/assignments/week-4/day-4/quiz.json');
    const questionAnswer = await response.json();
    for (var i = 0; i < questionAnswer.length; i++) {
        quizzes.push(questionAnswer[i])
    }
   
    let questionCount = 0;

    //Showing questions on the webpage
    const loadQuestion = () => {
        currQues.innerHTML = `<p>Current Question : ${questionCount+1}</p>`;
        const questionList = quizzes[questionCount];
        question.innerText = questionList.question;
    }

    loadQuestion();
    
    //Adding functionalities to the buttons
    submit.addEventListener('click', ()=> {
        
        if(answer.value == quizzes[questionCount].answer){
            score++;
            correct++;
        }
        else{
            if(answer.value == ''){
                totalAttempted--
                unattempted++;
                wrong--;
            }
            if(answer.value != quizzes[questionCount].answer){
            wrong++;
            }
        };
        
        questionCount++;
        totalAttempted++;

        if(questionCount < quizzes.length){

            answer.value='';
            loadQuestion();
        }
        else{
            quizBody.style="display:none;";
            resultBody.style="display:block;";
            res();
        }
    })

    skip.addEventListener('click', ()=> {
        
        questionCount++;
        unattempted++;

        if(questionCount < quizzes.length){
            answer.value='';
            loadQuestion();
        }
        else{
            quizBody.style="display:none;";
            resultBody.style="display:block;";
            res();
        }
    })

    abort.addEventListener('click', ()=> {
        
        function myFunction() {
            let text = "Do You Really want to exit?";
            if (confirm(text) == true) {
                quizBody.style="display:none;";
                resultBody.style="display:block;";
            }
            else {
            }
        }
          myFunction();
    })


}
    
request();


//Results Page

function load () {
    resultBody.style="display:none;";
}

//Showing Results on the webpage
function res(){
    totalResultsBody.innerHTML = `<p>Score : ${score}</p>
    <p>Total Attempted : ${totalAttempted}</p>
    <p>Unattempted : ${unattempted}</p>
    <p>Correct : ${correct}</p>
    <p>Wrong : ${wrong}</p>
    `;
}

//Adding Functionality to Restart Button
rstrtbtn.addEventListener('click', ()=> {
    location.href = '/QuizPage/quizPage.html';
})