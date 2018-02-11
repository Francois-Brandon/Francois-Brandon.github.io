function setCaptions() {
    var captionsObj = {};
	
	captionsObj.caption1 = document.getElementById("caption1").value;
	captionsObj.caption2 = document.getElementById("caption2").value;
	captionsObj.caption3 = document.getElementById("caption3").value;
    
    var capJson = JSON.stringify(captionsObj);
    
    if (storageAvailable('localStorage')) {
        localStorage.setItem('captions', capJson);
    }
    else {
        console.log('No local storage');
    }
    localStorage.s
    getCaptions();  
}




function getCaptions() {
    var parsedCaptions = JSON.parse(localStorage.getItem('captions'));
    
    var newCap1 = parsedCaptions.caption1;
    var newCap2 = parsedCaptions.caption2;
    var newCap3 = parsedCaptions.caption3;
    
    document.getElementById("cap1").innerHTML = newCap1;
    document.getElementById("cap2").innerHTML = newCap2;
    document.getElementById("cap3").innerHTML = newCap3;
}




function storeData() {
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var age = document.getElementById("age").value;
    
    
    if (storageAvailable('localStorage')) {
        localStorage.setItem('firstname', fname);
        localStorage.setItem('lastname', lname);
        localStorage.setItem('age', age);
    }
    else {
        console.log('No local storage');
    }
    
    ex2Display();
}




function ex2Display() {    
    var newFname = localStorage.getItem('firstname');
    var newLname = localStorage.getItem('lastname');
    var newAge = localStorage.getItem('age');
    var output = "";
    
output += "First Name: " + newFname + "<br>Last Name: " + newLname + "<br>Age: " + newAge + "<br>";
    
    document.getElementById("example2").innerHTML = output;  
}




function remove(item) {
    localStorage.removeItem(item);
    ex2Display();
}




function clearAll() {
    localStorage.clear();
    ex2Display();
}




function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}
