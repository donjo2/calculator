"use strict";
	//declare global variables from DOM
	let $icon = document.getElementById("menu-icon");
	let $menu = document.querySelector(".menu");
	let $info = document.querySelector(".info-box");
	let $output = document.getElementById("output"); //Calculator screen for entered values;
	let $result = document.getElementById("result"); //screen for computed results
	const showFuncs = document.querySelector(".func");

	//Menu controls
	const $darkMode = document.querySelector("#dark") ;
	const $func = document.querySelector("#func");
	const $help = document.querySelector("#help");
	const $credit = document.querySelector("#credit");
	const $creditBox =document.querySelector(".credit");

	//global variables
	let memory = ""; //stores only a single value commited to memory

	//core functions
	function calc(){
		//calculates the inputs as displayed on the screen
		//first change ^ to ** and sqrt to Math.sqrt

		let inps;
		if($output.value){
			inps = $output.value;
		}else{
			inps =0;
		}
		let inps1 = inps.replace(/\^/,"**");
		let inps2 = inps1.replace(/sqrt/, "Math.sqrt");

		//replace operators
		let inps3 = inps2.replace(/--/g, "+"); //converts -- to + obeying mathematical principles
		return eval(inps3);
	}

	function calVal(){
		let a = calc();
		if(a===undefined){
			return;
		}
		$result.value = a;
		$output.value = a;
	}

	function calcReciprocal(){
		let x = calc();
		if(x === undefined)return;
		$result.value = 1/x;
		$output.value = 1/x
	}

	function calcPercent(){
		let x = calc();
		if(x === undefined)return;
		$result.value = x * 100;
		$output.value = x*100;
	}

	function clearEntry(){
		let inps = $output.value;
		if(inps ==""){
			return;
		}
		$output.value =inps.substring(0, inps.length-1);
	}

	function clearAll(){
		$output.value = "";
		$result.value= "";
	}

	function addToMemory(){
		memory = $output.value;
	}

	function memoryRecall(){
		if(memory ==""){
			//if memory is empty, return null
			return;
		}else{
			//else, add memory value to output screen
			$output.value = $output.value + memory;
		}
	}

	//utility functions
	//1. addVal() - add val to screen
	//2. toggleClass() - toggles element's class
	function addVal(x){
		$output.textContent = $output.textContent + x;
	}

	function toggleClass(elem, klass){
		elem.classList.toggle(klass);
	}



//adds current year to footer section
let $year = document.querySelector(".year");
$year.textContent = new Date().getFullYear();
	//event listeners
	$icon.addEventListener("click", function(){
		toggleClass($menu, "show");
	});

	//event listeners
	$func.addEventListener("click", function(){
		toggleClass(showFuncs,"show");
		toggleClass($menu, "show"); //immediately hides the menu
	});

$help.addEventListener("click", function(){
	toggleClass($info, "show");
	toggleClass($menu, "show"); //immediately hides the menu

});
let $closeInfo = document.getElementById("closeInfo");
$closeInfo.addEventListener("click", function(){
	toggleClass($info, "show");
});

$credit.addEventListener("click", function(){
	toggleClass($creditBox, "show");
	toggleClass($menu, "show"); //immediately hides the menu

});
let $closeCredit = document.querySelector("#closeCredit");
$closeCredit.addEventListener("click", function(){
	toggleClass($creditBox, "show");
});

//change theme
$darkMode.addEventListener("click", function(){
	let x = document.querySelector("html");
	if($darkMode.textContent.toLowerCase()=="dark mode"){
		//adds dark theme styles to the document
			x.style="--bg-main:#000; --bg-light:#333; --bg-secondary:#aaaaaa88; --btn-bg:#000;--bnt-ctrl-red:#400;";
			$darkMode.textContent = "Light mode"; //changes Dark mode menu to Light mode
	}else if($darkMode.textContent.toLowerCase()=="light mode"){
		//Return the document's style to the default - light mode
		x.style="--bg-main:#0d0010; --bg-light:#c7c7c7; --bg-secondary:#e6e6e6; --btn-bg:#29032c;--bnt-ctrl-red:#b30c04; --font-color:#888;";
		$darkMode.textContent = "Dark mode"; //Changes theme text to Dark mode
	}
	toggleClass($menu, "show"); //immediately hides the menu
});


//keyboard support
document.addEventListener("keydown", checkKeyVal);
function checkKeyVal(e){
	e.preventDefault();
	let a = e.key;
	const permitted = ["0", "1", "2", "3", "4", "5", "6", "7", "8" ,"9","+", "-", "/", "*", ".", "^", "(", ")"];
	if(a == "Backspace"){
		//clears the entry to the right of the screen if the Backspace key is pressed
		clearEntry();
	}else if(a == "Delete"){
		//clears all values from both screens if the Delete button is pressed
		clearAll();
	}else if(a == "Enter"){
		// Calculates the value on the screen when the Return or Enter key is pressed
		calVal();
	}else{
		if(permitted.includes(a)){
			//if the key pressed exists in the permitted lists, add the value to the output screen
			$output.value = $output.value +a;
		}
	}
}
