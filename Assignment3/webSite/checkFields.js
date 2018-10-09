var empType = "";
var buttonSelected = "";


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
    

    var info = [document.getElementById('username').value, document.getElementById('pssword2').value, empType];
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
    var pssword = document.getElementById("pssword");
    if(pssword.value == ""){
        window.alert("Please enter a password.");
        pssword.style.background = "#ff0000";
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
