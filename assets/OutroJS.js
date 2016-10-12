/********** OUTRO SPECIFIC JAVASCRIPT **********/
displayIdleScreen = function() {
	document.getElementById("outro-container").style.display = 'block';
	document.getElementById("top-button").className = 'install-idle';
	document.getElementById("top-button").onclick = clickDownload;
	document.getElementById("bottom-button").className = 'idle-retry';
	document.getElementById("bottom-button").onclick = clickRetry;
	document.getElementById("dl-div").className = 'idle-click-url';
}

displayInstallScreen = function() {
	document.getElementById("outro-container").style.display = 'block';
	document.getElementById("top-button").className = 'install-dl';
	document.getElementById("top-button").onclick = clickDownload;
	document.getElementById("bottom-button").className = 'install-thanks';
	document.getElementById("bottom-button").onclick = clickDownload;
	document.getElementById("dl-div").className = 'install-click-url';
}

displayErrorScreen = function() {
	document.getElementById("outro-container").style.display = 'block';
	document.getElementById("top-button").className = 'error-retry';
	document.getElementById("top-button").onclick = clickRetry;
	document.getElementById("bottom-button").className = 'error-dl';
	document.getElementById("bottom-button").onclick = clickDownload;
	document.getElementById("dl-div").className = 'error-click-url';
}
// this sends the user to the beginning of the game if the retry is clicked and the dl is not clicked
var clickRetry = function() {
	if (typeof startTestDrive != 'undefined') {
		//this is a function in the engineering templates and will only work once this project is uploaded to the UI
		startTestDrive();
	}
	else {
		restartGame();
	}
}
// this sends the user to the itunes page where they can download the game. It also is compatable with our UI
var clickDownload = function() {
	if (typeof mnUserClickDownload != 'undefined') {
		//this is a function in the engineering templates and will only work once this project is uploaded to the UI
		mnUserClickDownload();
	}
	else {
		window.location.href = 'https://itunes.apple.com/us/app/wizard-oz-free-slots-vegas/id916869395?mt=8';
	}
}
/********** OUTRO SPECIFIC JAVASCRIPT **********/