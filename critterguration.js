// ==UserScript==
// @name         Critterguration
// @namespace    https://boxcrittersmods.ga/authors/tumblegamer/
// @version      0
// @author       TumbleGamer
// @require      https://github.com/tumble1999/popper/raw/master/popper.js
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

	if (typeof Popper == 'undefined') throw `@require https://github.com/tumble1999/popper/raw/master/popper.js`;

	const uWindow = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

	if (uWindow.Critterguration)
		return;

	let modal = new Popper();
	modal.setWidth("1000px");
	modal.setContent(
		`<span>Mod Settings</span>${Popper.closeButton}`,
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


	uWindow.Critterguration = {
		openSettings,
		registerSettingsMenu,
		createInputGroup: createInputRow,
		isOpen: modal.showing
	};
})();