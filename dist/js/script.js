const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const X_SHADOW_CLASS = 'x'
const CIRCLE_SHADOW_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')
const cellElements = document.querySelectorAll('[data-cell]')
const userInfo = document.querySelector('.infos')

const userMarkChoice = prompt("Hi Dear Hero, You Want To Play By `X` or `O`", "X or O")


let circleMarkTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    if (userMarkChoice.toUpperCase() === 'O') {
        circleMarkTurn = true
    }

    if (userMarkChoice.toUpperCase() === 'X') {
        userInfo.innerHTML = '<b>Xs</b> For <b>You</b><b><br>vs<br></b><b>Os</b> For The <b>AI</b><-( Soon )'
    } else if (userMarkChoice.toUpperCase() === 'O') {
        userInfo.innerHTML = '<b>Os</b> For <b>You</b><b><br>vs<br></b><b>Xs</b> For The <b>AI</b><-( Soon )'
    } else {
        userInfo.innerHTML = '<b>Xs</b> For <b>You</b><b><br>vs<br></b><b>Os</b> For The <b>AI</b><-( Soon )'
    }

    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    placeShadowMark()
    winningMessageElement.classList.remove('show')
}

function handleClick(event) {
    let cell = event.target
    let currentClass = circleMarkTurn ? CIRCLE_CLASS : X_CLASS

    // 1 - PlaceMark
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDrow()) {
        endGame(true)
    } else {
        swapMark()
        placeShadowMark()
    }

    // 0 - Place Shadow of Mark
    // 2 - Check For Wins?
    // 3 - Check For Drow?
    // 4 - Else Switch Turns

}

function endGame(drow) {
    if (drow) {
        winningMessageTextElement = 'Drow!'
    } else {
        winningMessageTextElement.innerText = `${circleMarkTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDrow() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(CIRCLE_CLASS) || cell.classList.contains(X_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function placeShadowMark() {
    board.classList.remove(CIRCLE_SHADOW_CLASS)
    board.classList.remove(X_SHADOW_CLASS)
    if (circleMarkTurn) {
        board.classList.add(CIRCLE_SHADOW_CLASS)
    } else {
        board.classList.add(X_SHADOW_CLASS)
    }
}

function swapMark() {
    circleMarkTurn = !circleMarkTurn
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}