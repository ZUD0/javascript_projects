const newYears = '1 Jan 2022';

function countdown() {
    const newYearsDate = new Date(newYears);
    const currentDate = new Date();
    
    const totalSeconds = (newYearsDate - currentDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    const d = document.querySelector('#days');
    const h = document.querySelector('#hours');
    const m = document.querySelector('#minutes');
    const s = document.querySelector('#seconds');

    d.innerHTML = days;
    h.innerHTML = hours;
    m.innerHTML = minutes;
    s.innerHTML = seconds;
};

setInterval(countdown, 1000);