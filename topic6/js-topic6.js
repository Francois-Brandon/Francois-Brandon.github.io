function domAppend() {
    var li = document.createElement("LI");
    var text = document.createTextNode("Baseball");
    li.appendChild(text);
    document.getElementById("list").appendChild(li);
}