function objParse() {
    var text = '{"name":"Brandon","health":20,"mana":30,"gold":50,"weapon":"staff"}';
    var obj = JSON.parse(text);
    var p;
    var text = "";
    for (p in obj) {
        text += p + "<br>";
    }
    document.getElementById('parseoutput').innerHTML = text;
}

function objStringify() {
    var player = { name:"Brandon", health:20, mana:30, gold:50, weapon:"staff" };
    var text = JSON.stringify(player);
    document.getElementById('stringifyoutput').innerHTML = text;
}