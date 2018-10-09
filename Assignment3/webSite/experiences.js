var experiences = {"Misc": [], "ComputerScience": [], "Teaching": []};

$(document).ready(function(){
	var promise1 = new Promise(function(resolve, reject) {
		$.get("./misc.json",
			function(data, status){
				for(var i = 0; i < data.length; i++){
					experiences.Misc[i] = data[i];
				}
			loadPage(experiences);
				
		});
		$.get("./comp_sci.json",
			function(data, status){
				for(var i = 0; i < data.length; i++){
					experiences.ComputerScience[i] = data[i];
				}
			loadPage(experiences);
		});
		$.get("./teaching.json",
			function(data, status){
				for(var i = 0; i < data.length; i++){
					experiences.Teaching[i] = data[i];
				}
			loadPage(experiences);
		});		
		
	});
})
	
function loadPage(experiences){	
	
		console.log(experiences.Teaching);
		console.log(experiences.Teaching[0]);
		
		//console.log(experiences);
		var info = getCookie('profile').split(",");
		if (info.length > 1){
	   
			var containerExperiences = d3.select("body")
				.append("h3")
				.style("text-align", "center")
				.text("Username: " + info[0]);

			containerExperiences
				.append("h5")
				.style("text-align", "center")
				.text("THIS IS BROKEN RIGHT NOW. IM NOT SURE WHY");
				//.text("Usergroup: " + info[2]);
			console.log(info[2]);
			var releventData = experiences["Misc"];
			console.log(experiences.length)
			//var parsed = JSON.parse(experiences[info[2]]);
			//console.log(experiences);
			//console.log(parsed);
			//console.log(releventData);
			//console.log(releventData[1]);
			var table = d3.select("body").append("table");
			var thead = table.append("thead");
			var tbody = table.append("tbody");

			var colHeaders = ['Job Title', 'Time Worked', 'Employer'];
			thead.append('tr')
				.selectAll('th')
				.data(colHeaders).enter()
				.append('th')
					.text(function (column) {return column; });

			var rows = tbody.selectAll('tr')
				.data(releventData)
				.enter()
				.append('tr')

			var cells = rows.selectAll('td')
				.data(function (row) {
					return colHeaders.map(function (column) {
						return {column: column, value: row[column]};
					});
				})
				.enter()
				.append('td')
					.text(function (d) { return d.value; });
			
		}

		else{

			var containerExperiences = d3.select("body")
				.append("div")
				.style("text-align", "center")
				.html("<a href='./registration.html'>Please Register!</a>");

		}
		var elem = document.createElement("img");
		elem.setAttribute("height", "60");
		elem.setAttribute("width", "90");
		document.getElementById("picContainer").appendChild(elem);
		if (info[2] == "ComputerScience"){
			elem.src = "./assets/Programmer.jpg";
		}
		
		else if (info[2] == "Teaching"){
			elem.src = "./assets/Teacher.jpg";
		}
		
		else if (info[2] == "Misc."){
			elem.src = "./assets/Waiter.jpg";
		}
		beeRight();
};


function beeLeft() {
    $("#picContainer").animate({left: "-=500"}, 2000, "swing", beeRight);
}
function beeRight() {
    $("#picContainer").animate({left: "+=500"}, 2000, "swing", beeLeft);
}

beeRight();
