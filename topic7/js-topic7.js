function updateDiv() {
    document.getElementById("alpha").style.width = "800px";
    document.getElementById("alpha").style.border = "5px dotted #143927";
    document.getElementById("alpha").style.backgroundColor = "#d9f2e6";
}

function revertDiv() {
    document.getElementById("alpha").removeAttribute("style");
}

function updateAllClass() {
    var exDiv = document.getElementsByClassName("codeex");
  
    for (var i = (exDiv.length - 1); i >= 0; i--) {
        exDiv[i].className = "newcodeex";
    } 
}

function revertAllClass() {
    var exDiv = document.getElementsByClassName("newcodeex");
    
    for (var i = (exDiv.length - 1); i >= 0; i--) {
        exDiv[i].className = "codeex";
    } 
}

function toggleDetails() {
    var detailsDiv = document.getElementsByClassName("details");
    
    for (var i = (detailsDiv.length - 1); i >= 0; i--) {
        if (detailsDiv[i].style.display == "none") 
            detailsDiv[i].style.display = "initial";
        else
            detailsDiv[i].style.display = "none";        
    } 
}

function toggleExamples() {
    if (document.getElementsByClassName("codeex").length == 0)
        var exampleDiv = document.getElementsByClassName("newcodeex");
    else
        var exampleDiv = document.getElementsByClassName("codeex");
    
    for (var i = (exampleDiv.length - 1); i >= 0; i--) {
        if (exampleDiv[i].style.display == "none") 
            exampleDiv[i].style.display = "block";
        else
            exampleDiv[i].style.display = "none";
            
    } 
}

function changeThemeOld(theme) {  
    var sheets = document.styleSheets;

    for (var i = 0; i < sheets.length; i++) {
        if (sheets[i].title == theme) {
            sheets[i].disabled = false;
        }
        else if (sheets[i].title != theme) {
            sheets[i].disabled = true;
        }
    }
}

function changeTheme(theme) {
    
    switch (theme) {
        case 'default':
            document.getElementById('default').removeAttribute('disabled');
            document.getElementById('dark').setAttribute('disabled', true);
            document.getElementById('pink').setAttribute('disabled', true);
            break;
        case 'dark':
            document.getElementById('default').setAttribute('disabled', true);
            document.getElementById('dark').removeAttribute('disabled');
            document.getElementById('pink').setAttribute('disabled', true);
            break;
        case 'pink':
            document.getElementById('default').setAttribute('disabled', true);
            document.getElementById('dark').setAttribute('disabled', true);
            document.getElementById('pink').removeAttribute('disabled');
            break;
        default:
    }
}