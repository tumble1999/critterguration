// ==UserScript==
// @name        Test
// @namespace    http://boxcrittersmods.ga/
// @version      n/a
// @description  A great extension that lets you easily switch between, add and create new themes to use on Box Critters!
// @author       TumbleGamer
// @logo         https://raw.githubusercontent.com/boxcrittersmods/bc-texture-pack-manager/master/logo.png
// @match        https://boxcritters.com/play/
// @match        https://boxcritters.com/play/?*
// @match        https://boxcritters.com/play/#*
// @match        https://boxcritters.com/play/index.html
// @match        https://boxcritters.com/play/index.html?*
// @match        https://boxcritters.com/play/index.html#*
// @require      https://github.com/tumble1999/popper/raw/master/popper.js
// @require      file:///E:/dev/boxcritters/mods/critterguration/critterguration.js
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
		value => value == new Date().getDay(),//Select the current day
		value => {
			console.log("The day is", value.text);
		});


	let hmmContainer = Critterguration.registerSettingsMenu({ id: "hmm", name: "HMM" });
	hmmContainer.innerText = "Welcome to Hmm World";

	Critterguration.openSettings();

})();