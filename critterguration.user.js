// ==UserScript==
// @name         Critterguration
// @namespace    https://bcmc.ga/authors/tumblegamer/
// @version      0.3.12.42
// @icon         https://github.com/tumble1999/critterguration/raw/master/icon.png
// @author       Tumble
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

	const uWindow = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

	if (uWindow.Critterguration)
		return;

	let deps = [
		{
			obj: "TumbleMod",
			text: "// @require      https://github.com/tumble1999/mod-utils/raw/master/mod-utils.js"
		},
		{
			obj: "Modial",
			text: "// @require      https://github.com/tumble1999/modial/raw/master/modial.js"
		}
	];
	if (deps.map(dep => eval("typeof " + dep.obj)).includes("undefined")) throw "\nATTENTION MOD DEVELOPER:\nPlease add the following to your code:\n" + deps.map(dep => {
		if (eval("typeof " + dep.obj) == "undefined") return dep.text;
	}).filter(d => !!d).join("\n");



	let modal = new Modial();
	modal.setWidth("1000px");
	modal.setContent(
		`<span>Mod Settings</span>`,
		``,
		`<small style="font-size: 0.8em">
			Mod Settings powered by
			<a href="https://bcmc.ga/projects/critterguration/" target="_blank" rel="noopener noreferrer">
				Critterguration
			</a>
			created by
			<a href="https://bcmc.ga/authors/tumble/" target="_blank" rel="noopener noreferrer">
				Tumble
			</a>
		</small>`
	);
	modal.getHeaderNode().classList.add('py-2');
	modal.getFooterNode().classList.add('py-1');

	// Create Tab Bar
	// <div class="nav nav-pills justify-content-center"></div>
	let tabContainer = document.createElement("div");
	tabContainer.classList.add("nav", "nav-pills", "justify-content-center", "mb-3");
	modal.getBodyNode().appendChild(tabContainer);
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

	function createDropdown(container, { name, options, shouldSelect, onchange }) {
		let input = document.createElement("select");
		input.placeholder = name;
		input.classList.add("form-select");
		for (let option of options) {
			let optionElement = document.createElement("option");
			optionElement.value = option.value;
			optionElement.innerText = option.text;
			optionElement.style.whiteSpace = "none";
			if (shouldSelect(option.value)) optionElement.selected = true;
			input.appendChild(optionElement);
		}
		input.onchange = () => onchange(options[input.selectedIndex].value, input);
		container.appendChild(input);
		return input;
	}

	function createInput(container, { name, type, value, onInput = _ => 0 }) {
		let input = document.createElement("input");
		input.placeholder = name;
		input.type = type;
		if (type == "checkbox") {
			input.checked = value;
			input.oninput = () => onInput(input.checked, input);

			let inputContainer = document.createElement("span");
			inputContainer.classList.add("form-control");
			//inputContainer.classList.add("input-group-text");
			inputContainer.appendChild(input);

			container.appendChild(inputContainer);
		} else {
			input.value = value;
			input.oninput = () => onInput(input.value, input);
			input.classList.add("form-control");

			container.appendChild(input);
		}
		return input;
	}


	let creationFunctions = {
		createInput,
		createDropdown,
	};
	function setupCreationFunctions(container, norow) {
		for (let func in creationFunctions) {
			container[func] = (p) => {
				let row;
				if (norow) row = container.createInputRow(p.name);
				return creationFunctions[func](norow ? row : container, p);
			};
		}
	};

	function addItemToListGroup(container, { name, color = "secondary", description, image, footer, corner, badge, onClick, active }) {

		/*
		<a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
			<div class="d-flex w-100 justify-content-between">
				<h5 class="mb-1">List group item heading</h5>
				<small>3 days ago</small>
			</div>
			<p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
			<small>Donec id elit non mi porta.</small>
		</a>
		*/
		let listItem, listItemContent;

		if (onClick) {
			listItem = document.createElement("a");
			listItem.href = "#";
			listItem.onclick = () => onClick();
		} else {
			listItem = document.createElement("div");
		}
		container.appendChild(listItem);
		if (image) {
			listItem.classList.add("d-flex", "align-items-center");
			let imgContainer = document.createElement("div"),
				imgElement = new Image();
			listItem.appendChild(imgContainer);
			imgContainer.classList.add("flex-shrink-0");
			imgContainer.appendChild(imgElement);
			imgElement.src = image;
			imgElement.height = 100;
			listItemContent = document.createElement("div");
			listItem.appendChild(listItemContent);
			listItemContent.classList.add("flex-grow-1", "ms-3");
		}
		else {
			listItemContent = listItem;
		}
		listItem.classList.add("list-group-item", "text-" + color);
		if (onClick)
			listItem.classList.add("list-group-item-action");
		if (active) listItem.classList.add("list-group-item-" + color);


		if (name || badge || corner) {
			let headerElm = document.createElement("div");
			listItemContent.appendChild(headerElm);
			headerElm.classList.add("d-flex", "w-100", "justify-content-between");
			if (badge || name) {
				let nameElm = document.createElement("h5");
				nameElm.classList.add("md-1");
				headerElm.appendChild(nameElm);
				listItem.nameElm = nameElm;
				if (name) {
					nameElm.innerHTML = name;
				}
				if (badge) {
					let badgeElm = document.createElement("span");
					badgeElm.classList.add("badge", "rounded-pill", "bg-" + color);
					badgeElm.innerText = badge;
					listItem.badgeElm = badgeElm;
					nameElm.prepend(badgeElm);
				}

			}
			if (corner) {
				let cornerElm = document.createElement("small");
				cornerElm.innerHTML = corner;
				headerElm.appendChild(cornerElm);
				listItem.cornerElm = cornerElm;
			}
		}
		if (description) {
			let descriptionElm = document.createElement("p");
			descriptionElm.classList.add("mb-1");
			descriptionElm.innerText = description;
			listItem.descriptionElm = descriptionElm;
			listItemContent.appendChild(descriptionElm);
		}
		if (footer) {
			let footerElm = document.createElement("small");
			footerElm.innerText = footer;
			listItem.footerElm = footerElm;
			listItemContent.appendChild(footerElm);
		}
		return listItem;
	}

	function createListGroup(container, name) {
		let listGroup = document.createElement("div");
		listGroup.classList.add("list-group", "list-group-flush");
		if (name) {
			let label = document.createElement("div");
			label.classList.add("card-header");
			label.innerText = name;
			listGroup.appendChild(label);
		}
		listGroup.addItem = (options) => addItemToListGroup(listGroup, options);
		container.appendChild(listGroup);
		return listGroup;
	}


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
		content.createListGroup = name => createListGroup(content, name);
		setupCreationFunctions(content, true);
		return content;
	}

	TumbleMod.onDocumentLoaded().then(alreadyLoaded => {
		if (uWindow.BCMacros) {
			// Attach settiongs to the existing  unused settings button
			setTimeout(() => {
				BCMacros.macros.find(m => m.name == "misc").setAction(() => openSettings());
			}, 1000);
		}
		if (!uWindow.BCMacros) {
			// Attach settings to the existing  unused settings button
			let menu = document.getElementById("menu"),
				btn = menu.children[4].children[0];
			btn.removeAttribute("onclick");
			btn.addEventListener("click", () => openSettings());
		}
	});


	uWindow.Critterguration = new TumbleMod({
		id: "critterguration", // code-friendly version of name
		abriv: "BCConfig", // abbreviation for mod.log
		name: "Critterguration",
		author: "Tumble",
		openSettings,
		registerSettingsMenu,
		createInputGroup: createInputRow,
		modal,
		isOpen: () => modal.showing()
	});
})();