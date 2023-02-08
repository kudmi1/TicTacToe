const video = document.querySelector("#myVideo")
const cells = document.querySelectorAll(".cell")
const statusText = document.querySelector("#messageText")
const sounds = document.querySelectorAll(".sounds")
const winSound = document.querySelector("#winner")
const okBtn1 = document.querySelector("#okBtn1")
const okBtn2 = document.querySelector("#okBtn2")
const gameDiv = document.querySelector("#gameDiv")
const cellContainer = document.querySelector("#cellContainer")
let input1 = document.querySelector("#player1")
let input2 = document.querySelector("#player2")
let label1 = document.querySelector("#label1")
let label2 = document.querySelector("#label2")
const player1div = document.querySelector("#player1div")
const player2div = document.querySelector("#player2div")
let player1name
let player2name

player2div.style.display = "none"
winSound.volume = 0.3
sounds.forEach((sound) => (sound.volume = 0.6))

const restartBtn = document.querySelector("#restartBtn")
const winConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

let options = ["", "", "", "", "", "", "", "", ""]
let currentPlayer
let symbol = "X"
let gameIsRunning = false
var active = true

initGame()

function returnName1() {
	player1name = input1.value
	currentPlayer = player1name
	input1.style.display = "none"
	label1.innerHTML = player1name
	okBtn1.style.display = "none"

	changePlayer()
	player2div.style.display = "block"
	player1div.style.display = "none"
}
function returnName2() {
	console.log(input2.value)
	player2name = input2.value
	currentPlayer = player2name
	input2.style.display = "none"
	label2.innerHTML = player2name
	okBtn2.style.display = "none"
	changePlayer()
	player1div.style.display = "block"
	player2div.style.display = "block"
	player2div.style.borderColor = "transparent"
	// statusText.textContent = `${currentPlayer}'s turn`;

	cellContainer.style.display = "grid"
}

function initGame() {
	cells.forEach((cell) => cell.addEventListener("click", cellClicked))
	cells.forEach((cell) => cell.addEventListener("mouseover", cellPreview))
	cells.forEach((cell) => cell.addEventListener("mouseout", cellOut))
	okBtn1.addEventListener("click", returnName1)
	okBtn2.addEventListener("click", returnName2)
	input1.addEventListener("keypress", pressEnter1)
	input2.addEventListener("keypress", pressEnter2)
	restartBtn.style.visibility = "hidden"
	restartBtn.addEventListener("click", restartGame)
	// statusText.textContent = `${currentPlayer}'s turn`;
	gameIsRunning = true
}

function pressEnter1(event) {
	if(event.key === "Enter") {
		// event.preventDefault()
		document.querySelector("#okBtn1").click()
	}
}

function pressEnter2(event) {
	if(event.key === "Enter") {
		// event.preventDefault()
		document.querySelector("#okBtn2").click()
	}
}

function cellClicked() {
	const cellIndex = this.getAttribute("cellIndex")

	if (options[cellIndex] != "" || !gameIsRunning) {
		return
	}

	updateCell(this, cellIndex)
	checkWinner()
}

function cellPreview() {
	const cellIndex = this.getAttribute("cellIndex")

	if (options[cellIndex] == "") {
		hoverCell(this)
	}
}

function hoverCell(cell) {
	cell.textContent = symbol
}

function cellOut() {
	const cellIndex = this.getAttribute("cellIndex")

	if (options[cellIndex] == "") {
		hideSymbol(this)
	}
}

function hideSymbol(cell) {
	cell.textContent = ""
}

function playRandomSound() {
	const sfx = document.querySelector("#SFX")
	const sfx2 = document.querySelector("#SFX2")
	const sfx3 = document.querySelector("#SFX3")
	const sfxArray = [sfx, sfx2, sfx3]

	let randomFile = sfxArray[Math.floor(Math.random() * sfxArray.length)]
	randomFile.play()
}

function updateCell(cell, index) {
	options[index] = symbol
	cell.textContent = symbol
	cell.style.color = "black"
	if (currentPlayer === player1name) {
		cell.style.backgroundColor = "green"
		player2div.style.border = "solid"
		player1div.style.borderColor = "transparent"
	} else if (currentPlayer === player2name) {
		cell.style.backgroundColor = "#a946b3"
		player1div.style.border = "solid"
		player2div.style.borderColor = "transparent"
	}
	playRandomSound()
}

function changePlayer() {
	symbol = symbol == "X" ? "0" : "X"
	currentPlayer = currentPlayer == player1name ? player2name : player1name
	if (player2name != null) {
		statusText.textContent = `${currentPlayer}'s turn`
	}
	console.log(player1name)
	console.log(player2name)
}

function checkWinner() {
	let roundWon = false

	for (let i = 0; i < winConditions.length; i++) {
		const condition = winConditions[i]
		var cellA = options[condition[0]]
		var cellB = options[condition[1]]
		var cellC = options[condition[2]]

		if (cellA == "" || cellB == "" || cellC == "") {
			continue
		}
		if (cellA == cellB && cellB == cellC) {
			roundWon = true
			break
		}
	}

	if (roundWon) {
		statusText.textContent = `${currentPlayer} WON!!!`
		winSound.play()
		restartBtn.style.visibility = "visible"
		video.style.display = "block"
		video.play()
		gameIsRunning = false
	} else if (!options.includes("")) {
		statusText.textContent = "DRAW!"
		gameIsRunning = false
	} else {
		changePlayer()
	}
}
function clearFields(field) {
	field.value = ""
}

function restartGame() {
	restartBtn.style.visibility = "hidden"
	changePlayer()
	// symbol = "X"
	options = ["", "", "", "", "", "", "", "", ""]
	statusText.textContent = `${currentPlayer}'s turn`
	cells.forEach((cell) => {
		cell.textContent = ""
		cell.style.backgroundColor = null
		cell.style.color = null
	})
	video.style.display = "none"
	gameIsRunning = true
}
