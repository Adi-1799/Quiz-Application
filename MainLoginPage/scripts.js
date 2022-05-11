let loginPage = document.querySelector('#loginPage');
let registerPage = document.querySelector('#registerPage');
let notRegistered = document.querySelector('.notRegisteredBtn');
let goLogin = document.querySelector('.goToLoginBtn');

function load () {
    registerPage.style="display:none;";
}

notRegistered.addEventListener('click', function(){
    event.preventDefault();
    loginPage.style.display = "none";
    registerPage.style.display = "block";
});

goLogin.addEventListener('click', function(){
    event.preventDefault();
    registerPage.style.display = "none";
    loginPage.style.display = "block";
});

function create(){

    var saveName = document.getElementById("nameBoxR").value;
    var saveEmail = document.getElementById("emailBoxR").value;
    var savePassword = document.getElementById("pwdBoxR").value;
    var savepwdAgain = document.getElementById("cnfPwdBoxR").value;
    var allUser = new Array();
    allUser = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[];
    if(allUser.some((v)=>{ return v.Email==saveEmail}))
    {
        alert("User already Registered");
        event.preventDefault();
    }
    else{
        if(savePassword!=savepwdAgain){
            alert("Passwords did not match, Enter again");
            event.preventDefault();
        }
        else {
            allUser.push({
                "UserName": saveName,
                "Email" : saveEmail,
                "Password" : savePassword,
            })
            if(saveEmail=="" || savePassword=="" || saveName=="" || savepwdAgain==""){
                alert("Enter some data");
                event.preventDefault();
            }
            else{
                localStorage.setItem("users",JSON.stringify(allUser));
            } 
        }
    }
}

function login(){
    var checkEmail = document.getElementById("emailBox").value;
    var checkPassword = document.getElementById("pwdBox").value; 
        const allStoredUsers = JSON.parse(localStorage.getItem('users'));
        const matchedUser = allStoredUsers.filter(user => {
            return checkEmail === user.Email && checkPassword === user.Password;
        })
        if (matchedUser.length) {
            
            event.preventDefault();
            location.href = "/QuizPage/quizPage.html";
            // localStorage.setItem("login","yes");
            localStorage.setItem("isUser",JSON.stringify(matchedUser));
        } else {
            alert('Not registered');
            event.preventDefault();
        }
}

// localStorage.setItem("login","No");

// var getLogin = localStorage.getItem("login");

// if(getLogin === "Yes"){
//     event.preventDefault();
//     location.href = "/QuizPage/quizPage.html";
// }
