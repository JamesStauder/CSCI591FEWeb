var empType = "";
var buttonSelected = "";
function checkContactFields(){
    if (checkFName() == false){
        return;
    }

    if (checkLName() == false){
        return;
    }
    if (checkEmail() == false){
        return;
    }
    if (checkEmail() == false){
        return;
    }
    if (checkComment() == false){
        return;
    }
    window.alert("Thank you for sending us a message!");
    window.location = "contact.html";
}

function checkFName(){
    var fName = document.getElementById("firstname");
    if (fName.value == ""){
        window.alert("Please enter your first name.");
        fName.style.background = "#ff0000";
        return false;
    }
    return true;
}

function checkLName(){
    var lName = document.getElementById("lastname");
    if (lName.value == ""){
        window.alert("Please enter your last name.");
        lName.style.background = "#ff0000";
        return false;
    }
    return true;
}

function checkEmail(){
    var email = document.getElementById("email");
    if (email.value == ""){
        window.alert("Please enter your email.");
        email.style.background = "#ff0000";
        return false;
    }
    return true;
}

function checkComment(){
    var comment = document.getElementById("comment");
    if (comment.value == ""){
        window.alert("Please enter a comment.");
        comment.style.background = "#ff0000";
        return false;
    }
    return true;
}





function checkRegistrationFields(){
    if(checkUsername() == false){
        return;
    }

    if(checkPassword() == false){
        return;
    }
    if(checkEmpType() == false){
        return;
    }
    

    var info = [document.getElementById('username').value, document.getElementById('password').value, empType];
    addCookie('profile', info);
    window.alert("Thank you for registering!");
    window.location.replace("./experience.html")
}

function checkUsername(){
    var username = document.getElementById("username");
    if(username.value == ""){
        window.alert("Please enter a username.");
        username.style.background = "#ff0000";
        return false;
    }
    return true;
}

function checkPassword(){
    var username = document.getElementById("password");
    if(password.value == ""){
        window.alert("Please enter a password.");
        password.style.background = "#ff0000";
        return false;
    }
    return true;
}

function checkEmpType(){
    if(empType == ""){
        window.alert("Please select an employer type.");
        return false;
    }
    return true;
}


function setEmployerType(buttonSelectedId){
    empType = buttonSelectedId;
    if(buttonSelected != ""){
        buttonSelected.style.background = "#ffffff";
    }
    buttonSelected = document.getElementById(empType);
    buttonSelected.style.background = "#00ff00";
}




function makeWhite(control){
    control.style.background = "#ffffff";
}

function highlightField(control){
    control.style.background = "#ffff00";
}
