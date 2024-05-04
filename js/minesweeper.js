'use strict'

const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ' '

var gBoard = []
var gLevel = { size: 4, mines: 2 }
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }
var gMines = []

function onInit() {
  gBoard = buildBoard()
  setMines(gBoard)
  setMinesNegsCount(gBoard)
  renderBoard(gBoard)
}

function buildBoard() {
  const board = []

  for (var i = 0; i < gLevel.size; i++) {
    board[i] = []

    for (var j = 0; j < gLevel.size; j++) {
      board[i][j] = {
        minesAroundCount: ' ',
        isShown: false,
        isMine: false,
        isMarked: true,
      }
    }
  }

  console.table(board)
  // console.table(gGame)
  return board
}

function setMines(board) {
  // var numOfMines = gLevel.mines
  // var iPos
  // var jPos

  // for (var i = 0; i < numOfMines; i++) {
  //   iPos = getRandomIntInclusive(0, gLevel.size - 1)
  //   jPos = getRandomIntInclusive(0, gLevel.size - 1)

  //   board[iPos][jPos].isMine = true
  //   gMines.push({ i: iPos, j: jPos })
  // }

  // console.log(gMines)
  board[1][1].isMine = true
  board[2][3].isMine = true
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

function renderBoard(board) {
  var strHTML = ''
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < board[i].length; j++) {
      var cell = EMPTY

      const className = `cell-${i}-${j}`

      strHTML += `<td class="${className}" onclick= "onCellClicked(this, ${i}, ${j})" >${cell}</td>`
    }
    strHTML += '</tr>'
  }
  const elBoard = document.querySelector('.board')
  elBoard.innerHTML = strHTML
}

function onCellClicked(elCell, i, j) {
  gGame.isOn = true
  gBoard[i][j].isShown = true

  // console.table(gGame)
  // console.log(gBoard)

  elCell = document.querySelector(`.cell-${i}-${j}`)

  if (gBoard[i][j].isMine === false && gBoard[i][j].minesAroundCount !== 0)
    elCell.innerText = gBoard[i][j].minesAroundCount
  else if (gBoard[i][j].isMine === true) elCell.innerText = MINE
  else {
    expandShown(gBoard, elCell, i, j)
  }
}

function onCellMarked(elCell) {}

function checkGameOver() {}

function expandShown(board, elCell, iPos, jPos) {
  var cellValue

  for (var i = iPos - 1; i <= iPos + 1; i++) {
    if (i < 0 || i >= board.length) continue
    for (var j = jPos - 1; j <= jPos + 1; j++) {
      if (j < 0 || j >= board.length) continue

      cellValue =
        board[i][j].isMine === false && board[i][j].minesAroundCount !== 0
          ? board[i][j].minesAroundCount
          : EMPTY
      elCell = document.querySelector(`.cell-${i}-${j}`)
      elCell.innerText = cellValue
    }
  }
}
