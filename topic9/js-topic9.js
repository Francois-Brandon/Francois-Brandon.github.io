window.onload = function() {
    document.getElementById("myButton").addEventListener("click", ouch);
    document.getElementById("touchbox").addEventListener("ontouchstart", transition)
}

function ouch() {
    document.getElementById("myButton").innerHTML = "Ouch!";
}

function transition() {
    var boxOne = document.getElementById("touchbox");
    boxOne.classList.add('transition');
}

