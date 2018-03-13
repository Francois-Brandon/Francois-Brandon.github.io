var a = 1;

function addMark(square){
    var selSquare = document.getElementById(square);
    if (selSquare.innerHTML != 'X' && selSquare.innerHTML != 'O') {
        if(a == 1){
            selSquare.innerHTML='X';
            selSquare.classList.add("mark-transform-x");
            a = 0;
        } else {
            selSquare.innerHTML='O';
            selSquare.classList.add("mark-transform-o");
            a = 1;
        }
    }
}

function resetGame() {
    document.getElementById("topleft").innerHTML = "";
    document.getElementById("topmiddle").innerHTML = "";
    document.getElementById("topright").innerHTML = "";
    document.getElementById("middleleft").innerHTML = "";
    document.getElementById("middlemiddle").innerHTML = "";
    document.getElementById("middleright").innerHTML = "";
    document.getElementById("bottomleft").innerHTML = "";
    document.getElementById("bottommiddle").innerHTML = "";
    document.getElementById("bottomright").innerHTML = "";
    
    
    
    var xclass = document.getElementsByClassName("mark-transform-x");
    var oclass = document.getElementsByClassName("mark-transform-o");
    
    while (xclass[0]) {
        xclass[0].classList.remove("mark-transform-x");
    }
    
    while (oclass[0]) {
        oclass[0].classList.remove("mark-transform-o");
    }
    
    a = 1;
}