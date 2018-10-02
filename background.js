
chrome.storage.sync.get(["volume"], function(setting) {
	if (setting.volume == undefined) {
		chrome.storage.sync.set({"speed": "2.5"});
		chrome.storage.sync.set({"volume": "0.5"});
		chrome.storage.sync.set({"language": "en-US"});
	}
});

var image = document.createElement("img");
image.src = chrome.extension.getURL("icon128.png");
image.id = "wikipronounce";
image.style = "width: 25px; height: 25px; margin-left: 7px; margin-bottom: 5px; cursor: pointer";
document.getElementById("firstHeading").appendChild(image);

var articleName = document.getElementById("firstHeading").innerHTML;
image.addEventListener("click", function(){
	sendTTS(articleName);
});

image.addEventListener("mousedown", function() {
	this.style = "width: 25px; height: 25px; margin-left: 7px; margin-bottom: 5px; cursor: pointer; filter: brightness(50%);";
});

image.addEventListener("mouseup", function() {
	this.style = "width: 25px; height: 25px; margin-left: 7px; margin-bottom: 5px; cursor: pointer; filter: brightness(100%);";
});

function sendTTS(articleName) {
	getSettings(function(volume, speed, language) {
		var msg = new SpeechSynthesisUtterance();
		var voices = window.speechSynthesis.getVoices();
		msg.voice = voices[0]; 
		msg.voiceURI = 'native';
		msg.volume = volume;
		msg.language = language;
		msg.rate = speed;
		msg.pitch = 2;
		msg.text = articleName;
		speechSynthesis.speak(msg);
	});
}

function getSettings(_callback) {
	chrome.storage.sync.get(["volume","speed","language"], function(setting) {
		var volume = +parseFloat(setting.volume).toFixed(2);
		var speed = +parseFloat(setting.speed).toFixed(2);
		var language = setting.language;
		_callback(volume, speed, language);
	});
}

// Icon made by Smashicons from www.flaticon.com 