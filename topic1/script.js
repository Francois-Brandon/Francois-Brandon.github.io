function forLoop() {
  var message = document.getElementById('formessage').value;
  var num = Number(document.getElementById('loopnum').value);

  console.log(message);
  console.log(num);

  for (var i = 0; i < num; i++) {
    message += message + "<br>";
    console.log(message);
  }

  document.getElementById("forresult").innerHTML = message;
}
