// --- Loader / Splash & Body Fade Fix ---
window.addEventListener("DOMContentLoaded", function () {
	// Fun/celebrate/dev playground/api tester/emoji rain/fun fact features removed
	const loader = document.getElementById("loader-bg");
	document.body.classList.add("page-loaded");
	document.body.classList.remove("page-fade");
	document.body.style.opacity = 1;
	if (loader) {
		setTimeout(() => {
			loader.classList.add("hide");
			document.body.style.overflow = "";
		}, 600); // fade out loader after 600ms
	}

	// --- THEME: Persistent Light/Dark Mode ---
	const themeToggle = document.getElementById("theme-toggle");
	const themeIcon = document.getElementById("theme-icon");
	// Use only Font Awesome icons
	function setTheme(light) {
		if (light) {
			document.body.classList.add("light-mode");
			if (themeIcon) themeIcon.className = "fa-solid fa-moon";
			localStorage.setItem("theme", "light");
		} else {
			document.body.classList.remove("light-mode");
			if (themeIcon) themeIcon.className = "fa-solid fa-sun";
			localStorage.setItem("theme", "dark");
		}
	}
	// On load, set theme from localStorage or system
	const savedTheme = localStorage.getItem("theme");
	if (savedTheme === "light") setTheme(true);
	else if (savedTheme === "dark") setTheme(false);
	else setTheme(window.matchMedia("(prefers-color-scheme: light)").matches);
	if (themeToggle && themeIcon) {
		themeToggle.addEventListener("click", () => {
			setTheme(!document.body.classList.contains("light-mode"));
		});
	}

	// --- AOS Animate On Scroll ---
	if (window.AOS) {
		AOS.init({
			duration: 800,
			once: true,
			easing: "ease-in-out",
			offset: 60,
		});
	}

	// --- anime.js Parallax Hero (if .hero exists) ---
	if (window.anime && document.querySelector(".hero")) {
		anime({
			targets: ".hero",
			translateY: [60, 0],
			opacity: [0, 1],
			duration: 1200,
			easing: "easeOutExpo",
			delay: 200,
		});
	}

	// --- AOS Animate On Scroll ---
	if (window.AOS) {
		AOS.init({
			duration: 800,
			once: true,
			easing: "ease-in-out",
			offset: 60,
		});
	}
});

// --- Page Transitions ---
document.addEventListener("DOMContentLoaded", function () {
	const main = document.querySelector("main");
	if (main) {
		main.classList.add("page-transition");
		setTimeout(() => main.classList.add("page-in"), 10);
		// Optional: handle navigation fade out
		document.querySelectorAll("a").forEach((a) => {
			if (a.target === "_blank" || a.hasAttribute("download")) return;
			a.addEventListener("click", function (e) {
				if (a.href && a.origin === location.origin && !a.hash) {
					e.preventDefault();
					main.classList.remove("page-in");
					main.classList.add("page-out");
					setTimeout(() => {
						window.location = a.href;
					}, 350);
				}
			});
		});
	}
});

// --- Navbar scroll animation ---
window.addEventListener("scroll", function () {
	const navbar = document.querySelector(".navbar");
	if (!navbar) return;
	if (window.scrollY > 30) {
		navbar.classList.add("shrink");
	} else {
		navbar.classList.remove("shrink");
	}
});

// --- Theme toggle (light/dark) ---
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
function setTheme(light) {
	if (light) {
		document.body.classList.add("light-mode");
		if (themeIcon) themeIcon.textContent = "🌙";
	} else {
		document.body.classList.remove("light-mode");
		if (themeIcon) themeIcon.textContent = "☀️";
	}
}
if (themeToggle && themeIcon) {
	// Initial theme
	setTheme(window.matchMedia("(prefers-color-scheme: light)").matches);
	themeToggle.addEventListener("click", () => {
		setTheme(!document.body.classList.contains("light-mode"));
	});
}

// --- Ripple effect for buttons ---
function addRipple(e) {
	const btn = e.currentTarget;
	const circle = document.createElement("span");
	circle.className = "ripple";
	const rect = btn.getBoundingClientRect();
	circle.style.left = e.clientX - rect.left + "px";
	circle.style.top = e.clientY - rect.top + "px";
	btn.appendChild(circle);
	setTimeout(() => circle.remove(), 600);
}
document.querySelectorAll(".cta-btn, .btn").forEach((btn) => {
	btn.addEventListener("click", addRipple);
});

// --- Offcanvas menu for mobile ---
const toggler = document.querySelector(".navbar-toggler");
const offcanvas = document.querySelector(".offcanvas-menu");
const backdrop = document.querySelector(".offcanvas-backdrop");
if (toggler && offcanvas && backdrop) {
	toggler.addEventListener("click", () => {
		offcanvas.classList.toggle("open");
		backdrop.classList.toggle("open");
		document.body.style.overflow = offcanvas.classList.contains("open")
			? "hidden"
			: "";
	});
	backdrop.addEventListener("click", () => {
		offcanvas.classList.remove("open");
		backdrop.classList.remove("open");
		document.body.style.overflow = "";
	});
}

// Contact form flash message (if using AJAX, otherwise handled by Flask)
const contactForm = document.getElementById("contactForm");
if (contactForm) {
	contactForm.onsubmit = function (e) {
		e.preventDefault();
		document.getElementById("form-status").textContent =
			"Thank you! I will get back to you soon.";
		this.reset();
	};
}

