'use strict'

function setHints() {
  if (gHints.length < 3) {
    for (var i = 0; i < 3; i++) {
      gHints.push(HINT)
    }
    console.log(gHints)
    // renderHints()
  }
}

function renderHints() {
  var str = ``
  var elHint = document.querySelector('.hints-container')

  for (var i = 0; i < gHints.length; i++) {
    str += `<button class="hints" onclick="revealHint(this)">${HINT}</button><br /> `
  }

  elHint.innerHTML = str
}

function revealHint(elCell) {
  console.log('hello')
  var i = 6
  var j = 6
  var timer = setTimeout(expandShown(elCell, i, j), 1000)
  setTimeout(() => {
    clearTimeout(timer)
  }, 1000)

  gHints.pop()
  // renderHints()
}
