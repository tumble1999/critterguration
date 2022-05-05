// ==UserScript==
// @name         Test
// @namespace    https://bcmc.ga/authors/tumblegamer/
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

	//returns html elemet you can use append child to to add elements yourself
	let settingContainer = Critterguration.registerSettingsMenu({ id: "test", name: "Test" }, () => {
		console.log("this happens when the tab is opened");
	});
	settingContainer.innerText = "Welcome to the test settings page!";

	//returns html elemet representing the input elememt
	settingContainer.createInput({
		name: "Yes", type: "text", onInput: (value) => {
			console.log("You said", value);
		}
	});


	//returns html element representing the div
	let nameGroup = settingContainer.createInputRow("Name");

	//returns html elemet representing the input elememt
	nameGroup.createInput({ name: "FirstName", type: "text" });
	nameGroup.createInput({ name: "Second Name", type: "text" });

	//returns html element representing the select elememt
	settingContainer.createDropdown({
		name: "Day",
		options: [
			{ value: "0", text: "Monday" },
			{ value: "1", text: "Tuesday" },
			{ value: "2", text: "Wednesday" },
			{ value: "3", text: "Thursday" },
			{ value: "4", text: "Friday" },
			{ value: "5", text: "Saturday" },
			{ value: "6", text: "Sunday" }
		],
		shouldSelect: value => value == new Date().getDay(), // Select the current day
		onChange: value => {
			console.log("The day is", value.text);
		}
	});

	// this one also retunes a html element
	let testList = settingContainer.createListGroup("Bob");

	//and so do these
	testList.addItem({
		name: "Title", color: "warning", description: "Description", footer: "Footer", corner: "Corner", badge: "Badge", onClick: () => {
			console.log("This one is the test one");
		}, active: true
	});
	testList.addItem({
		name: "Be",
		color: "success",
		image: "https://boxcritters.com/images/menu/Btn_Menu_Items_A.png",
		description: "To be",
		footer: "That is the question",
		corner: "Or Not",
		badge: "To",
		onClick: () => {
			console.log("Shakesphere, Of course.");
		}
	});
	testList.addItem({
		name: "Ok Yay",
		color: "danger",
		description: "So I've made this a thing now",
		footer: "Now people can make these",
		corner: "Woo-Hoo",
		badge: "🎈",
		onClick: () => {
			console.log("But now we are here so we can do things with it, many things.");
		}
	});


	let hmmContainer = Critterguration.registerSettingsMenu({ id: "hmm", name: "HMM" });
	hmmContainer.innerText = "Welcome to Hmm World";
})();