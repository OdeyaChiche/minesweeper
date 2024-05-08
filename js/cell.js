'use strict'

function onCellClicked(elCell, i, j) {
  if (gGame.isDone !== true && gBoard[i][j].isMarked === false) {
    if (gGame.isOn === false) {
      setMines(gBoard, i, j)
      setMinesNegsCount(gBoard)
      startTimer()

      console.log(gMines)
      console.log(gBoard)
      gGame.isOn = true
    }
    if (gBoard[i][j].isShown !== true) {
      if (gBoard[i][j].isMine === false && gBoard[i][j].isMarked === false) {
        gGame.shownCount++
      }
      //   gBoard[i][j].isShown === true

      console.log(gMines)
      console.log(gGame)
    }
    renderCell(elCell, i, j)
    checkGameOver()
  }
}

function renderCell(elCell, i, j) {
  elCell.style.backgroundColor = 'lightblue'
  if (gBoard[i][j].isMine === false && gBoard[i][j].minesAroundCount !== 0) {
    elCell.innerText = gBoard[i][j].minesAroundCount
    gBoard[i][j].isShown = true
  } else if (
    gBoard[i][j].isMine === true &&
    gBoard[i][j].isMarked !== true &&
    gBoard[i][j].isShown !== true
  ) {
    elCell.innerText = MINE
    gGame.markedCount++

    gLives.pop()
    renderLives()
    gBoard[i][j].isShown = true
  } else if (gBoard[i][j].isMine !== true) {
    elCell.innerText = EMPTY
    gBoard[i][j].isShown = true
    expandShown(gBoard, elCell, i, j)
  }
}

function expandShown(board, elCell, iPos, jPos) {
  var cellValue
  var currCell

  for (var i = iPos - 1; i <= iPos + 1; i++) {
    if (i < 0 || i >= board.length) continue
    for (var j = jPos - 1; j <= jPos + 1; j++) {
      if (
        j < 0 ||
        j >= board.length ||
        (i === iPos && j === jPos) ||
        board[i][j].isShown === true
      )
        continue

      currCell = document.querySelector(`.cell-${i}-${j}`)
      currCell.style.backgroundColor = 'lightblue'

      if (board[i][j].isShown !== true) {
        gGame.shownCount++
        board[i][j].isShown = true
      }

      cellValue =
        board[i][j].isMine === false && board[i][j].minesAroundCount !== 0
          ? board[i][j].minesAroundCount
          : EMPTY
      currCell.innerText = cellValue
      console.log(gGame)
    }
  }
}

function onCellMarked(elCell, i, j) {
  if (gGame.isDone !== true) {
    document.addEventListener('contextmenu', function (event) {
      event.preventDefault()
    })

    if (gBoard[i][j].isMarked === false && gBoard[i][j].isShown !== true) {
      elCell.innerText = FLAG
      gBoard[i][j].isMarked = true

      if (gBoard[i][j].isMine === true && gBoard[i][j].isShown !== true) {
        gGame.markedCount++
        gBoard[i][j].isShown = true
      }
    } else if (
      gBoard[i][j].isMarked === true 
    ) {
      elCell.innerText = EMPTY
      gBoard[i][j].isMarked = false
      if (gBoard[i][j].isMine === true) {
        gGame.markedCount--
        gBoard[i][j].isShown = false
      }
    }
  }
  console.log(gGame)
}
