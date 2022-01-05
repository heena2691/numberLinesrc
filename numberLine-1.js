$(function() {
	var canvasSize = document.querySelector('canvas');
	fitToContainer(canvasSize);
	var canvas;
	var ctx;
	var x = 75;
	var y = 50;
	var x1 =200;
	var y1 = 250;
	// var WIDTH = 1000;
	// var HEIGHT = 500;
	var WIDTH = canvasSize.offsetWidth-10;
	var HEIGHT = canvasSize.offsetHeight-17;
	var dragok = false;
	
	var xPosition0 = WIDTH/5;
	
	//To create number Line
	var starti=0;
	var endi=20;
	var interval = 30;
	
	//To manage numbers inpute buy the user related 
	const arrayNum = [];
	const countOccurrences = (arr, el) => arr.reduce((arr, n) => (n === el ? arr + 1 : arr), 0);
	function fitToContainer(canvasSize){
		canvasSize.style.width='100%';
		canvasSize.style.height='100%';
		canvasSize.width  = canvasSize.offsetWidth;
		canvasSize.height = canvasSize.offsetHeight;
	  }
	//canvas.addEventListener("mousedown", getPosition, false);
	//$("#canvas").mousedown(function(e){handleMouseDown(e);});
	function rect(x,y,w,h) {
		ctx.beginPath();
		ctx.rect(x,y,w,h);
		ctx.closePath();
		ctx.fill();
	}

	function clear() {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
	}

	const resetButton = document.querySelector("#rstBtn");
	const calculateButton = document.querySelector("#calcBtn");
	resetButton.addEventListener('click', (resetSelections) => {
		console.log('reset Button CLicked');
	});
	calculateButton.addEventListener('click', (calculate) => {
		let arr = arrayNum.map(e => (e-190)/30);
		let checkNumberSelected = checkNumberSelection(arr);
		let calcTypeSelected = calculationTypeSelected();
		if(checkNumberSelected && calcTypeSelected) {
			calcType = document.querySelectorAll('input[name="calc"]:checked')[0].value;
			calculateFinalAnswer(arr, calcType);
		}
	});

	function checkNumberSelection (arr) {
		if(arr.length === 0) {
			document.querySelector('.numberSelected').classList.add("errorMsg");
			return false;
		} 
		else {
			document.querySelector('.numberSelected').classList.remove("errorMsg");
			return true;
		}
	} 
	function calculationTypeSelected () {	
		if(document.querySelectorAll('input[name="calc"]:checked').length >0) {
			document.querySelector('.calcTypes').classList.remove("errorMsg");
			return true;
		}
		else {
			document.querySelector('.calcTypes').classList.add("errorMsg");
			return false;
		}
	} 
	
	function calculateFinalAnswer(arr, calcType) {
		switch(calcType) {
			case 'mean':
				console.log('mean selected');
				break;
			case 'median':
				console.log('median selected');
				break;
			case 'mode':
				console.log('mode selected');
				break;
			case 'range':
			console.log('range selected');
			break;
			default :
				break;
		}
	}

	function init() {
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		return setInterval(draw, 10);
	}

	function draw() {
		clear();
		ctx.fillStyle = "#FFF";
		rect(0,0,WIDTH,HEIGHT);
		createNumberLine();
		createUserValueArrow();
		drawCircles();
	}
    function drawCircles() {
		const uniqueValues = Array.from(new Set(arrayNum));
		for (const val of uniqueValues) {
		  const n = countOccurrences(arrayNum, val);
		  for (let i = 0; i < n; i++) {
			ctx.beginPath();
			ctx.arc(val+9,(HEIGHT/1.5-17)-(i*30),15,0,2*Math.PI);
			ctx.stroke();
		  }
		}
	}
	// function drawCircle(x2){
	// 	ctx.beginPath();
	// 	//Get selected number on the number line
	// 	numSelected = (x2-190)/30;
	// 	console.log(x2);
	// 	//ctx.arc(100, 75, 50, 0, 2 * Math.PI);
	// 	ctx.arc(x2+9,(HEIGHT/1.5-17)-((countOccurrences(arrayNum, numSelected))*30),15,0,2*Math.PI);
	// 	// userInputCircles.push(ctx.arc(x2+9,(HEIGHT/1.5-17)-((countOccurrences(arrayNum, numSelected))*30),15,0,2*Math.PI));
	// 	ctx.stroke();
	// 	//calcMean(arrayNum);
	// }
	function createNumberLine() {
		if(document.querySelector("#selectedVals").innerHTML === "") {
			document.querySelector("#selectedVals").innerHTML = "No number selected";
		}
		if(document.querySelector("#sortedVals").innerHTML === "") {
			document.querySelector("#sortedVals").innerHTML = "No number selected";
		}
		with(ctx) {
			beginPath();
			lineWidth = 3;
			strokeStyle = '#7cb9e8';
			//Draw the number line
			moveTo(WIDTH/7, HEIGHT/1.5);
			lineTo(6*WIDTH/7, HEIGHT/1.5);
			stroke();  

			//Draw arrow left side - down part
			moveTo(WIDTH/7, HEIGHT/1.5);
			lineTo(WIDTH/7+10, HEIGHT/1.5+10);
			stroke();

			//Draw arrow left side - up part
			moveTo(WIDTH/7, HEIGHT/1.5);
			lineTo(WIDTH/7+10, HEIGHT/1.5-10);
			stroke();

			//Draw arrow right side - down part
			moveTo(6*WIDTH/7, HEIGHT/1.5);
			lineTo(6*WIDTH/7-10, HEIGHT/1.5+10);
			stroke();

			//Draw arrow right side - up part
			moveTo(6*WIDTH/7, HEIGHT/1.5);
			lineTo(6*WIDTH/7-10, HEIGHT/1.5-10);
			stroke();

			//For loop for drawing number line with scale 
			for(var i = starti;i <= endi; i++) {
				beginPath();
				strokeStyle = '#4682b4';
				lineWidth = 3;
				moveTo(WIDTH/5+ i * interval, HEIGHT/1.5 - 10);
				lineTo(WIDTH/5 + i * interval, HEIGHT/1.5 + 10);
				fillStyle = '#4682b4';
				fillText(i, (WIDTH/5 + i * interval )- 5, HEIGHT/1.5 + 25);
				if(!i) {
					strokeStyle = '#000';
				}
				fill();
				stroke();
			}
			//createUserValueArrow();

		}
	}
	function createUserValueArrow() {
		with(ctx) {
			fill();
				
			strokeStyle = '#000';
			lineWidth = 3;
			
			// draw straight vertical line 
			//moveTo(WIDTH/5, HEIGHT/1.2 - 80);
			//lineTo(WIDTH/5, HEIGHT/1.2 + 5);
			
			moveTo(x1, y1);
			lineTo(x1, y1+85);
			stroke();
			
			// draw the left end of the arrow for the vertical line
			moveTo(x1, y1 +85);
			lineTo(x1+10, y1+96);
			stroke();
			// draw the bottom end of the arrow for the vertical line
			moveTo(x1+10, y1+95.5);
			lineTo(x1-10, y1+95.5);
			stroke();
			// draw the right end of the arrow for the vertical line
			moveTo(x1-10, y1+95.5);
			lineTo(x1, y1 +85);
			stroke();
			
			strokeStyle = '#4682b4';
		}
	}

	function myMove(e){
		if (dragok){
			x = e.pageX - canvas.offsetLeft;
			y = e.pageY - canvas.offsetTop;
			x1= e.pageX - canvas.offsetLeft;
			//y1 = e.pageY - canvas.offsetTop;
		}
	}

	function myDown(e){
		if(e.pageX < x1 + 15 + canvas.offsetLeft && e.pageX > x1 - 15 +
			canvas.offsetLeft && e.pageY < y1 + 45 +canvas.offsetTop &&
			e.pageY > y1 -45 + canvas.offsetTop) {
				x1 = e.pageX - canvas.offsetLeft;
				//y1 = e.pageY - canvas.offsetTop;
				dragok = true;
				canvas.onmousemove = myMove;
		}
		if(!dragok) {
			getPosition(e);
		}
	}
	
	function getPosition(e) {
		const x = e.clientX-e.clientX%interval+10;
		arrayNum.push(x);
		displaySelectedValues(arrayNum);
		sortArray(arrayNum);
	}

	function myUp(){
		dragok = false;
		canvas.onmousemove = null;
	}
	function displaySelectedValues (displaySelectedValues) {
		document.querySelector("#selectedVals").innerHTML =arrayNum.map(e => (e-190)/30).join(", ");
	}
	function sortArray(arr) {
		const arrN = [...arr].sort();
		const sortedArray = arrN.sort(function (a, b) {  return a - b;  });
		document.getElementById("sortedVals").innerHTML = sortedArray.map(e => (e-190)/30).join(", ");
		//calcMedian(sortedArray);
	}

	init();
	canvas.onmousedown = myDown;
	canvas.onmouseup = myUp;
});
