$(document).ready(function(){
    var inputFields = $(".inputField");
    inputFields = $.makeArray(inputFields);
	$("#submitButton").click(function(){
        checkAllContactFields(inputFields);
    });
});


function checkAllContactFields(allFields){
    var formValid = true;
    var emailField = "";
    for (var i = 0; i < allFields.length; i++){
        var inputValue = allFields[i].value;

        if (inputValue == ""){
            /*
                Change input field to highlight red
                Change formValid to false
            */
        }
        if (allFields[i].id == "email"){
            emailField = allFields[i];
        }
    }

    if(!formValid){
        window.alert("Please fill out the highlighted fields!");
        break;
    }

    if(!checkEmailField(emailField.value)){
        /*
            Highlight email field to be red
        */
        window.alert("Please enter a valid email!");
        break;
    }

    window.alert("Thank you for submitting your response. I will get to it immediately!");
}


function checkEmailField(emailText){
/*
Check to see if email is valid. If it is return true. Else return false
*/
}


