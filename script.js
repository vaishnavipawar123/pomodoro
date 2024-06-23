// script.js
let breakLength = 5;
let sessionLength = 25;
let isRunning = false;
let interval;
let isSession = true;
let timeLeft = sessionLength * 60;

const breakLengthElement = document.getElementById('break-length');
const sessionLengthElement = document.getElementById('session-length');
const timeLeftElement = document.getElementById('time-left');
const timerLabelElement = document.getElementById('timer-label');
const beepElement = document.getElementById('beep');

const updateDisplay = () => {
    timeLeftElement.textContent = formatTime(timeLeft);
    breakLengthElement.textContent = breakLength;
    sessionLengthElement.textContent = sessionLength;
};

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

document.getElementById('break-decrement').addEventListener('click', () => {
    if (breakLength > 1) {
        breakLength--;
        if (!isRunning && !isSession) {
            timeLeft = breakLength * 60;
        }
        updateDisplay();
    }
});

document.getElementById('break-increment').addEventListener('click', () => {
    if (breakLength < 60) {
        breakLength++;
        if (!isRunning && !isSession) {
            timeLeft = breakLength * 60;
        }
        updateDisplay();
    }
});

document.getElementById('session-decrement').addEventListener('click', () => {
    if (sessionLength > 1) {
        sessionLength--;
        if (!isRunning && isSession) {
            timeLeft = sessionLength * 60;
        }
        updateDisplay();
    }
});

document.getElementById('session-increment').addEventListener('click', () => {
    if (sessionLength < 60) {
        sessionLength++;
        if (!isRunning && isSession) {
            timeLeft = sessionLength * 60;
        }
        updateDisplay();
    }
});

document.getElementById('start_stop').addEventListener('click', () => {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
    } else {
        interval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                beepElement.play();
                isSession = !isSession;
                timerLabelElement.textContent = isSession ? 'Session' : 'Break';
                timeLeft = (isSession ? sessionLength : breakLength) * 60;
            }
        }, 1000);
        isRunning = true;
    }
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(interval);
    isRunning = false;
    isSession = true;
    breakLength = 5;
    sessionLength = 25;
    timeLeft = sessionLength * 60;
    timerLabelElement.textContent = 'Session';
    beepElement.pause();
    beepElement.currentTime = 0;
    updateDisplay();
});

updateDisplay();