// Fun Zone: Color Memory Game & Joke
const gameBoard = document.getElementById("game-board");
if (gameBoard) {
	const colors = ["red", "green", "blue", "yellow"];
	let sequence = [],
		userSeq = [],
		level = 0,
		started = false;
	const statusDiv = document.getElementById("game-status");
	function nextSequence() {
		userSeq = [];
		level++;
		statusDiv.textContent = `Level ${level}`;
		const next = colors[Math.floor(Math.random() * 4)];
		sequence.push(next);
		let i = 0;
		function showSeq() {
			if (i < sequence.length) {
				const btn = document.getElementById(sequence[i]);
				btn.classList.add("active");
				setTimeout(() => {
					btn.classList.remove("active");
					i++;
					setTimeout(showSeq, 300);
				}, 500);
			}
		}
		showSeq();
	}
	function checkUserInput() {
		for (let i = 0; i < userSeq.length; i++) {
			if (userSeq[i] !== sequence[i]) {
				statusDiv.textContent = "Game Over! Try again.";
				started = false;
				sequence = [];
				level = 0;
				return;
			}
		}
		if (userSeq.length === sequence.length) {
			setTimeout(nextSequence, 1000);
		}
	}
	document.getElementById("start-game").onclick = function () {
		if (!started) {
			started = true;
			sequence = [];
			level = 0;
			nextSequence();
		}
	};
	document.querySelectorAll(".color-btn").forEach((btn) => {
		btn.onclick = function () {
			if (!started) return;
			userSeq.push(this.id);
			this.classList.add("active");
			setTimeout(() => this.classList.remove("active"), 200);
			checkUserInput();
		};
	});
	// Joke feature
	const jokes = [
		"Why do programmers prefer dark mode? Because light attracts bugs!",
		"Why did the developer go broke? Because he used up all his cache.",
		"Why do JavaScript developers wear glasses? Because they don't C#.",
		"How do you comfort a JavaScript bug? You console it.",
		"Why was the computer cold? It left its Windows open!",
	];
	const jokeBtn = document.getElementById("joke-btn");
	if (jokeBtn) {
		jokeBtn.onclick = function () {
			const joke = jokes[Math.floor(Math.random() * jokes.length)];
			document.getElementById("joke").textContent = joke;
		};
	}
}

// Games page: Rock Paper Scissors & Dice
function playRPS(user) {
	const choices = ["rock", "paper", "scissors"];
	const ai = choices[Math.floor(Math.random() * 3)];
	let result = "";
	if (user === ai) result = "It's a tie!";
	else if (
		(user === "rock" && ai === "scissors") ||
		(user === "paper" && ai === "rock") ||
		(user === "scissors" && ai === "paper")
	)
		result = "You win!";
	else result = "You lose!";
	const rpsResult = document.getElementById("rps-result");
	if (rpsResult) rpsResult.textContent = `AI chose ${ai}. ${result}`;
}
function rollDice() {
	const roll = Math.floor(Math.random() * 6) + 1;
	const diceResult = document.getElementById("dice-result");
	if (diceResult) diceResult.textContent = `You rolled a ${roll}!`;
}

// Particles.js (if present)
if (window.particlesJS) {
	particlesJS.load("particles-js", "packages/particles.json", function () {
		console.log("callback - particles.js config loaded");
	});
}

// --- Fun Interactive: Confetti Button ---
function launchConfetti() {
	if (window.confetti) {
		window.confetti({
			particleCount: 120,
			spread: 90,
			origin: { y: 0.6 },
			colors: ["#2563eb", "#a259ff", "#43be7b", "#ffe44f", "#ff4f4f"],
		});
	} else {
		// fallback: simple icon burst
		const hero = document.querySelector(".hero");
		if (!hero) return;
		for (let i = 0; i < 30; i++) {
			const span = document.createElement("span");
			span.innerHTML = '<i class="fa-solid fa-star text-accent"></i>';
			span.style.position = "absolute";
			span.style.left = Math.random() * 90 + "%";
			span.style.top = Math.random() * 40 + 20 + "%";
			span.style.fontSize = Math.random() * 1.5 + 1 + "rem";
			span.style.opacity = 0.8;
			span.style.pointerEvents = "none";
			hero.appendChild(span);
			setTimeout(() => span.remove(), 1200);
		}
	}
}
window.addEventListener("DOMContentLoaded", function () {
	const confettiBtn = document.getElementById("confetti-btn");
	if (confettiBtn) {
		confettiBtn.addEventListener("click", launchConfetti);
	}

	// --- Fun Interactive: Random Fact ---
	const facts = [
		"The first computer bug was an actual moth!",
		"Python is named after Monty Python, not the snake.",
		"The first website is still online: info.cern.ch",
		"The original Pac-Man game was invented in 1980.",
		"The first email was sent in 1971.",
		"The 'smiley' emoticon :-) was invented in 1982.",
		"The first video game ever was 'Tennis for Two' (1958).",
		"The word 'robot' comes from a Czech word meaning 'forced labor'.",
		"The first 1GB hard drive weighed over 500 pounds!",
		"The first domain name ever registered was symbolics.com.",
	];
	const factBtn = document.getElementById("fact-btn");
	const factBox = document.getElementById("random-fact");
	if (factBtn && factBox) {
		factBtn.addEventListener("click", function () {
			const fact = facts[Math.floor(Math.random() * facts.length)];
			factBox.textContent = fact;
			factBox.classList.add("animate__animated", "animate__tada");
			setTimeout(
				() => factBox.classList.remove("animate__animated", "animate__tada"),
				900
			);
		});
	}

	// --- Fun Interactive: Lottie Animation ---
	if (window.lottie && document.getElementById("lottie-fun")) {
		lottie.loadAnimation({
			container: document.getElementById("lottie-fun"),
			renderer: "svg",
			loop: true,
			autoplay: true,
			path: "https://assets2.lottiefiles.com/packages/lf20_4kx2q32n.json", // fun animation
		});
	}
});
