function forLoop() {
  var message = document.getElementById('formessage');
  var num = Number(document.getElementById('loopnum'));

  console.log(message);
  console.log(num);

  for (var i = 0; i < num; i++) {
    message += message + "<br>";
    console.log(message);
  }

  document.getElementById("forresult").innerHTML = message;
}
