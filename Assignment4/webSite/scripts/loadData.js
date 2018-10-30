/*var i = 0;

function timedCount() {
    i = i + 1;
    postMessage(i);
    setTimeout("timedCount()",500);
}

timedCount();
*/
var dateArray = [];
var gdpArray = [];
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
		for (var i = 0; i < myObj[1].length; i++){
			dateArray.push(myObj[1][i].date);
			gdpArray.push(myObj[1][i].value);
		}
	
		var myString = "";
		for (var i = dateArray.length-1; i >-1; i--){
			postMessage(dateArray[i] + ": " + gdpArray[i]);
		}
    }
};
xmlhttp.open("GET", "../json/usGDP.json", true);
xmlhttp.send();

