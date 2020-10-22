let Critterguration;
(function () {
	"use strict";

	if (typeof Popper == 'undefined') throw `@require https://github.com/tumble1999/popper/raw/master/popper.js`;

	let modal = new Popper();
	modal.setWidth("1000px");
	modal.setContent(Popper.closeButton + "<p>Mod Settings</p>", "", 'Mod Settings powered by <a href="https://boxcrittersmods.ga/projects/critterguration/">Critterguration</a> created by <a href="https://boxcrittersmods.ga/authors/tumblegamer/">TumbleGamer</a>');

	//Create Tab Bar
	//<div class="nav nav-pills justify-content-center"></div>
	let tabContainer = document.createElement("div");
	tabContainer.classList.add("nav", "nav-pills", "justify-content-center");
	modal.getHeaderNode().appendChild(tabContainer);

	//Create Content Area
	//<div class="tab-content"></div>
	let contentContainer = document.createElement("div");
	contentContainer.classList.add("tab-content");
	modal.getBodyNode().appendChild(contentContainer);

	//Activate Tab
	function activeTab(element) {
		if (typeof element == "string") element = document.querySelector(`[data-toggle="#${element}"]`);
		let contentElement = contentContainer.querySelector(element.dataset.toggle);
		let activeElement = tabContainer.querySelector(".active");
		let activeContent = contentContainer.querySelector(".active");
		if (activeElement) activeElement.classList.remove("active");
		if (activeContent) activeContent.classList.remove("active");
		element.classList.add("active");
		contentElement.classList.add("active");
	}

	//Create Tab
	//<a href="#" class="nav-link active" data-toggle="#ID">NAME/a>
	function createTab(id, name) {
		let tab = document.createElement("a");
		tab.href = "#";
		tab.classList.add("nav-link");
		tab.dataset.toggle = "#" + id;
		tab.innerText = name;
		return tab;
	}

	//Create Content Box
	//<div id="ID" class="tab-pane active"></div>
	function createContentBox(id) {
		let content = document.createElement("div");
		content.id = id;
		content.classList.add("tab-pane");
		return content;
	}

	//OpenSettings (tabId?)
	function openSettings(tabId) {
		if (tabId) activeTab(tabId);
		modal.show();
	}

	function createInput(type, container, oninput = _ => 0) {
		let input = document.createElement("input");
		input.classList.add("form-control");
		input.type = type;
		input.oninput = () => oninput(input.value, input);
		container.appendChild(input);
		return input;
	}


	function createInputRow(name, container) {
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

		group.createInput = (type, oninput) => createInput(type, group, oninput);

		return group;
	}

	function registerSettingsMenu({ id, name }) {
		let tab = createTab(id, name);
		let content = createContentBox(id);
		tabContainer.appendChild(tab);
		contentContainer.appendChild(content);
		tab.addEventListener("click", (_ => activeTab(tab)));
		if (tabContainer.children.length == 1) activeTab(tab);
		content.createInputRow = (name) => createInputRow(name, content);
		content.createInput = (name, type, oninput) => {
			let group = content.createInputRow(name);
			return group.createInput(type, oninput);
		};
		return content;
	}


	Critterguration = {
		openSettings,
		registerSettingsMenu,
		createInputGroup: createInputRow
	};
})();