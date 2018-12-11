//issues:
//	1.when multiple equal presses, doesn't push that value when another operator used
//	2.pemdas is used to calculate long equations, should not be the case

$(document).ready(function(){
	var input = [];
	var operands = [];

	var operators = ['/','*','+','-'];
	var decimal = ['.'];
	var operatorSequence = [];
	var numbers = [0,1,2,3,4,5,6,7,8,9];
	var count = 0; //number of times a button pressed before clear
	var eqCount = 0; //number of times equals pressed before clear
	
	function update(){
		$('#process').html(input);
		count++;
		console.log(input, operatorSequence);
	}

	function getTotal(){	
		// operands = [$('#numDisplay').text(),input[input.length - 2],input[input.length-1]];
		$('#numDisplay').html(roundTo(eval(input.join('')), 5));
	}
	
	function operate(){ 
		if(operatorSequence[operatorSequence.length-1] === "="){
			input = [];
			input.push($('#numDisplay').text());
		}
		if(operatorSequence[operatorSequence.length-1] != "=" && count != 0){//if last ind. of opSeq not "="
			input.push($('#numDisplay').text()); //and some numbers pressed, then push those numbers
		}
		if(findOne(input, operators) === true){ //calls getTotal when multiple presses of operator button 
				getTotal(); 
			}
		count = -1; //update makes this 0, fulfilling reset condition to replace html
		// input.push(this.id.bind());  how to bind this to buttons?

	}
	function reset(){ //called when number pressed: if operator is lastindex, replace numdisplay with input
		if(input.length === 0 || operators.indexOf(input[input.length-1]) != -1){ // or input is empty(to replace initial 0)
			if(count === 0){
				$('#numDisplay').html('');
			}
		}
		eqCount = 0; // solved issue of: when eq pressed, next number would not get pushed to input
	}
	function findOne(haystack, needle){
		return needle.some(function(v){
			return haystack.indexOf(v) >= 0;
		});
	}	

	function roundTo(num, dec) { //rounds num to dec places
    	return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	}
	$('button').on("click", function(){ //when any button is clicked
		// document.getElementById(this.id).style.transform = 'translate(0,2px)';

//numbers
		if(this.id === "decimal"){
			if($('#numDisplay').text().indexOf('.') === -1){
				$('#numDisplay').append(".");	
			}		
		}
		if(this.id === "zero"){
			reset();			
			$('#numDisplay').append(0);	
		}
		if(this.id === "one"){
			reset();			
			$('#numDisplay').append(1);	
		}
		if(this.id === "two"){
			reset();
			$('#numDisplay').append(2);	
		}
		if(this.id === "three"){
			reset();			
			$('#numDisplay').append(3);	
		}
		if(this.id === "four"){		
			reset();	
			$('#numDisplay').append(4);	
		}
		if(this.id === "five"){
			reset();
			$('#numDisplay').append(5);	
		}
		if(this.id === "six"){		
			reset();	
			$('#numDisplay').append(6);	
		}
		if(this.id === "seven"){		
			reset();	
			$('#numDisplay').append(7);	
		}
		if(this.id === "eight"){
			reset();
			$('#numDisplay').append(8);	
		}
		if(this.id === "nine"){
			reset();
			$('#numDisplay').append(9);	
		}
//operations: code seems redundant, needs bind
		if(this.id === "="){
			if(eqCount > 0){
				if(input[input.length-2] === "+" || input[input.length-2] === "*"){ //order of calculation when + or * vs when - or /
					$('#numDisplay').html(roundTo(eval([input[input.length-1],input[input.length-2],$('#numDisplay').text()].join('')),5));
				}
				else{
					$('#numDisplay').html(roundTo(eval([$('#numDisplay').text(),input[input.length-2],input[input.length-1]].join('')),30));					
				}
			}
			else {
				input.push($('#numDisplay').text());
				getTotal();
				operatorSequence = [];		
				operatorSequence.push(this.id);	
			}
			eqCount++;
		}			
		if(this.id === "/"){
			operate();
			if(operators.indexOf(input[input.length-1]) > -1 || input.length == 0){
				
				return console.log('invalid keypress');
			}
			input.push(this.id); 						
			operatorSequence.push(this.id);
		}
		if(this.id === "*"){
			operate();
			if(operators.indexOf(input[input.length-1]) > -1 || input.length == 0){
				
				return console.log('invalid keypress');
			}
			input.push(this.id); 						
			operatorSequence.push(this.id);
		}
		if(this.id === "+"){
			operate();
			if(operators.indexOf(input[input.length-1]) > -1 || input.length == 0){
				
				return console.log('invalid keypress');
			}
			input.push(this.id); 						
			operatorSequence.push(this.id);
		}
		if(this.id === "-"){
			operate();
			if(operators.indexOf(input[input.length-1]) > -1 || input.length == 0){
				
				return console.log('invalid keypress');
			}
			input.push(this.id); 						
			operatorSequence.push(this.id);
		}	
		if(this.id === "clear"){
			input = [];
			operatorSequence = [];
			operands = [];
			$('#numDisplay').html('0');	
			count = -1; //update will make this zero again, reset condition fulfilled
			eqCount = 0;
		}
		if(this.id === "clearEntry"){
			input.pop();
			operatorSequence = [];
			$('#numDisplay').html('0');
			count = -1;  //update will make this zero again, reset condition fulfilled
			eqCount = 0;
		}
		update();
	});	
});


//operators.indexOf(this.id) ask about this, scope. When function is placed, will it get the id of where itis placed?