var ROTATIONS = ["7", "20", "52", "90", "128", "160", "173", "180"];

function spin(line) {
	var j=0;
	var spinIntervals = [];

	if (line == undefined) {
		return;
	}
	
	line.style.display="unset";
	spinIntervals = spinIntervals.concat(setInterval(() => { 
		if (j >= ROTATIONS.length-1) {
			spinIntervals.map((interval) => { 
				clearInterval(interval); 
			});
		}
		line.style.transform="rotate($1deg)".replace("$1", ROTATIONS[j]); 
		line.style.opacity="$1".replace("$1", (j+3)/10); 
		j = j+1;
	}, 70));
}

function randomArray(n) {
	// create an array of unique randoms numbers 0..n
	var temp, numbers = [];
	for (var i=0; n > i; i++) {
		while((temp=findIndex(Math.floor(Math.random() * n), numbers))==-1);
		numbers[i] = temp;
	}
	return (numbers);
}

function findIndex(num,array) {
	// return index of num in array, or -1 if not in array
	for (var i=0; array.length > i; i++) {
		if (num == array[i]) {
			return (-1);
		}
	}
	return (num);
}

// immediately invoked function expression to run the code
(() => {
	var lines = document.getElementsByClassName("wiggle");

	// apply initial style to lines
	for (var line of lines) {
		line.style.opacity = 0.2;
		line.style.display="none";
		line.style.transition="all 0.1s";
		line.style["transform-origin"]="$1px $2px".replace("$1", (line.x1.baseVal.value + line.x2.baseVal.value) / 2).replace("$2", (line.y1.baseVal.value + line.y2.baseVal.value) / 2); 
	};
	
	var randomLineIndices = randomArray(lines.length);

	var interval = setInterval(() => {
		if (randomLineIndices.length == 0) {
			clearInterval(interval);	
		}
		spin(lines[randomLineIndices.pop()]);
	}, 50);
})();
