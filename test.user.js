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

	let settingContainer = Critterguration.registerSettingsMenu({ id: "test", name: "Test" });
	settingContainer.innerText = "Welcome to the test settings page!";

	settingContainer.createInput("Yes", "text", (value) => {
		console.log("You said", value);
	});

	let nameGroup = settingContainer.createInputRow("Name");
	nameGroup.createInput("FirstName", "text");
	nameGroup.createInput("Second Name", "text");


	let hmmContainer = Critterguration.registerSettingsMenu({ id: "hmm", name: "HMM" });
	hmmContainer.innerText = "Welcome to Hmm World";

	Critterguration.openSettings();

})();