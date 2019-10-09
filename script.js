

let storeNumbers = []; //basılan rakamların ana ekranda toplandığı genel liste
let scrString = ""; //ekran ana görüntüsünün oluşturulduğu string
let minutes = []; //sayı olarak dakikaların toplanması
let hours = [];	//sayı olarak saatlerin toplanması
let totalHours = 0;
let totalMinutes = 0
let totalLog = "";
let isNegative = false;
let isEquelPressed = false;
let isSignsLocked = false;
let upperScrArray = [];

const resetAll = () => {
	storeNumbers = [];
	minutes = [];
	hours = [];
	totalLog = "";
	isNegative = false;
	isEquelPressed = true;
	upperScrArray = false;
}


const screenString = () => {
	/* Ana ekranda görünecek rakamların formatını ayarlar */
	scrString = storeNumbers.join("").replace(/\s/g, '');
	let l = scrString.length;
	if (l === 0 ) { 
		scrString = "00:00"; 
	} else if (l === 1) {
		scrString = "00:0" + scrString;
	} else if (l === 2) {
		scrString = "00:" + scrString;
	} else if (l === 3) {
		scrString = "0" + scrString.slice(0,1) + ":" + scrString.slice(-2);
	} else {
		scrString = scrString.slice(0,-2) + ":" + scrString.slice(-2);
	}

	

	document.getElementById("maintime").innerHTML = scrString;
}

const sumString = () => {
	let minute = Number(storeNumbers.join("").replace(/\s/g,'').slice(-2));
	let hour = Number(storeNumbers.join("").replace(/\s/g,'').slice(0,-2));
	if (isNegative === true){
		hour = -hour;
		minute = - minute
	}
	hours.push(hour);
	minutes.push(minute);
	totalHours = hours.reduce((accumulator, num) => {
		return accumulator + num
	},0);
	totalMinutes = minutes.reduce((accumulator, num) => {
		return accumulator + num
	},0);
	if (totalMinutes%60 < 10) {
		totalLog = (totalHours + parseInt(totalMinutes/60)) + ":0" 
					+ (totalMinutes % 60);
	} else {
		totalLog = (totalHours + parseInt(totalMinutes/60)) + ":" 
					+ (totalMinutes % 60);
		}

	if (totalLog.length === 4) {
		totalLog = "0" + totalLog;
	}
	storeNumbers = [];
	if (isSignsLocked===false) {
	document.getElementById("maintime").innerHTML = totalLog;}

}

const upperScrString = () => {
	let uprScrStrg = upperScrArray.join("");
	document.getElementById("acctime").innerHTML = uprScrStrg;
}

const resetUpperScr = () => {
	
	if (isEquelPressed === true) {
		document.getElementById("acctime").innerHTML = "";
		upperScrArray = [];
		}
	isEquelPressed = false;
}

const clicknumbers = (buttonid) => {

	const x = document.getElementById(buttonid);
	const y = Number(x.textContent);
	x.addEventListener("click", function() {
		isSignsLocked = false;
		resetUpperScr();
		storeNumbers.push(y);
		screenString();
		
	})
}

const clickplus = () => {
	const plus = document.getElementById("plus");
	plus.addEventListener("click", function(){
	
	if (isSignsLocked === false) {	
		sumString();
		isNegative = false;
		//resetUpperScr();//
		upperScrArray.push(scrString);
		upperScrArray.push(" + ");
		upperScrString();
		console.log(upperScrArray);
	}
	isSignsLocked = true;	
	})
} 

const clickminus = () => {
	const minus = document.getElementById("minus");
	minus.addEventListener("click", function(){
		if (isSignsLocked === false){
		sumString();
		isNegative = true;
		//resetUpperScr();
		upperScrArray.push(scrString);
		upperScrArray.push(" - ");
		upperScrString();
	}
	isSignsLocked = true;	
	})
}

const clickequal = () => {
	const equal = document.getElementById("equal");
	equal.addEventListener("click", function(){
		if (isSignsLocked === false) {
		sumString();
		isNegative = false;
		hours = [];
		minutes = [];
		upperScrArray.push(scrString);
		upperScrArray.push(" = " + totalLog);
		upperScrString();
		storeNumbers = [];
	}
		isSignsLocked = true;
		isEquelPressed = true;

	})
}

const clickCE = () => {
	const CE = document.getElementById("CE");
	CE.addEventListener("click", function(){
		storeNumbers = [];
		screenString();
	})
} 

const clickAC = () => {
	const AC = document.getElementById("AC");
	AC.addEventListener("click", function(){
		resetAll();
		screenString();
		resetUpperScr();
	})
}

clicknumbers("num1");
clicknumbers("num2");
clicknumbers("num3");
clicknumbers("num4");
clicknumbers("num5");
clicknumbers("num6");
clicknumbers("num7");
clicknumbers("num8");
clicknumbers("num9");
clicknumbers("num0");
clickplus();
clickminus();
clickequal();
clickCE();
clickAC();