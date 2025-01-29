window.addEventListener('load', () => {
const sequence = document.getElementById("sequence");
const stratagemName = document.getElementById("stratagemName");

// Button keys to be used in phone. Element ids were chosen to be the same keyboard key names/codes.
const keyUp = document.getElementById("ArrowUp");
const keyLeft = document.getElementById("ArrowLeft");
const keyDown = document.getElementById("ArrowDown");
const keyRight = document.getElementById("ArrowRight");
const keys = [keyUp, keyLeft, keyDown, keyRight]
for (let key of keys) {
	key.addEventListener("click", e => keyInput(key.id))
}
document.addEventListener("keyup", e => keyInput(e.code))

// User input is dealt in this function.
async function keyInput(name) {
	let arrow = t(name) // getting number from user input name.
	if (arrow < 0) return // Ignoring keys there aren't arrows.

	const nextArrow = currentStratagem.sequence[correctArrows] // Next arrow to be matched.
	if (arrow !== nextArrow) return start(currentStratagem) // Restarting current stratagem.

	arrowIcon = sequence.children[correctArrows] // Next arrow icon that was correctly guessed.
	arrowIcon.replaceWith(createIconFromN(nextArrow, "solid")) // Replacing regular icon with solid icon.
	// Unfortunately, as fontawesome substitute the icon element for an svg, we cannot simply change the class, because 
	// it's a completely different icon.
	correctArrows++ // next index of the sequence to be matched.
	
	// If end of sequence has been reached.
	if (correctArrows === currentStratagem.sequence.length) {
		await sleep(100) // Sleeping for a short time to allow last icon change to be seen.
		start(stratagems[randomInt(stratagems.length)]) // Starting new stratagem.
	}
}

// Promise that does nothing and resolves in given milliseconds.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// Translations between arrow names to arrow numbers.
const t = (name) => {
	switch (name) {
	case "ArrowUp": return 0
	case "ArrowLeft": return 1
	case "ArrowDown": return 2
	case "ArrowRight": return 3
	default: return -1
	}
}
// Translations between arrow numbers to arrow icon direction class.
const iconClassFromN = (n) => {
	switch (n) {
	case 0 : return "fa-circle-up"
	case 1 : return "fa-circle-left"
	case 2 : return "fa-circle-down"
	case 3 : return "fa-circle-right"
	default: return ""
	}
}

// Returns a icon element from the number that represents an arrow direction and.
function createIconFromN (n, type) {
	const i = document.createElement("i");
	i.classList.add(`fa-${type}`, iconClassFromN(n))
	return i
}

const randomInt = (n) => Math.floor(Math.random()*n) // returns an random integer between zero and n.
let currentStratagem // The stratagem on screen.
let correctArrows // The amount of correct arrows correctly matched in sequence by user.

// Sets up given stratagem on screen.
function start(stratagem) {
	correctArrows = 0 // Resets correct user arrows.
	sequence.innerHTML = ""; // Removes all icons of the sequence on screen.
	currentStratagem = stratagem // Keeps a reference to given stratagem
	stratagemName.innerText = currentStratagem.name // Changes stratagem name on screen.
	for (let n of currentStratagem.sequence) { // For each stratagem arrow.
		sequence.appendChild(createIconFromN(n, "regular")) // Adds an icon, for that arrow, in the sequence on screen.
	}
}

const stratagems = [{
	name:"ORBITAL 120MM HE BARRAGE", sequence: [t("ArrowRight"), t("ArrowRight"), t("ArrowDown"), t("ArrowLeft"), t("ArrowRight"), t("ArrowDown")],
}, {
	name:"ROCKET SENTRY", sequence: [t("ArrowDown"), t("ArrowUp"), t("ArrowRight"), t("ArrowRight"), t("ArrowLeft")],
}, {
	name:"ORBITAL ILLUMINATION FLARE", sequence: [t("ArrowRight"), t("ArrowRight"), t("ArrowLeft"), t("ArrowLeft")],
}, {
	name:"REINFORCE", sequence: [t("ArrowUp"), t("ArrowDown"), t("ArrowRight"), t("ArrowLeft"), t("ArrowUp")],
}, {
	name:"ORBITAL 380MM HE BARRAGE", sequence: [t("ArrowRight"), t("ArrowDown"), t("ArrowUp"), t("ArrowUp"), t("ArrowLeft"), t("ArrowDown"), t("ArrowDown")],
}, {
	name:"HELLBOMB", sequence: [t("ArrowDown"), t("ArrowUp"), t("ArrowLeft"), t("ArrowDown"), t("ArrowUp"), t("ArrowRight"), t("ArrowDown"), t("ArrowUp")],
}, {
	name:"ANTI-PERSONNEL MINEFIELD", sequence: [t("ArrowDown"), t("ArrowLeft"), t("ArrowUp"), t("ArrowRight")],
}, {
	name:"ORIBITAL AIRBURST STRIKE", sequence: [t("ArrowRight"), t("ArrowRight"), t("ArrowRight")],
}, {
	name:"EAGLE STRAFING GUN", sequence: [t("ArrowUp"), t("ArrowRight"), t("ArrowRight")],
}, {
	name:"GUARD DOG", sequence: [t("ArrowDown"), t("ArrowUp"), t("ArrowLeft"), t("ArrowUp"), t("ArrowRight"), t("ArrowDown")],
}, {
	name:"JUMP PACK", sequence: [t("ArrowDown"), t("ArrowUp"), t("ArrowUp"), t("ArrowDown"), t("ArrowUp")],
}, {
	name:"SHIELD GENERATOR PACK", sequence: [t("ArrowDown"), t("ArrowUp"), t("ArrowLeft"), t("ArrowRight"), t("ArrowLeft"), t("ArrowRight")],
}, {
	name:"MORTAR SENTRY", sequence: [t("ArrowDown"), t("ArrowUp"), t("ArrowRight"), t("ArrowRight"), t("ArrowDown")],
}]

start(stratagems[randomInt(stratagems.length)])

});