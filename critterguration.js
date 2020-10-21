let Critterguration = {};
(function () {
	"use strict";

	if (typeof Popper == 'undefined') throw `@require https://github.com/tumble1999/popper/raw/master/popper.js`;

	let modal = new Popper();
	modal.element.querySelector(".modal-dialog").style["max-width"] = "1000px";
	modal.setContent("Mod Settings" + Popper.closeButton, "", 'Mod Settings powered by <a href="https://boxcrittersmods.ga/projects/critterguration/">Critterguration created by <a href="https://boxcrittersmods.ga/authors/tumblegamer/">TumbleGamer</a>');

	Critterguration.modal = modal;
})();