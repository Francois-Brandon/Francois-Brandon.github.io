function getTime() {
    var state = "<br>";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        state += this.readyState + "<br>"
        document.getElementById("state").innerHTML = state;
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("response").innerHTML = this.responseText;
            document.getElementById("status").innerHTML = this.status;
            //document.getElementById("statustext").innerHTML = this.statusText;
        }
    };
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/posts/1", true);
    xhttp.send();
}