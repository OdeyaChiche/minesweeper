'use strict'

function startTimer() {
    var start = Date.now()
    var elTimer = document.querySelector('.timer')

    gTimer = setInterval(function () {
        const diff = Date.now() - start
        const secs = parseInt(diff / 100)

        var ms = (diff - secs * 100) + ''
        ms = ms.padStart(2, '0')

        elTimer.innerText = `Time: ${secs}.${ms}s`;
    }, 29);
}

function stopTimer() {
    clearInterval(gTimer)
}