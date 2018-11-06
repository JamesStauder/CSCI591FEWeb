var w;

function startWorker(fileName) {
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker(fileName);
        }
        w.onmessage = function(event) {	
			var elem = document.createElement('div');
			elem.innerHTML = event.data;
			document.body.appendChild(elem);
        };
    } else {
        document.getElementById("result").innerHTML = "Sorry! No Web Worker support.";
    }
}