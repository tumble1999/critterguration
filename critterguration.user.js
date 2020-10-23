// ==UserScript==
// @name         Critterguration
// @namespace    https://boxcrittersmods.ga/authors/tumblegamer/
// @version      0.1.0.25
// @icon         https://github.com/tumble1999/critterguration/raw/master/logo.png
// @author       TumbleGamer
// @require      https://github.com/tumble1999/mod-utils/raw/master/mod-utils.js
// @require      https://github.com/SArpnt/ctrl-panel/raw/master/script.user.js
// @require      https://github.com/tumble1999/modial/raw/master/modial.js
// @match        https://boxcritters.com/play/
// @match        https://boxcritters.com/play/?*
// @match        https://boxcritters.com/play/#*
// @match        https://boxcritters.com/play/index.html
// @match        https://boxcritters.com/play/index.html?*
// @match        https://boxcritters.com/play/index.html#*
// @run-at       document-start
// ==/UserScript==

(function () {
	"use strict";

	if (typeof Modial == 'undefined') throw `@require https://github.com/tumble1999/modial/raw/master/modial.js`;

	const uWindow = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

	if (uWindow.Critterguration)
		return;

	let modal = new Modial();
	modal.setWidth("1000px");
	modal.setContent(
		`<span>Mod Settings</span>${Modial.closeButton}`,
		``,
		`<small style="font-size: 0.8em">
			Mod Settings powered by
			<a href="https://boxcrittersmods.ga/projects/critterguration/" target="_blank" rel="noopener noreferrer">
				Critterguration
			</a>
			created by
			<a href="https://boxcrittersmods.ga/authors/tumblegamer/" target="_blank" rel="noopener noreferrer">
				TumbleGamer
			</a>
		</small>`
	);
	modal.getHeaderNode().classList.add('py-2');
	modal.getFooterNode().classList.add('py-1');

	// Create Tab Bar
	// <div class="nav nav-pills justify-content-center"></div>
	let tabContainer = document.createElement("div");
	tabContainer.classList.add("nav", "nav-pills", "justify-content-center");
	modal.getHeaderNode().appendChild(tabContainer);
	tabContainer.style.display = "none";

	// Create Content Area
	// <div class="tab-content"></div>
	let contentContainer = document.createElement("div");
	contentContainer.classList.add("tab-content");
	modal.getBodyNode().appendChild(contentContainer);

	// Activate Tab
	function activeTab(element) {
		if (typeof element == "string") element = document.querySelector(`[data-toggle="#${element}"]`);
		let contentElement = contentContainer.querySelector(element.dataset.toggle);
		let activeElement = tabContainer.getElementsByClassName("active")[0];
		let activeContent = contentContainer.getElementsByClassName("active")[0];
		if (activeElement) activeElement.classList.remove("active");
		if (activeContent) activeContent.classList.remove("active");
		element.classList.add("active");
		contentElement.classList.add("active");
		if (modal.showing()) element.ontab();
	}

	// Create Tab
	// <a href="#" class="nav-link active" data-toggle="#ID">NAME/a>
	function createTab(id, name) {
		let tab = document.createElement("a");
		tab.href = "#";
		tab.classList.add("nav-link");
		tab.dataset.toggle = `#${id}`;
		tab.innerText = name;
		return tab;
	}

	// Create Content Box
	// <div id="ID" class="tab-pane active"></div>
	function createContentBox(id) {
		let content = document.createElement("div");
		content.id = id;
		content.classList.add("tab-pane");
		return content;
	}

	// OpenSettings (tabId?)
	function openSettings(tabId) {
		modal.show();
		activeTab(tabId || tabContainer.querySelector(".active"));
	}

	function createDropdown(container, name, options, shouldSelect, onchange) {
		let input = document.createElement("select");
		input.placeholder = name;
		input.classList.add("custom-select");
		for (let option of options) {
			let optionElement = document.createElement("option");
			optionElement.value = option.value;
			optionElement.innerText = option.text;
			optionElement.style.whiteSpace = "none";
			if (shouldSelect(option.value)) optionElement.selected = true;
			input.appendChild(optionElement);
		}
		input.onchange = () => onchange(options[input.selectedOptions[0].value], input);
		container.appendChild(input);
		return input;
	}

	function createInput(container, name, type, oninput = _ => 0) {
		let input = document.createElement("input");
		input.placeholder = name;
		input.classList.add("form-control");
		input.type = type;
		input.oninput = () => oninput(input.value, input);
		container.appendChild(input);
		return input;
	}
	let creationFunctions = {
		createInput,
		createDropdown,
	};
	function setupCreationFunctions(container, norow) {
		for (let func in creationFunctions) {
			container[func] = (...p) => {
				let row;
				if (norow) row = container.createInputRow(p[0]);
				return creationFunctions[func](norow ? row : container, ...p);
			};
		}
	};


	function createInputRow(container, name) {
		let group = document.createElement("div");
		group.classList.add("input-group");

		let prepend = document.createElement("div");
		prepend.classList.add("input-group-prepend");
		group.appendChild(prepend);
		let title = document.createElement("label");
		title.innerText = name;
		title.classList.add("input-group-text");
		prepend.appendChild(title);
		container.appendChild(group);

		setupCreationFunctions(group);

		return group;
	}

	function registerSettingsMenu({ id, name }, ontab = _ => 0) {
		let tab = createTab(id, name);
		let content = createContentBox(id);
		tabContainer.appendChild(tab);
		contentContainer.appendChild(content);
		tab.ontab = ontab;
		tab.addEventListener("click", _ => activeTab(tab));
		if (tabContainer.children.length > 1) tabContainer.style.display = "flex";
		if (tabContainer.children.length == 1) setTimeout(_ => activeTab(tab), 0);
		content.createInputRow = name => createInputRow(content, name);
		setupCreationFunctions(content, true);
		return content;
	}

	TumbleMod.onDocumentLoaded().then(alreadyLoaded => {
		var options = {
			text: `<svg width="34" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cog" class="svg-inline--fa fa-cog fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
			<path fill="currentColor" d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path>
			</svg>`,
			color: "primary",
			location: "left",
			size: "md",
		};
		let settingsMacro;
		if (uWindow.BCMacros) {
			//Create Settigs Macro
			let macroPack = BCMacros.createMacroPack("Critterguration");
			settingsMacro = macroPack.createMacro({
				name: "Mod Settings",
				action: () => openSettings(),
				button: options
			});
		}
		if (!uWindow.BCMacros || settingsMacro.inaccessible()) {
			//Create Button
			let button = ctrlPanel.addButton(...Object.values(options));
			button.addEventListener("click", () => openSettings());
		}
	});

	uWindow.Critterguration = {
		openSettings,
		registerSettingsMenu,
		createInputGroup: createInputRow,
		isOpen: modal.showing
	};
})();