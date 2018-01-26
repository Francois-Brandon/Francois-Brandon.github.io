function count() {
    var i;
    var text = "";
    for (i = 0; i < 5; i++) {
        text += "The number is " + i + "<br>";
    }
    document.getElementById('foroutput').innerHTML = text;
}

function properties() {
    var player = {name:"Brandon", eyecolor:"Blue", haircolor:"Brown", age:30};
    var output = "";
    var p;
    for (p in player) {
        output += player[p] + " ";
    }
    document.getElementById('forinoutput').innerHTML = output;
}

function whileloop() {
    var text = "";
    var i = 0;
    while (i < 5) {
        text += "The number is " + i + "<br>";
        i++;
    }
    document.getElementById('whileoutput').innerHTML = text;
}

function dowhileloop() {
    var text = "";
    var i = 5;
    do {
        text += "The number is " + i + "<br>";
        i++;
    } while (i < 5)
    document.getElementById('dowhileoutput').innerHTML = text;
}


function ifelse() {
    var input = document.getElementById("color").value;
    var output = "";
    if (input == "red") {
        output = "This means Stop.";
    }
    else if (input == "green") {
        output = "This means Go.";
    }
    else {
        output = "I don't know what that means.";
    }
    document.getElementById('ifelseoutput').innerHTML = output;
}

function switchSelect() {
    var input = document.getElementById("month").value;
    var output = "";   
    switch (input) {
        case '1':
            output = "You were born in January"
            break;
        case '2':
            output = "You were born in February"
            break;
        case '3':
            output = "You were born in March"
            break;
        case '4':
            output = "You were born in April"
            break;
        case '5':
            output = "You were born in May"
            break;
        case '6':
            output = "You were born in June"
            break;
        case '7':
            output = "You were born in July"
            break;
        case '8':
            output = "You were born in August"
            break;
        case '9':
            output = "You were born in September"
            break;
         case '10':
            output = "You were born in October"
            break;
         case '11':
            output = "You were born in November"
            break;
        case '12':
            output = "You were born in December"
            break;
        default:
            output = "I don't recognize that month"
            break;              
    }
    document.getElementById('switchoutput').innerHTML = output;
}

function calculate() {
    var amount = parseFloat(document.getElementById("amount").value).toFixed(2);
    var rate = parseFloat(document.getElementById("rate").value);
    var calc = amount * (1 + (rate / 100));
    var total = calc.toFixed(2);
                                      
    display(amount, rate, total)            
}
            
function display(amount, rate, total) {
    var output = "Amount: $" + amount + "<br>Tax: " + rate + "%<br> Total: $" + total + "<br>"
                
    document.getElementById('funcoutput').innerHTML = output;
}

function arrayLength() {
    var tools = ["hammer", "saw", "screwdriver", "wrench"];
    var length = tools.length;
    var text = "The length is " + length;   
    document.getElementById('arrayoutput').innerHTML = text;
}
