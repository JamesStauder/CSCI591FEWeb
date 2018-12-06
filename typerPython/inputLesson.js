
var questions = []
var answers = []
function saveLesson(){
	
	var name = document.getElementById('name').value;
	var lesson = {
		'Name' : name,
		'Game' : document.getElementById('sel1').value,
		'Description' : document.getElementById('desc').value,
		'Questions' : questions,
		'Answers' : answers
	}
	document.getElementById('desc').value = "";
	document.getElementById('question').value = "";
	document.getElementById('answer').value = "";
	document.getElementById('name').value = "";
	

	window.alert('Lesson submitted!');

}
function submitQuestion(){
	var question = document.getElementById('question').value;
	var answer = document.getElementById('answer').value;
	
	answers.push(answer);
	questions.push(question);
	document.getElementById('question').value = "";
	document.getElementById('answer').value = "";

}