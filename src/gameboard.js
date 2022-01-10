const Gameboard = () => {
    let board = []

    for (let i = 0; i < 10; i++) {
        board[i] = []
        for (let j = 0; j < 10; j++)
        board[i][j] = 0
    }

    const insertShip = (ship, row, col, orientation) => {
        if (verifyPossibility(ship, row, col, orientation)) {
            if (orientation === 'row') {
                for(let i = col; i < col + ship.length; i++) {
                    board[row][i] += 1
                }
            } else if (orientation === 'col') {
                for(let i = row; i < row + ship.length; i++) {
                    board[i][col] += 1
                }
            }
            return true
        } else {
            return false
        }
    }

    const verifyPossibility = (ship, row, col, orientation) => {
        if (orientation === 'row' && col + ship.length <= 10 ||
            orientation === 'col' && row + ship.length <= 10) {
            for (let i = 0; i < ship.length; i++) {
                if (orientation === 'row' && board[row][col + i] === 1) {
                    return false
                }
            }
            for (let i = 0; i < ship.length; i++) {
                if (orientation === 'col' && board[row + i][col] === 1) {
                    return false
                }
            }
            return true
        } else {
            return false
        }
    }

    const receiveAttack = (row, col) => {
        if (board[row][col] === 0) {
            board[row][col] = -1
            console.log('Water')
            return false
        } else if (board[row][col] === 1) {
            board[row][col] = -1
            console.log('Hit')
            if (verifyEndGame()) {
                return 'end'
            }
            return true
        } 
    }

    const verifyEndGame = () => {
        if (board.some( row => row.some( value => value == 1))) {
            return false
        } else {
            console.log('End game')
            return true
        }
    }

    return {board, insertShip, receiveAttack}
}

const Ship = (length) => {
    return {length}
}

const Player = (name) => {
    return {name}
}

module.exports = {
    Gameboard,
    Ship,
    Player,
}