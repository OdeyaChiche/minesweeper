'use strict'

function checkGameOver() {
  var elTimer
  if (gLives.length === 0) {
    renderSmiley(LOSER)
    playLosingSound()
    gGame.isDone = true
    stopTimer()
  }
  if (
    gGame.markedCount === gLevel.mines &&
    gGame.shownCount === gLevel.size * gLevel.size - gLevel.mines
  ) {
    renderSmiley(WINNER)
    playWinningSound()
    gGame.isDone = true
    stopTimer()
    elTimer = document.querySelector('.timer')
    gGame.secsPassed = elTimer.innerText
  }
}

function resetGame() {
  var elBtnSafeClick

  stopTimer()
  gGame.isDone = false
  gGame.isOn = false
  gGame.shownCount = 0
  gGame.markedCount = 0
  gGame.secsPassed = 0

  for (var i = 0; i < gLevel.size; i++) {
    for (var j = 0; j < gLevel.size; j++) {
      gBoard[i][j].minesAroundCount = ' '
      gBoard[i][j].isShown = false
      gBoard[i][j].isMine = false
      gBoard[i][j].isMarked = false
    }
  }

  setLives(3)
  renderLives()
  renderBoard(gBoard)
  resetMines()

  gClicksAvailable = 4
  elBtnSafeClick = document.querySelector('.safe-click')
  elBtnSafeClick.innerHTML = `Safe Click <br> ${--gClicksAvailable} clicks available`
}

function playWinningSound() {
  var sound = new Audio('/music/winning.mp3')
  sound.play()
}

function playLosingSound() {
  var sound = new Audio('/music/losing.wav')
  sound.play()
}
