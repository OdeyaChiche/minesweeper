'use strict'

function checkGameOver() {
    if (gLives.length === 0) {renderSmiley(LOSER)
      gGame.isDone = true
    stopTimer()}
    if (
      gGame.markedCount === gLevel.mines &&
      gGame.shownCount === gLevel.size * gLevel.size - gLevel.mines
    ) {
      renderSmiley(WINNER)
      gGame.isDone = true
      stopTimer()
    }
  }

  function resetGame() {
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
    stopTimer()
  }