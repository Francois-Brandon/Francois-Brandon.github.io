window.onload = function() {
    document.getElementById("myButton").addEventListener("click", ouch);
    document.getElementById("myButton").addEventListener("ontouchstart", transition)
}

function ouch() {
    document.getElementById("myButton").innerHTML = "Ouch!";
}

function transition() {
    var boxOne = document.getElementsByClassName("box")[0];
    var toggleText = document.getElementById('toggleButton');

    boxOne.classList.add('transition');
}

