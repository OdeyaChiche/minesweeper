'use strict'

function startTimer() {
    var start = Date.now()
    var elTimer = document.querySelector('.timer')

    gTimer = setInterval(function () {
        const diff = Date.now() - start
        const secs = parseInt(diff / 1000)

        var ms = (diff - secs * 1000) + ''
        ms = ms.padStart(3, '0')

        elTimer.innerText = `${secs}.${ms}s`
    }, 29);
}

function stopTimer() {
    clearInterval(gTimer)
}