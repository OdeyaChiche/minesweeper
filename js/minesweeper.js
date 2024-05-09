'use strict'

const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ' '
const LIFE = '❤️'
const SMILEY = '😀'
const LOSER = '💀'
const WINNER = '😎'
const HINT = '💡'

var gBoard = []
var gLevel = { size: 8, mines: 14 }
var gGame = {}
var gMines = []
var gLives = []
var gHints = []
var gTimer = 0
var gMarkedMines

function onInit() {
  resetMines()
  gBoard = buildBoard()
  renderBoard(gBoard)

  document.querySelector('.timer').innerText = `${0}s`
  setHints()
  gMarkedMines = 14
  displayNumOfdMines()

  console.log(gMines)
}

function chooseLevel(chosenSize, levelMines) {
  stopTimer()
  if (gLevel.size != chosenSize && gLevel.mines != levelMines) {
    gLevel.size = chosenSize
    gLevel.mines = levelMines
  }
  console.log(gLevel)
  onInit()
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
        isMarked: false,
      }
    }
  }

  gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    isDone: false,
  }
  console.table(board)
  // console.table(gGame)
  return board
}

function renderBoard(board) {
  var strHTML = ''
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < board[i].length; j++) {
      var cell = EMPTY

      const className = `cell-${i}-${j}`

      strHTML += `<td class="${className}" onclick= "onCellClicked(this, ${i}, ${j})" 
      oncontextmenu=" onCellMarked(this, ${i}, ${j})" >${cell}</td>`
    }
    strHTML += '</tr>'
  }
  const elBoard = document.querySelector('.board')
  elBoard.innerHTML = strHTML

  setLives(3)
  renderLives()
  renderSmiley(SMILEY)
}

function renderSmiley(emoji) {
  var elbtn = document.querySelector('.btn-smiley')
  elbtn.innerText = `${emoji}`
}
