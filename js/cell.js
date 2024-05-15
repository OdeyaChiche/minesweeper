'use strict'

var gClicksAvailable = 3

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

      console.log(gMines)
    }
    renderCell(elCell, i, j)
    checkGameOver()
    console.log(gGame)
    console.log(gLevel)
  }
}

function renderCell(elCell, i, j) {
  elCell.style.backgroundColor = 'rgba(243, 226, 226, 0.477)'
  elCell.style.borderTopColor = 'grey'
  elCell.style.borderBottomColor = 'grey'
  elCell.style.borderRightColor = 'grey'
  elCell.style.borderLeftColor = 'grey'

  if (gBoard[i][j].isMine === false && gBoard[i][j].minesAroundCount !== 0) {
    elCell.innerText = gBoard[i][j].minesAroundCount
    gBoard[i][j].isShown = true
  } else if (
    gBoard[i][j].isMine === true &&
    gBoard[i][j].isMarked !== true &&
    gBoard[i][j].isShown !== true
  ) {
    elCell.innerText = MINE

    gMarkedMines--
    displayNumOfdMines()
    if (gLevel.size > 4) displayNumOfdMines()
    gGame.markedCount++

    gLives.pop()
    renderLives()
    gBoard[i][j].isShown = true
  } else if (gBoard[i][j].isMine !== true) {
    elCell.innerText = EMPTY
    gBoard[i][j].isShown = true
    openRecursively(gBoard, i, j)
  }
}

function openRecursively(board, iPos, jPos) {
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
      currCell.style.backgroundColor = 'rgba(243, 226, 226, 0.477)'

      currCell.style.borderTopColor = 'grey'
      currCell.style.borderBottomColor = 'grey'
      currCell.style.borderRightColor = 'grey'
      currCell.style.borderLeftColor = 'grey'

      if (board[i][j].isShown !== true) {
        gGame.shownCount++
        board[i][j].isShown = true
      }

      cellValue =
        board[i][j].isMine === false && board[i][j].minesAroundCount !== 0
          ? board[i][j].minesAroundCount
          : EMPTY

      if (cellValue === board[i][j].minesAroundCount) {
        currCell.innerText = cellValue
      } else openRecursively(board, i, j)
    }
  }
}

function expandShown(elCell, iPos, jPos) {
  var cellValue

  for (var i = iPos - 1; i <= iPos + 1; i++) {
    if (i < 0 || i >= board.length) continue
    for (var j = jPos - 1; j <= jPos + 1; j++) {
      if (j < 0 || j >= board.length) continue

      elCell = document.querySelector(`.cell-${i}-${j}`)
      elCell.style.backgroundColor = 'pink'

      elCell.style.borderTopColor = 'grey'
      elCell.style.borderBottomColor = 'grey'
      elCell.style.borderRightColor = 'grey'
      elCell.style.borderLeftColor = 'grey'

      if (board[i][j].isMine === false) cellValue = MINE
      else if (board[i][j].minesAroundCount !== 0)
        cellValue = board[i][j].minesAroundCount
      else cellValue = EMPTY
      elCell.innerText = cellValue

      console.log(gGame)
    }
  }
}

function onCellMarked(elCell, i, j) {
  if (gGame.isOn === true) {
    document.addEventListener('contextmenu', function (event) {
      event.preventDefault()
    })

    if (gBoard[i][j].isMarked === false && gBoard[i][j].isShown !== true) {
      elCell.innerText = FLAG
      gBoard[i][j].isMarked = true

      gMarkedMines--
      displayNumOfdMines()

      // if (gLevel.size > 4) displayNumOfdMines()

      if (gBoard[i][j].isMine === true && gBoard[i][j].isShown !== true) {
        gGame.markedCount++
        gBoard[i][j].isShown = true
      }
    } else if (gBoard[i][j].isMarked === true) {
      elCell.innerText = EMPTY
      gMarkedMines++
      displayNumOfdMines()

      gBoard[i][j].isMarked = false

      if (gBoard[i][j].isMine === true) {
        gGame.markedCount--
      
        gBoard[i][j].isShown = false
      }
    }
  }
  console.log(gGame)
  checkGameOver()
}

function safeClick(board) {
  var currCell = {}
  var safeCells = []
  var randomNum
  var elBtnSafeClick
  var cellPicked
  console.log(gClicksAvailable)

  if (gClicksAvailable > 0 && gGame.isOn === true) {
    for (var i = 0; i < gLevel.size; i++) {
      for (var j = 0; j < gLevel.size; j++) {
        if (board[i][j].isMine === false && board[i][j].isShown === false) {
          currCell = { i, j }
          safeCells.push(currCell)
        }
      }
    }
    console.log(safeCells)

    randomNum = getRandomInt(0, safeCells.length)
    console.log(randomNum)

    safeCells[randomNum].i

    elBtnSafeClick = document.querySelector('.safe-click')
    elBtnSafeClick.innerHTML = `Safe Click <br> ${--gClicksAvailable} clicks available`

    var cellPicked = document.querySelector(
      `.cell-${safeCells[randomNum].i}-${safeCells[randomNum].j}`
    )
    cellPicked.classList.add('highlight')

    setTimeout(() => {
      cellPicked.classList.remove('highlight')
    }, 1000)
  }

  checkGameOver()
}
