
function transition1() {
    var boxOne = document.getElementsByClassName("box")[0];
    var toggleText = document.getElementById('toggleButton');

    if (toggleText.innerHTML == 'Play'){
        boxOne.classList.add('transition');
        boxOne.innerHTML = "...to here"
        toggleText.innerHTML = 'Reset';
    }
    else {
        boxOne.classList.remove('transition');
        boxOne.innerHTML = "Move from here..."
        toggleText.innerHTML = 'Play';
    }
}

function transition2() {
    var boxTwo = document.getElementsByClassName("box2")[0];
    var toggleText2 = document.getElementById('toggleButton2');

    if (toggleText2.innerHTML == 'Play'){
        boxTwo.classList.add('transition');
        toggleText2.innerHTML = 'Reset';
    }
    else {
        boxTwo.classList.remove('transition');
        toggleText2.innerHTML = 'Play';
    }
}

function animateBox() {
    var boxy = document.getElementById("box3");
    var animationButton = document.getElementById('animationButton');
    if (animationButton.innerHTML == 'Play') {
        animationButton.innerHTML = 'Pause';
        boxy.style.animation = "animation1 5s ease-in-out 0s infinite alternate";
    }
    else {
        animationButton.innerHTML = 'Play';
        boxy.style.animationPlayState = "paused";           
    }
    
}

function animateCups() {
    var cup1 = document.getElementById("cup1");
    var cup2 = document.getElementById("cup2");
    var cup3 = document.getElementById("cup3");
    var cupButton = document.getElementById('cupButton');
    if (cupButton.innerHTML == 'Play') {
        cupButton.innerHTML = 'Pause';
        cup1.style.animation = "cup1 5s linear 0s 1 normal";
        cup2.style.animation = "cup2 10s linear 0s 1 normal";
        cup3.style.animation = "cup3 5s linear 5s 1 normal";
    }
    else {
        cupButton.innerHTML = 'Play';
        cup1.style.animationPlayState = "paused";
        cup2.style.animationPlayState = "paused";
        cup3.style.animationPlayState = "paused";
    }
    
}
