var firstNumVar;
var secondNumVar;
var correct;
var minNum;
var maxNum;
var lives;
var names;
var scores;
var questions;


//Function when screen is loaded
function onLoadFunct(){
	correct = 0;
    minNum = 1;
    maxNum = 11;
	
	lives = 3;
	names_scores = [];
	questions = [];
	updateScoreLives();
	setVars();
}

//Function to check if answer is correct
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
		lives = lives -1;
		if (lives == 0){
			window.alert("Game over!");
			endGame();
		}
		else{
			window.alert("Try again!");
		}
	}
	updateScoreLives();
	document.getElementById("answer").value = "";
}

//Function to update the labels with the lives and score
function updateScoreLives(){
	document.getElementById("livesLabel").innerHTML = "Lives: " + lives;
	document.getElementById("scoreLabel").innerHTML = "Score: " + correct;
}

//Function to end game. Have text box that is editable appear.
function endGame(){
	var invElements = document.getElementsByClassName("invisible");
	
	for (var i = 0; i < invElements.length; i++){
		invElements[i].style.visibility = "visible";
	}
	document.getElementById("answer").readOnly = true;
	document.getElementById("answerButton").disabled = true;
}


//Reset screen after the user enters in name for high score
function resetScores(){
	lives = 3;
	correct = 0;
	
    updateScoreLives();
	document.getElementById("answer").readOnly = false;
	document.getElementById("answerButton").disabled = false;
	document.getElementById("highScoreNameLabel").style.visibility = "hidden";
	document.getElementById("highScoreNameText").style.visibility = "hidden";
	document.getElementById("submitScoreButton").style.visibility = "hidden";
	
}

//Function to sort scores at the end.
function sortScores(){

	names_scores.push({"Name": document.getElementById("highScoreNameText").value, "Score" : correct});
	for(var index= names_scores.length-1; index > 0; index--){
		if (names_scores[index].Score > names_scores[index-1].Score){
			temp = names_scores[index];
			names_scores[index] = names_scores[index-1];
			names_scores[index-1] = temp;
		}
		else{
			break;
		}
	}

	var scoreString = "";
	for (var i = 0; i < names_scores.length; i++){
		scoreString = scoreString + "<b>" + names_scores[i].Name + "</b>&nbsp&nbsp&nbsp&nbsp" + names_scores[i].Score;
		scoreString = scoreString + "<br>";
	}

	document.getElementById("scoresList").style.visibility = "visible";
	document.getElementById("scoresList").innerHTML = scoreString;
}

function submitScore(){
	if(checkField()){
		sortScores();
		resetScores();
	}
	else{
		window.alert("Enter a name please!");
	}
}


function checkField(){
	var name = document.getElementById("highScoreNameText");
	if (name.value == ""){
		return false;
	}
	return true;
}

//function to set variables of the math
function setVars(){
    
	if ((correct > 0) && (correct % 5 == 0)){
		minNum = (correct/5) * 10;
		maxNum = minNum+11;
		
	}
	
	for(var i = 0; i < 10; i++){
		questions.push({
		"firstNumVar": Math.floor(Math.random() *(maxNum-minNum) + minNum),
		"secondNumVar": Math.floor(Math.random() *(maxNum-minNum) + minNum)
						});
	}
	
	var randIndex = Math.floor(Math.random() *(10));
	document.getElementById("firstNum").innerHTML = questions[randIndex].firstNumVar;
	firstNumVar = questions[randIndex].firstNumVar;
	document.getElementById("secondNum").innerHTML = questions[randIndex].secondNumVar;
	secondNumVar = questions[randIndex].secondNumVar;
}

/*Taken from stackoverflow
https://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
*/	
function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}


