import { Gameboard, Ship, Player } from "./gameboard.js"
import './style.css'

let mode = 'PlaceShips'
let orientation = 'row'

const placeships = (row, col) => {
    if (gameboard.insertShip(ships[shipNumber], Number(row), Number(col), orientation)) {
        boardElement.updateBoardElement(ships[shipNumber], Number(row), Number(col), orientation)
        shipNumber++

        if (shipNumber === 4) {
            console.log('Start game')
            mode = 'game'
            game.startGame()
        }
    }
}

const play = (row, col) => {
    let hit = boards[1].receiveAttack(Number(row), Number(col))

    if (hit) {
        if(hit === 'end') {
            game.endGame()
        }
        boardElements[1].boardElementHit(boardElements[1].gameBoard.id, 
                                        row, col, 'hit')
    } else {
        boardElements[1].boardElementHit(boardElements[1].gameBoard.id, row, 
                                        col, 'water')
    }

    boardElements.reverse()
    boards.reverse()
    game.nextPlayer()
}

const generateCord = () => {

    let newNumber = () => Math.floor(Math.random() * 10)
    let row = newNumber()
    let col = newNumber()

    if (memory.some( x => x === `${row}${col}`)) {
        return generateCord()
    } else {
        memory.push(`${row}${col}`)
        return [row, col]
    }
}

const selectPlace = (e) => {

    let row = e.target.id[2]
    let col = e.target.id[3]

    if (mode === 'PlaceShips') {
        placeships(row, col)

    } else if(mode === 'game') {
        play(row, col)

        let cords = generateCord()
        play(cords[0], cords[1]) 
    }
}

const createBoardElement = (id) => {
    const gameBoard = document.createElement('div')
    gameBoard.id = `${id}`
    let div = null
    let place = null
    for (let i = 0; i < 10; i++) {
        div = document.createElement('div')
        div.id = 'row'
        for (let j = 0; j < 10; j++) {
            place = document.createElement('div')
            place.id = `${id}${i}${j}`
            place.classList.add(`square`)
            
            if (id === 'b0') {
                place.addEventListener('mouseover', on)
                function on(e) {
                    let id = e.target.id
                    for (let i = 0; i < ships[shipNumber].length; i++) {
                        if (orientation === 'row') {
                            document.querySelector(`#b0${id[2]}${Number(id[3]) + i}`).classList.add('on')
                        } else {
                            document.querySelector(`#b0${Number(id[2]) + i}${id[3]}`).classList.add('on')
                        }
                    }
                }
    
                place.addEventListener('mouseout', off)
                function off(e) {
                    let id = e.target.id
                    for (let i = 0; i < ships[shipNumber].length; i++) {
                        if (orientation === 'row') {
                            document.querySelector(`#b0${id[2]}${Number(id[3]) + i}`).classList.remove('on')
                        } else {
                            document.querySelector(`#b0${Number(id[2]) + i}${id[3]}`).classList.remove('on')
                        }
                    }
                }
            }

            place.addEventListener('click', selectPlace)
            div.appendChild(place)
        }
        gameBoard.appendChild(div)
        document.querySelector('#container').appendChild(gameBoard)
    }

    const updateBoardElement = (ship, row, col, orientation) => {
        if (orientation === 'row') {
            for(let i = col; i < col + ship.length; i++) {
                let div = document.getElementById(`b0${row}${i}`)
                div.classList.add('ship')
            }
        } else if (orientation === 'col') {
            for(let i = row; i < row + ship.length; i++) {
                let div = document.getElementById(`b0${i}${col}`)
                div.classList.add('ship')
            }
        }
    }

    const boardElementHit = (id ,row, col, condition) => {
        let div = document.querySelector(`#${id}${row}${col}`)
        div.classList.add('disable')
        condition === 'hit' ? div.style.backgroundColor = 'red' :
                            div.style.backgroundColor = 'blue'
    }

    return {updateBoardElement, gameBoard, boardElementHit}
}

const Game = () => {
    const player1 = 0
    const player2 = 1

    let currentPlayer = player1

    function nextPlayer() {
        this.currentPlayer === player1 ? this.currentPlayer = player2 : this.currentPlayer = player1
    }

    const startGame = () => {
        boardElements[0].gameBoard.classList.add('disable')
        boardElements[0].gameBoard.classList.add('start')
        boardElements[1].gameBoard.classList.remove('hidden')
        boardElements[1].gameBoard.classList.add('start')
        document.querySelector('#orientation').classList.add('hidden')
    }

    const endGame = () => {
        const end = document.querySelector('#end')
        end.classList.remove('hidden')
        const winner = document.querySelector('#winner')
        if (game.currentPlayer === 0) {
            winner.textContent = 'You win!'
        } else {
            winner.textContent = 'You lose!'
        }
        const play = document.querySelector('#play')
        play.addEventListener('click', reset)
    }

    const reset = () => {
        console.log('reset')
    }

    return { nextPlayer , startGame , currentPlayer , endGame}
}



const changeOrientation = () => {
    orientation === 'row' ? orientation = 'col' : orientation = 'row'
}

document.querySelector('#orientation').addEventListener('click', changeOrientation)

// DOM BOARDS //

const boardElement = createBoardElement('b0')
const opponentboardElement = createBoardElement('b1')

boardElement.gameBoard.classList.add('board')
opponentboardElement.gameBoard.classList.add('board')

let boardElements = [boardElement, opponentboardElement]

opponentboardElement.gameBoard.classList.add('hidden')

// BOARDS //

const gameboard = Gameboard()
const opponentgameboard = Gameboard()
let boards = [gameboard, opponentgameboard]

// SHIPS //

const ship1 = Ship(2)
const ship2 = Ship(3)
const ship3 = Ship(4)
const ship4 = Ship(5)
const ships = [ship1, ship2, ship3, ship4]
let shipNumber = 0

opponentgameboard.insertShip(ship1, 0, 0, 'row')
opponentgameboard.insertShip(ship2, 1, 0, 'row')
opponentgameboard.insertShip(ship3, 2, 0, 'row')
opponentgameboard.insertShip(ship4, 3, 0, 'row')

// GAME //

const game = Game()
const memory = []









