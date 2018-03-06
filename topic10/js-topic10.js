function draw1() {
    var canvas = document.getElementById("mycanvas");
    var context = canvas.getContext("2d");
    context.fillStyle = "green";
    context.fillRect(20,20,200,100);
}

function draw2() {
    var canvas = document.getElementById("mycanvas");
    var context = canvas.getContext("2d");
    context.beginPath();
    context.arc(300,100,60,0,2*Math.PI);
    context.stroke();
}

function draw3() {
    var canvas = document.getElementById("mycanvas");
    var context = canvas.getContext("2d");
    context.moveTo(25,150);
    context.lineTo(350,275);
    context.stroke();
}

function draw4() {
    var canvas = document.getElementById("mycanvas");
    var context = canvas.getContext("2d");
    context.font = "30px Arial";
    context.fillText("This is a test",250,200);
}

function clearCanvas() {
    var canvas = document.getElementById("mycanvas");
    var context = canvas.getContext("2d");
    context.clearRect(0,0,500,300);
}

function draw5() {
    var canvas = document.getElementById("mycanvas2");
    var context = canvas.getContext("2d");

    context.fillStyle="yellow";
    context.fillRect(0,0,250,100)

    context.setTransform(1,0.5,-0.5,1,30,10);
    context.fillStyle="red";
    context.fillRect(200,-50,250,100);

    context.setTransform(1,-0.5,0.5,1,30,10);
    context.fillStyle="blue";
    context.fillRect(-50,100,250,100);
}