
var firstNumVar;
var secondNumVar;
var correct;
var minNum;
var maxNum;
function onLoadFunct(){
	correct = 0;
    minNum = 1;
    maxNum = 11;
	setVars();
}

function checkAnswer(whichFunction){
	answer = document.getElementById("answer").value;

    if(answer == ""){
        window.alert("Enter a number!");
        return;
    }
    if (isInt(answer) == false){
        window.alert("Enter an integer.");
        return;
    }
	isRight = false;
	switch(whichFunction){
		case "addition":
			isRight = (answer == (firstNumVar + secondNumVar));
			break;
		case "subtract":
			isRight = (answer == (firstNumVar - secondNumVar));
			break;
		case "division":
			isRight = (answer == parseInt(firstNumVar / secondNumVar));
			break;
		case "multiply":
			isRight = (answer == (firstNumVar * secondNumVar));
			break;
		default:
			window.alert("ERROR!");
			break;
	}
	if (isRight){
		correct = correct + 1;
		window.alert("CORRECT!");
		setVars();
	}
	else{
		window.alert("Try again!");
	}
	document.getElementById("answer").value = "";
}
function setVars(){
    
	if ((correct > 0) && (correct % 5 == 0)){
		minNum = (correct/5) * 10;
		maxNum = minNum+11;
	}
    
	firstNumVar = Math.floor(Math.random() *(maxNum-minNum) + minNum);
	secondNumVar = Math.floor(Math.random() *(maxNum-minNum) + minNum);
	document.getElementById("firstNum").innerHTML = firstNumVar;
	document.getElementById("secondNum").innerHTML = secondNumVar;
}


/*Taken from stackoverflow
https://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
*/	
function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}


