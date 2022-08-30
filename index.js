var golds = 0;
var x = 1;
var gps = 0;

var clickaudio = new Audio('audio/clicksound.wav');
var shopaudio = new Audio('audio/shopsound.wav');

var minions = [
    { id: 1, name: "Atom", cost: 15, gps: 1, owned: 0 }, //15
    { id: 2, name: "Virus", cost: 200, gps: 10, owned: 0 }, //200
    { id: 3, name: "Fish", cost: 1000, gps: 25, owned: 0 }, //1k
    { id: 4, name: "Frog", cost: 20000, gps: 50, owned: 0 }, //20k
    { id: 5, name: "Dinosaur", cost: 100000, gps: 100, owned: 0 }, //100k
    { id: 6, name: "Monkey", cost: 500000, gps: 500, owned: 0 }, //500k
    { id: 7, name: "Human", cost: 2500000, gps: 2000, owned: 0 }, //2.5M
    { id: 8, name: "Alien", cost: 100000000, gps: 99999, owned: 0 }, //100M
];

function clicked() {
    clickaudio.load();
    clickaudio.play();
    addGold(x);
    displayGolds();
}

function displayGolds() {
    document.getElementById("dna").innerHTML = golds;
}

function addGold(x) {
    golds += x;
}

function addGPS() {
    setInterval(function () {
        addGold(gps);
        displayGolds();
        displayGPS();
    }, 1000);
}

function getGPS() {
    gps = 0;
    minions.forEach(function (minion) {
        gps += minion.gps * minion.owned;
    });
}

function displayGPS() {
    document.getElementById("dnaps").innerHTML = gps;
}

function displayMinion(id) {
    minions.forEach(function (minion) {
        if (minion.id == id) {
            document.getElementById(`name${minion.id}`).innerHTML = minion.name;
            document.getElementById(`cost${minion.id}`).innerHTML = minion.cost;
            document.getElementById(`gps${minion.id}`).innerHTML = minion.gps;
            document.getElementById(`owned${minion.id}`).innerHTML = minion.owned;
        }
    });
}

function buyMinion(id) {
    minions.forEach(function (minion) {
        if (minion.id == id && golds >= minion.cost) {
            golds -= minion.cost;
            minion.owned = minion.owned + 1;
            minion.cost = Math.trunc(minion.cost * 1.15);
            if (minion.owned == 25) {
                minion.gps *= 2;
            }
            if (minion.owned == 50) {
                minion.gps *= 4;
            }
            if (minion.owned == 100) {
                minion.gps *= 8;
            }
            if (minion.owned == 250) {
                minion.gps *= 16;
            }
            if (minion.owned == 1000) {
                minion.gps *= 32;
            }
            shopaudio.load();
            shopaudio.play();
            multiplicator();
            getGPS();
            displayGPS();
            displayMinion(id);
        }
    });
}

function multiplicator() {
    let all_owned = 0;
    minions.forEach(function (minion) {
        all_owned += minion.owned;
    });
    if (all_owned >= 50) {
        x = 2 ** Math.trunc(all_owned / 50);
    }
}

addGPS();
