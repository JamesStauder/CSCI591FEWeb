




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
			allFields[i].style.background = "#ff0000";
			formValid = false;
        }
        if (allFields[i].id == "email"){
            emailField = allFields[i];
        }
    }

    if(!formValid){
        window.alert("Please fill out the highlighted fields!");
        return;
    }

    if(!checkEmailField(emailField.value)){
		emailField.style.background = "#ff0000";
		window.alert("Please enter a valid email!");
        return;
    }

    window.alert("Thank you for submitting your response. I will get to it immediately!");
}


function checkEmailField(emailText){
	if (emailText.indexOf('@') > -1 && emailText.indexOf('.') > -1)
	{
	  return true;
	}
	return false;
}


function makeWhite(control){
    control.style.background = "#ffffff";
}

function highlightField(control){
    control.style.background = "#ffff00";
}


