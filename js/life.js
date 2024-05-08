'use strict'

function setLives(numOfLives) {
    while (gLives.length < 3) {
      gLives.push(LIFE)
    }
  }

  function renderLives() {
    var str = ``
    var elLives = document.querySelector('.life')
  
    for (var i = 0; i < gLives.length; i++) {
      str += `${LIFE}`
    }
  
    elLives.innerText = str
  }