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
	let direction = translateArrowNameToDirection(name) // getting number from user input name.
	if (direction === "") return // Ignoring keys there aren't arrows.

	if (direction !== currentStratagem.sequence[correctArrows]) { // If next arrow is wrong.
		// Changing previously set arrows to color red.
		for (let arrowIcon of sequence.children) {
			if (!arrowIcon.classList.contains("matched")) break
			arrowIcon.classList.replace("matched", "wrong")
		}
		// Replacing next arrow icon with solid red icon.
		sequence.children[correctArrows].replaceWith(createIconFromN(direction, "solid", "wrong"))
		await sleep(100) // Sleeping for a short time to allow icon changes to be seen.
		return start(currentStratagem) // Restarting current stratagem.
	}

	arrowIcon = sequence.children[correctArrows] // Next arrow icon that was correctly guessed.
	arrowIcon.replaceWith(createIconFromN(direction, "solid", "matched")) // Replacing regular icon with solid icon.
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
const translateArrowNameToDirection = (name) => {
	switch (name) {
	case "ArrowUp": return "↑"
	case "ArrowLeft": return "←"
	case "ArrowDown": return "↓"
	case "ArrowRight": return "→"
	default: return ""
	}
}
// Translations between arrow numbers to arrow icon direction class.
const iconClassFromArrow = (n) => {
	switch (n) {
	case "↑" : return "fa-circle-up"
	case "←" : return "fa-circle-left"
	case "↓" : return "fa-circle-down"
	case "→" : return "fa-circle-right"
	default: return ""
	}
}

// Returns a icon element from the number that represents an arrow direction and.
function createIconFromN (direction, type, ...extraClasses) {
	const i = document.createElement("i");
	i.classList.add(`fa-${type}`, iconClassFromArrow(direction), ...extraClasses)
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
	for (let direction of currentStratagem.sequence) { // For each stratagem arrow.
		sequence.appendChild(createIconFromN(direction, "regular")) // Adds an icon, for that arrow, in the sequence on screen.
	}
}

const stratagems = [
	{name:"ORBITAL 120MM HE BARRAGE", sequence: "→→↓←→↓"},
	{name:"ROCKET SENTRY", sequence: "↓↑→→←"},
	{name:"ORBITAL ILLUMINATION FLARE", sequence: "→→←←"},
	{name:"REINFORCE", sequence: "↑↓→←↑"},
	{name:"ORBITAL 380MM HE BARRAGE", sequence: "→↓↑↑←↓↓"},
	{name:"HELLBOMB", sequence: "↓↑←↓↑→↓↑"},
	{name:"ANTI-PERSONNEL MINEFIELD", sequence: "↓←↑→"},
	{name:"ORIBITAL AIRBURST STRIKE", sequence: "→→→"},
	{name:"EAGLE STRAFING GUN", sequence: "↑→→"},
	{name:"GUARD DOG", sequence: "↓↑←↑→↓"},
	{name:"JUMP PACK", sequence: "↓↑↑↓↑"},
	{name:"SHIELD GENERATOR PACK", sequence: "↓↑←→←→"},
	{name:"MORTAR SENTRY", sequence: "↓↑→→↓"},
	{name:"EAGLE 500KG BOMB", sequence: "↑→↓↓↓"},
	{name:"EAGLE 110MM ROCEKT PODS", sequence: "↑→↑←"},
	{name:"GATLING SENTY", sequence: "↓↑→←"},
	{name:"RECOILLESS RIFLE", sequence: "↓←→→←"},
	{name:"RESUPPLY", sequence: "↓↓↑→"},
	{name:"MACHIHNE GUN", sequence: "↓←↓↑→"},
	{name:"AUTOCANNON", sequence: "↓←↓↑↑→"},
	{name:"HMG EMPLACEMENT", sequence: "↓↑←→→←"},
	{name:"ANTI-MATERIAL RIFLE", sequence: "↓←→↑↓"},
	{name:"ORBITAl LASER", sequence: "→↓↑→↓"},
	{name:"EXPANDABLE ANTI-TANK", sequence: "↓↓←↑→"},
]

start(stratagems[randomInt(stratagems.length)])

});