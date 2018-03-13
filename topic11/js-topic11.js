window.onload = function() {
    document.getElementById("lbutton").addEventListener("click", galleryTransition);
    document.getElementById("rbutton").addEventListener("click", galleryTransition);
}

function galleryTransition() {
    var pic = document.getElementById("second");
    
    if (pic.classList.contains("opaque")) {
        pic.classList.remove("opaque");
    } else {
        pic.classList.add("opaque");
    }
}