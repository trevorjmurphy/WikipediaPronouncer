document.getElementById("volume").addEventListener("input", changeVolume);
document.getElementById("speed").addEventListener("input", changeSpeed);
document.getElementById("volume").addEventListener("change", setVolume);
document.getElementById("speed").addEventListener("change", setSpeed);
document.getElementById("language").addEventListener("change", setLanguage);

chrome.storage.sync.get(["volume"], function(setting) {
	if (setting.volume == undefined) {
		chrome.storage.sync.set({"speed": "2.5"});
		chrome.storage.sync.set({"volume": "0.5"});
		chrome.storage.sync.set({"language": "en-US"});
	}
	chrome.storage.sync.get(["volume","speed","language"], function(setting) {
		document.getElementById("volumePercent").textContent = setting.volume * 100 + "%";
		document.getElementById("volume").value = setting.volume;
		document.getElementById("speedPercent").textContent = setting.speed * 10 + "%";
		document.getElementById("speed").value = setting.speed;
		document.getElementById("language").value = setting.language;
	});
});

function changeVolume() {
	document.getElementById("volumePercent").textContent = Math.round(document.getElementById("volume").value * 100) + "%";
}
function changeSpeed() {
	document.getElementById("speedPercent").textContent = Math.round(document.getElementById("speed").value * 10) + "%";
}

function setVolume() {
	chrome.storage.sync.set({"volume": document.getElementById("volume").value});
}

function setSpeed() {
	chrome.storage.sync.set({"speed": document.getElementById("speed").value});
}

function setLanguage() {
	chrome.storage.sync.set({"language": document.getElementById("language").value});
}

