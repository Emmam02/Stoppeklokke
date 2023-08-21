let [seconds, minutes, hours] = [0, 0, 0];
let timeDisplay = document.querySelector(".timer");
let pauseClick = document.getElementById("pauseClick");
let time = null;
let listOfTimes=  null;//document.getElementById("listOfTimes");
let resetButtonClicked = false;

/* Denne gjør så klokken går opp 1 hvert sekund, når sekunder går til 60,
så vil den sette 1 på minutter, når minutter går til 60 vil den sette 1 på timer.*/

function stopWatch() {
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
            minutes = 0;
            hours++;
        }
    }

    timeDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    // Denne gjør så det vises 2 siffer før den går opp til 10 istedet for 1. Eks: 01, 02, 03 osv.
}

/*Dette gjør så telleren starter når man trykker på "start" knappen. Den viser også til hvor lang tid 
det skal ta før den teller oppover, i dette tilfellet er det 1000, som tilsvarer 1 sekund.*/ 
function start() {
    if (time !== null) {
        clearInterval(time);
    }

    if (!listOfTimes) {
        listOfTimes = document.createElement("ul");
        listOfTimes.id = "listOfTimes";
        pauseClick.appendChild(listOfTimes);
    }

    time = setInterval(stopWatch, 1000);
console.log('start');
}

/* Dette gjør at når du trykker på "stopp" så vil den lagre det tidspunktet du er på i en 
liste, gå til 0 og starte på nytt automatisk */
function stop() {
    clearInterval(time);

    const pausedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    if (pauseClick) {
        const listItem = document.createElement("li");
        listItem.textContent = `Tid: ${pausedTime}`;
        listOfTimes.appendChild(listItem);
    }

    hours = 0;
    minutes = 0;
    seconds = 0;
    
    timeDisplay.textContent = "00:00:00";

   console.log('stop')
        start();
    

}

/*Dette gjør at stilleren nullstiller seg helt, det vil si at den går tilbake til 0 og sletter lagrede tider i listen.
når man da bruker telleren igjen så vil den lage en ny liste med tider når man trykker på "stopp".*/
function reset() {
    timeDisplay.textContent = "00:00:00";

    if (listOfTimes) {
        listOfTimes.remove();
        listOfTimes = null;
    }

    hours = 0;
    minutes = 0;
    seconds = 0;

    if (pauseClick) {
        pauseClick.textContent = "";
    }

    resetButtonClicked = true;

    clearInterval(time);
    console.log('reset')
}
