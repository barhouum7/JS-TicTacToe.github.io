const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const X_SHADOW_CLASS = 'x'
const CIRCLE_SHADOW_CLASS = 'circle'
const board = document.getElementById('board')
const cellElements = document.querySelectorAll('[data-cell]')

const userMarkChoice = prompt("Hi Dear Hero, You Want To Play By `X` or `O`", "X or O")


let circleMarkTurn
placeShadowMark()

cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true })
})

function handleClick(event) {
    let cell = event.target
    let currentMark = circleMarkTurn ? CIRCLE_CLASS : X_CLASS

    // 1 - PlaceMark
    placeMark(cell, currentMark)

    // 2 - Check For Wins?
    // 3 - Check For Drow?
    // 4 - Else Switch Turns
    swapMark()
    // 0 - Place Shadow of Mark
    placeShadowMark()

}

function placeMark(cell, currentMark) {
    cell.classList.add(currentMark)
}

function placeShadowMark() {
    board.classList.remove(CIRCLE_SHADOW_CLASS)
    board.classList.remove(X_SHADOW_CLASS)
    if (userMarkChoice.toUpperCase() === 'X') {
        if (circleMarkTurn) {
            board.classList.add(CIRCLE_SHADOW_CLASS)
        } else {
            board.classList.add(X_SHADOW_CLASS)
        }
    } else {
        if (!circleMarkTurn) {
            board.classList.add(CIRCLE_SHADOW_CLASS)
        } else {
            board.classList.add(X_SHADOW_CLASS)
        }
    }
}

function swapMark() {
    circleMarkTurn = !circleMarkTurn
}