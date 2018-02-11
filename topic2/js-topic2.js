function Player(name, health, mana, gold) {
    this.name = name;
    this.health = health;
    this.mana = mana;
    this.gold = gold;
    this.setHealth = setHealth;
}

var newPlayer = new Player("Brandon", 10, 20, 50);


function setHealth(delta) {
    this.health += delta;
    if (this.health > 30) {
        this.health = 30;
    }
    else if (this.health < 0) {
        this.health = 0;
    }
}

function healthPot() {
    if (newPlayer.health <= 30) {
        newPlayer.setHealth(8);
        document.getElementById("message").innerHTML = "";
    }
    else {
        document.getElementById("message").innerHTML = "Already at full health";
    }
    displayPlayer();
}

function takeDamage() {
    if (newPlayer.health > 0) {
        newPlayer.setHealth(-3);
        if (newPlayer.health == 0)
            document.getElementById("message").innerHTML = "You are dead.";
    }

    displayPlayer();
}


function displayPlayer() {
    document.getElementById("nameDisp").innerHTML = newPlayer.name;
    document.getElementById("healthDisp").innerHTML = newPlayer.health;
    document.getElementById("manaDisp").innerHTML = newPlayer.mana;
    document.getElementById("goldDisp").innerHTML = newPlayer.gold;
}
