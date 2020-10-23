// ==UserScript==
// @name         Test
// @namespace    https://boxcrittersmods.ga/authors/tumblegamer/
// @version      n/a
// @description  Critterguration test
// @author       TumbleGamer
// @match        https://boxcritters.com/play/
// @match        https://boxcritters.com/play/?*
// @match        https://boxcritters.com/play/#*
// @match        https://boxcritters.com/play/index.html
// @match        https://boxcritters.com/play/index.html?*
// @match        https://boxcritters.com/play/index.html#*
// @require      https://github.com/tumble1999/modial/raw/master/modial.js
// @require      https://github.com/SArpnt/ctrl-panel/raw/master/script.user.js
// @require      https://github.com/tumble1999/critterguration/raw/master/critterguration.user.js
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
	'use strict';
	console.log(Critterguration);

	let settingContainer = Critterguration.registerSettingsMenu({ id: "test", name: "Test" }, () => {
		console.log("this happens when the tab is opened");
	});
	settingContainer.innerText = "Welcome to the test settings page!";

	settingContainer.createInput("Yes", "text", (value) => {
		console.log("You said", value);
	});

	let nameGroup = settingContainer.createInputRow("Name");
	nameGroup.createInput("FirstName", "text");
	nameGroup.createInput("Second Name", "text");

	settingContainer.createDropdown("Day",
		[
			{ value: "0", text: "Monday" },
			{ value: "1", text: "Teusday" },
			{ value: "2", text: "Wednesday" },
			{ value: "3", text: "Thursday" },
			{ value: "4", text: "Friday" },
			{ value: "5", text: "Saturday" },
			{ value: "6", text: "Sunday" }
		],
		value => value == new Date().getDay(), // Select the current day
		value => {
			console.log("The day is", value.text);
		});

	let testList = settingContainer.createListGroup("Bob");
	testList.addItem("Title", "warning", "Description", "Footer", "Corner", "Badge", () => {
		console.log("This one is the test one");
	}, true);
	testList.addItem("Be", "success", "To be", "That is the question", "Or Not", "To", () => {
		console.log("Shakesphere, Of course.");
	});
	testList.addItem("Ok Yay", "danger", "So I've made this a thing now", "Now people can make these", "Woo-Hoo", "🎈", () => {
		console.log("But now we are here so we can do things with it, many things.");
	});


	let hmmContainer = Critterguration.registerSettingsMenu({ id: "hmm", name: "HMM" });
	hmmContainer.innerText = "Welcome to Hmm World";
})();