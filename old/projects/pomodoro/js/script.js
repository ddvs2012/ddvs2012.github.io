//known issues: 
//when break timer counts down, pausing will go back to work timer
//same issue when changing break minutes during countdown

var interval;
var started = false;
var clicked = true; //to differentiate when timer is counting down vs paused
var display = document.querySelector('#timer');
var globalMin, globalSec;

var count = 0;

var inputWorkMinutes = document.querySelector('#workMinutes').textContent;
var inputBreakMinutes = document.querySelector('#breakMinutes').textContent;
var switch1 = [inputBreakMinutes*60, inputWorkMinutes*60];

display.textContent = inputWorkMinutes + ":00";

function pause(){
	clearInterval(interval);
}

//set work and break minutes
function incWM(){
	if ( clicked === false ) {
		pause();
		timeLeft = parseInt( ( (($('#timer').text()[0]) + ($('#timer').text()[1]))), 10)  +  parseFloat( ( ((($('#timer').text()[3]) + ($('#timer').text()[4])) /60)-(1/60)), 10);
		inputWorkMinutes = timeLeft; 
		clicked = true;
	}

	if (inputWorkMinutes < 99) {
		inputWorkMinutes = parseInt(inputWorkMinutes, 10) + 1; //doesnt inc.
		if(inputWorkMinutes < 10){
			display.textContent = '0' + inputWorkMinutes + ":00";	
			$('#workMinutes').text(inputWorkMinutes);
		} else {
			display.textContent = inputWorkMinutes + ":00";	
			$('#workMinutes').text(inputWorkMinutes);
		}
	}
}

function decWM(){
	if ( clicked === false ) {
		pause();
		timeLeft = parseInt( ( (($('#timer').text()[0]) + ($('#timer').text()[1]))), 10)  +  parseFloat( ( ((($('#timer').text()[3]) + ($('#timer').text()[4])) /60)-(1/60)), 10);
			inputWorkMinutes = timeLeft; 
		clicked = true;
	}
	if (inputWorkMinutes > 1) {
		inputWorkMinutes = parseInt(inputWorkMinutes, 10) - 1; //doesnt inc.
		if(inputWorkMinutes < 10){
			display.textContent = '0' + inputWorkMinutes + ":00";	
			$('#workMinutes').text(inputWorkMinutes);
		} else {
			display.textContent = inputWorkMinutes + ":00";	
			$('#workMinutes').text(inputWorkMinutes);
		}
	}
}
////////////////////
function incBM(){
	if ( clicked === false ) {
		pause();
		timeLeft = parseInt( ( (($('#timer').text()[0]) + ($('#timer').text()[1]))), 10)  +  parseFloat( ( ((($('#timer').text()[3]) + ($('#timer').text()[4])) /60)-(1/60)), 10);
			inputWorkMinutes = timeLeft; 
		clicked = true;
	}
	if (inputBreakMinutes < 99) {
		inputBreakMinutes = parseInt(inputBreakMinutes, 10) + 1;
		// display.textContent = inputWorkMinutes + ":0	0";	
		$('#breakMinutes').text(inputBreakMinutes);
	}
}
function decBM(){
	if ( clicked === false ) {
		pause();
		timeLeft = parseInt( ( (($('#timer').text()[0]) + ($('#timer').text()[1]))), 10)  +  parseFloat( ( ((($('#timer').text()[3]) + ($('#timer').text()[4])) /60)-(1/60)), 10);
			inputWorkMinutes = timeLeft; 
		clicked = true;
	}
	if(inputBreakMinutes > 1) {
		inputBreakMinutes = parseInt(inputBreakMinutes, 10) - 1;
			// display.textContent = inputWorkMinutes + ":00";
		$('#breakMinutes').text(inputBreakMinutes);
	}	
}

//holding mouse button down
// var mouseHold = false;

// $('#upWM').mousedown(function() {
// 	mouseHold = true;
// 	fastChange(incWM());
// });

// function fastChange(buttonFuncId) { //pass in the function to repeat
// 	if (!mouseHold) { return; } //when mouse let go, exit function
// 	if (mouseHold) {setInterval(buttonFuncId, 100);} //when mouse held down, repeat the passed in function 10x/sec
// 	console.log(mouseHold);
// }

// $(document).mouseup(function() {
// 	mouseHold = false;
// 	console.log(mouseHold);
// });

function setTimerWork(duration, display){ //time in minutes, where to display
	var timer = duration, minutes, seconds;
	interval = setInterval(function() {
		
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);

		// minutes = minutes < 10 ? '0' + minutes : minutes;

		seconds = seconds < 10 ? '0' + seconds : seconds;
		minutes = minutes < 10 ? '0' + minutes : minutes;

		display.textContent = minutes + ":" + seconds;
		
		if (--timer < 0) {
            ring.play(); //broken on mobile?
            clearInterval(interval);
			setTimerBreak(inputBreakMinutes*60, display);
        }
        tick.play();

	}, 1000)
}

function setTimerBreak(duration, display){ //time in minutes, where to display
	var timer = duration, minutes, seconds;
	interval = setInterval(function() {
		
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);

		// minutes = minutes < 10 ? '0' + minutes : minutes;

		seconds = seconds < 10 ? '0' + seconds : seconds;
		minutes = minutes < 10 ? '0' + minutes : minutes;

		display.textContent = minutes + ":" + seconds;
		
		if (--timer < 0) {
            breakOver.play(); //broken on mobile?
            clearInterval(interval);
			setTimerWork(inputWorkMinutes*60, display);
        }
        breakTick.play(); //broken on mobile?

	}, 1000)
}


function startStop(){
	started = true;
	
		if (clicked === true) {
			setTimerWork(inputWorkMinutes*60, display); //reference back 1st arg to save state?
			clicked = false
			console.log(clicked);
		} 
		else { //if(clicked === false) doesnt work
			clearInterval(interval);
//parses first 2 digits as minutes, last 2 as seconds (minus one second so when resume, ticks down one second)
			timeLeft = parseInt( ( (($('#timer').text()[0]) + ($('#timer').text()[1]))), 10)  +  parseFloat( ( ((($('#timer').text()[3]) + ($('#timer').text()[4])) /60)-(1/60)), 10);
			inputWorkMinutes = timeLeft; 
			clicked = true;
		}
}



// function resume(){
// 	inputWorkMinutes = 
// }

// function countDown() {
// 	tick.play();

// 	var until = 1000*60*25;

// 	var minutes = Math.floor(until/(1000*60))
// 	var seconds = Math.floor(until/(1000))

// //display
// 	document.getElementById(timer).innerHTML = minutes + "m" + seconds + 's';

// 	if (seconds < 0)

// }