window.onload = function() {
    document.getElementById("myButton").addEventListener("click", ouch);
}

function ouch() {
    document.getElementById("myButton").innerHTML = "Ouch!";
}

function transition() {
    var boxOne = document.getElementsByClassName("touchbox")[0];
    boxOne.classList.add('transition');
}

function transitionback() {
    var boxOne = document.getElementsByClassName("touchbox")[0];
    boxOne.classList.remove('transition');
}

function animateBox() {
    var boxy = document.getElementById("box3");
    boxy.style.animation = "animation1 5s ease-in-out 0s infinite alternate";
}

function animateBoxStop() {
    var boxy = document.getElementById("box3");
    boxy.style.animationPlayState = "paused";             
}