function getPost() {
    var state = "<br>";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        state += this.readyState + "<br>"
        document.getElementById("state1").innerHTML = state;
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("response1").innerHTML = this.responseText;
            document.getElementById("status1").innerHTML = this.status;
        }
    };
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/posts/1", true);
    xhttp.send();
}

function getPhoto() {
    var state = "<br>";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        state += this.readyState + "<br>"
        document.getElementById("state2").innerHTML = state;
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("response2").innerHTML = this.responseText;
            document.getElementById("status2").innerHTML = this.status;
            var myObj = JSON.parse(this.responseText);
            document.getElementById("image").setAttribute("src", myObj.url);
            
        }
    };
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/photos/1", true);
    xhttp.send();
}