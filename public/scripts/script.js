// Store and use the menu button/icon
var menuButton = document.getElementById("menu-button");
menuButton.onclick = function () {
	openMenu();
};

var bckg = document.getElementById("background");
var nav = document.getElementById("nav");
var content = document.getElementById("content");

// Store initial styles for each element
const initialStyles = {
	bckg: bckg.style.cssText,
	nav: nav.style.cssText,
};

// Store the original content's HTML
const originalContentHTML = content.outerHTML;

function openMenu() {
	if (
		window.getComputedStyle(bckg, null).getPropertyValue("border-radius") ===
		"20px"
	) {
		// Apply new styles
		bckg.style.width = "100vw";
		bckg.style.height = "100vh";
		bckg.style.margin = "0";
		bckg.style.borderRadius = "0";
		bckg.style.backdropFilter = "blur(7px)";
		nav.style.width = "100vw";
		nav.style.top = "3vh";
		let menuContent = document.createElement("div");
		menuContent.id = "menuContent";
		menuContent.innerHTML =
			'<h1><a href="index.html">Home</a><a href="about.html">About</a></h1><h1><a href="projects.html">Projects</a><a href="contact.html">Contact</a></h1>'; // Customize this content as needed
		content.replaceWith(menuContent);
	} else {
		// Reset to initial styles using stored values
		bckg.style.cssText = initialStyles.bckg;
		nav.style.cssText = initialStyles.nav;
		// Revert back to the original content using the saved HTML
		document.getElementById("menuContent").outerHTML = originalContentHTML;

		// Update the content variable to point to the restored element
		content = document.getElementById("content");
	}
}

// Atropos or Swing Components (Projects)
class AtroposComponent extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.atropos = new Atropos({
			el: this.querySelector(".atropos"),
			onEnter() {
				console.log("Atropos Component: Enter");
			},
			onLeave() {
				console.log("Atropos Component: Leave");
			},
			onRotate(x, y) {
				console.log("Atropos Component: Rotate", x, y);
			},
		});

		console.log("Atropos Component: Connected!", this);
	}

	disconnectedCallback() {
		this.atropos.destroy();

		console.log("Atropos Component: Disconnected!", this);
	}
}

customElements.define("atropos-component", AtroposComponent);
