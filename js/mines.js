'use strict'

function setMines(board, iEx, jEx) {
  var numOfMines = gLevel.mines
  var iPos
  var jPos

  for (var i = 0; i < numOfMines; i++) {
    iPos = getRandomIntInclusive(0, gLevel.size - 1)
    jPos = getRandomIntInclusive(0, gLevel.size - 1)

    while (iPos === iEx || jPos === jEx || gBoard[iPos][jPos].isMine === true) {
      iPos = getRandomIntInclusive(0, gLevel.size - 1)
      jPos = getRandomIntInclusive(0, gLevel.size - 1)
    }

    gMines.push({ i: iPos, j: jPos })
    board[iPos][jPos].isMine = true
  }

  // board[1][1].isMine = true
  // board[2][3].isMine = true
}

function setMinesNegsCount(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      board[i][j].minesAroundCount = minesNegsCount(board, i, j)
    }
  }

  function minesNegsCount(board, iPos, jPos) {
    var countMine = 0

    for (var i = iPos - 1; i <= iPos + 1; i++) {
      if (i < 0 || i >= board.length) continue
      for (var j = jPos - 1; j <= jPos + 1; j++) {
        if (i === iPos && j === jPos) continue
        if (j < 0 || j >= board.length) continue
        if (board[i][j].isMine === true) countMine++
      }
    }
    return countMine
  }
}

function resetMines() {
  gMines.splice(0, gMines.length)
}

function mineExterminator(mines) {
  if (
    (gLevel.size === 8 && gLevel.mines > 11) ||
    (gLevel.size === 12 && gLevel.mines > 30)
  ) {
    var numOfEliminatedMines = 3
    var removedMine
    var removedMines = []
    var checkmine = mines.length - 1

    for (var iPos = 0; iPos < numOfEliminatedMines; iPos++) {
      while (numOfEliminatedMines > 0) {
        var elCell

        if (gBoard[mines[checkmine].i][mines[checkmine].j].isShown === false) {
          removedMines.push(mines.pop())
          console.log(removedMines)
        }

        checkmine--
        numOfEliminatedMines--
      }
      console.log(removedMines)

      elCell = document.querySelector(
        `.cell-${removedMines[iPos].i}-${removedMines[iPos].j}`
      )
      elCell.innerText = EMPTY
    }

    for (var i = 0; i < 3; i++) {
      gBoard[removedMines[i].i][removedMines[i].j].isMine = false
      gLevel.mines--
    }
    console.log(gLevel.mines)
    setMinesNegsCount(gBoard)
    console.log(removedMines)
    console.log(gBoard)
    console.log(gMines)
    gMarkedMines-=2
    displayNumOfdMines()
  }
}

function displayNumOfdMines() {
  if (gMarkedMines >= 0) {
    var elNumOfMines = document.querySelector('.marked-mines')
    elNumOfMines.innerText = gMarkedMines
    gMarkedMines--
    console.log(gMarkedMines)
  }
}
