function forLoop() {
  var message = document.getElementsByName('formessage');
  var num = document.getElementsByName('loopnum')

  for (var i = 0; i < num; i++) {
    message += message + "<br>";
    console.log(message);
  }

  document.getElementById("forresult").innerHTML = message;
}
