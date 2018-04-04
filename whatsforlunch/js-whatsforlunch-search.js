window.onload = function() {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("range");
    output.innerHTML = slider.value + " miles"; // Display the default slider value    
};

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var user = firebase.auth().currentUser;
    var name = user.displayName;
    var welcome = document.getElementById("welcome");
    welcome.innerHTML = "Hello, " + name;
      
    var status = document.getElementById("login-status");    
    status.setAttribute("onClick", "logOut()");
    status.innerHTML = "Sign Out"
 
    
  } else {
    var welcome = document.getElementById("welcome");
    welcome.innerHTML = "Not logged in";
      
    var status = document.getElementById("login-status");
    status.setAttribute("href", "login.html");
    status.innerHTML = "Sign In"
  }
});

var document = this.document;
var lat;
var long;
var criteria = [];
var restPool = [];
var schedule = [];
var weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function saveLocation(position) {
    var crd = position.coords;
    lat = crd.latitude;
    long = crd.longitude;
    
    console.log(lat + ", " + long);
}
    
function logOut() {
    firebase.auth().signOut().then(function() {
        console.log("signed out");
        window.location = 'home.html';
    }).catch(function(error) {
        console.log("error signing out");
    });
    
    toggleDrop();
}

function handleError() {
    console.log("Error getting location");
}

function addSearchTerm() {
    var termtext = document.getElementById("searchterm");
    if (termtext.value != '') {
    document.getElementById("terms").style.display = "inherit";
    
    
    var term = document.createElement("A");
    //term.setAttribute("href", "#");
    term.setAttribute("onclick", "removeSearchTerm(this)");
    term.setAttribute("id", termtext.value);
    term.setAttribute("class", "animate-term");
    document.getElementById("terms").appendChild(term);
    
    var termspan = document.createElement("SPAN");
    termspan.innerHTML = "<i class=\"fas fa-times\"></i> " + termtext.value;
    
    term.appendChild(termspan);
    criteria.push(termtext.value);
    termtext.value = "";
    }
}

function removeSearchTerm(ele) {
    console.log(ele);
    var ch = ele.getAttribute("id");
    document.getElementById(ch).outerHTML = '';
    
    var index = criteria.indexOf(ch);
    if (index > -1) {
        criteria.splice(index, 1);
    }  
}

function addToRestaurantPool(ele) {
    //console.log(ele);
    var rest = ele.getAttribute("id");
    var restinfo = document.getElementById(rest);
    //console.log(restinfo);
    
    var index = restPool.indexOf(restinfo.innerHTML);
    if (index > -1) {
        restPool.splice(index, 1);
        restinfo.style.backgroundColor = "#fff";
        restinfo.style.color = "#000000";
    } else {
        restPool.push(restinfo.innerHTML);
        restinfo.style.backgroundColor = "#2851a4";
        restinfo.style.color = "#fff";
    }
    //console.log(restPool);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function saveSchedule() {
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    var lunchschedule = {
        Monday: schedule[0],
        Tuesday: schedule[1],
        Wednesday: schedule[2],
        Thursday: schedule[3],
        Friday: schedule[4],
    };
    console.log(lunchschedule);
    
    
    db.collection("users").doc(uid).set(lunchschedule).then(function() {
        window.location = 'schedule.html';
    });
}

function getSchedule() {
    
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    var docRef = db.collection("users").doc(uid);

    docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data().Monday);
        document.getElementById("rest-mon").innerHTML = doc.data().Monday;
        document.getElementById("rest-tues").innerHTML = doc.data().Tuesday;
        document.getElementById("rest-wed").innerHTML = doc.data().Wednesday;
        document.getElementById("rest-thurs").innerHTML = doc.data().Thursday;
        document.getElementById("rest-fri").innerHTML = doc.data().Friday;
        
        var x = document.getElementById("schedule-page-container");
        x.classList.add("show-schedule");

        
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    }).catch(function(error) {
    console.log("Error getting document:", error);
    });
    
    
}

function createSchedule() {
    
    var tableDiv = document.getElementById("scheduletable");
    tableDiv.innerHTML = '';
    
    document.getElementById("create-error").innerHTML = '';
    
    if (restPool.length < 5) {
        var remain = 5 - restPool.length;
        document.getElementById("create-error").innerHTML = "Select " + remain + " more restaurant(s)";
        return;
    }
    
    for (var i = 0; i < 5; i++) {
        var rnum = getRndInteger(0, restPool.length);
        schedule.push(restPool[rnum]);
        restPool.splice(rnum, 1);
    }
          
    var user = firebase.auth().currentUser;

    if (user) {
        // User is signed in.
        var schedButton = document.createElement("BUTTON");
        schedButton.setAttribute("id", "save-schedule");
        schedButton.setAttribute("onclick", "saveSchedule()");
        schedButton.innerHTML = "Save Schedule";
        document.getElementById("save-schedule-button-container").appendChild(schedButton);
    } else {
        var instruct = document.createElement("P");
        instruct.setAttribute("id", "instructions");
        instruct.innerHTML = ("Login to save your schedule");
        //document.getElementById("save-instruction-container").appendChild(instruct);
        document.getElementById("save-schedule-button-container").appendChild(instruct);  
    }
    
    var tb = document.createElement("TABLE");
    tb.setAttribute("id", "schedule");
    tb.setAttribute("class", "sched-table-style");
    document.getElementById("scheduletable").appendChild(tb);
    
    for (var j = 0; j < 5; j++) {
        var day = weekdays[j];
        
        var tr = document.createElement("TR");
        tr.setAttribute("id", "srow" + j);
        document.getElementById("schedule").appendChild(tr);
        
        var a = document.createElement("TD");
        a.setAttribute("id", day);
        a.setAttribute("class", "td-day");
        a.innerHTML = day;
        document.getElementById("srow" + j).appendChild(a);
        
        var b = document.createElement("TD");
        b.setAttribute("id", day + j);
        b.setAttribute("class", "td-rest");
        b.innerHTML = schedule[j];
        document.getElementById("srow" + j).appendChild(b);
    }

    
    toggleResults();
    toggleSchedule();
}

function find() {
    document.getElementById("location-error").innerHTML = '';
    document.getElementById("instruction-container").innerHTML = '';
    document.getElementById("schedule-button-container").innerHTML = '';
    
    var zip = document.getElementById("zip");
    var range = document.getElementById("myRange");
    var price = document.querySelectorAll('input[name=option][checked]')
    var coords = '';
    console.log(price[0].value);
    if (document.getElementById("current").checked) {
        if (lat != null && long != null) {
            coords = "&location=" + lat + "," + long;
        } else {
            document.getElementById("location-error").innerHTML = "Unable to use current location. Please enter zip code.";
            toggleZip();
            document.getElementById("current").checked = false;
            return;
            console.log("shouldn't see this")
        }
    } else if (zip.value != null && zip.value != '') {
        criteria.push("near+" + zip.value);
    } else {
        document.getElementById("location-error").innerHTML = "Enter zip code or select 'Use Current Location'";
        return;
    }
    
    var query = "&query=";
    /*while (criteria.length) {
        query += "+" + criteria.pop();
    }*/
    
    for (var i = 0; i < criteria.length; i++) {
        query += "+" + criteria[i];
    }
    criteria.pop() //remove zip code
        
    
    var radius = "&radius=" + (range.value * 1609.34);
    
    console.log(query + coords + radius);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState != 4) {
            document.getElementById("search").innerHTML = "<i class=\"fas fa-spinner fa-spin\"></i> Searching";
        }
        
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            parseResults(myObj);
        }
    };
    xhttp.open("GET", "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyDxecYkMzbpjToNRR98fEpaJ4qY-lSKXns&type=restaurant" + query + coords + radius, true);
    xhttp.send();
}

function parseResults(myObj) {
    console.log(myObj);
    
    //document.getElementById("result-subhead").style.display = "block";
    
    var tableDiv = document.getElementById("resultstable");
    tableDiv.innerHTML = '';
    
    var instruct = document.createElement("P");
    instruct.setAttribute("id", "instructions");
    instruct.innerHTML = ("Select at least 5 restaurants to add to your restaurant pool.");
    document.getElementById("instruction-container").appendChild(instruct);
    
    var schedButton = document.createElement("BUTTON");
    schedButton.setAttribute("id", "create-schedule");
    schedButton.setAttribute("onclick", "createSchedule()");
    schedButton.innerHTML = "Create Schedule";
    document.getElementById("schedule-button-container").appendChild(schedButton);
    
    
    var tb = document.createElement("TABLE");
    tb.setAttribute("id", "results");
    document.getElementById("resultstable").appendChild(tb);
    
    for (var i = 0; i < myObj.results.length; i++) {
        var restaurant = myObj.results[i];
        
        var tr = document.createElement("TR");
        tr.setAttribute("id", "row" + i);
        document.getElementById("results").appendChild(tr);
        
        var a = document.createElement("TD");
        a.setAttribute("id", restaurant.place_id);
        a.setAttribute("onclick", "addToRestaurantPool(this)")
        a.setAttribute("class", "restData");
        a.innerHTML = restaurant.name + "<br>" + restaurant.formatted_address + "<br>Rating: " + restaurant.rating;
        document.getElementById("row" + i).appendChild(a);
    }
    document.getElementById("search").innerHTML = "Search";
    
    toggleFind();
    toggleResults();
}

function toggleFind() {
    var div = document.getElementById("search-container");
    
    if (div.style.display === "none") {
        div.style.display = "block";
        document.getElementById("find-header").innerHTML = "Find Restaurants <i class=\"fas fa-angle-down\"></i>";
        //document.getElementById("result-subhead").style.borderTop = "none";
    } else {
        div.style.display = "none";
        document.getElementById("find-header").innerHTML = "Find Restaurants <i class=\"fas fa-angle-up\"></i>";
        //document.getElementById("result-subhead").style.borderTop = "1px solid #193366";
    }
}

function toggleResults() {
    var div = document.getElementById("results-wrapper");
    //var div2 = document.getElementById("instruction-container");
    
    if (div.style.display === "none") {
        div.style.display = "block";
        //div2.style.display = "block";
        document.getElementById("results-header").innerHTML = "Results <i class=\"fas fa-angle-down\"></i>";
    } else {
        div.style.display = "none";
        //div2.style.display = "none";
        document.getElementById("results-header").innerHTML = "Results <i class=\"fas fa-angle-up\"></i>";
    }
}

function toggleSchedule() {
    var div = document.getElementById("schedule-wrapper");
    
    if (div.style.display === "none") {
        div.style.display = "block";
        document.getElementById("schedule-header").innerHTML = "Lunch Schedule <i class=\"fas fa-angle-down\"></i>";
    } else {
        div.style.display = "none";
        document.getElementById("schedule-header").innerHTML = "Lunch Schedule <i class=\"fas fa-angle-up\"></i>";
    }
}

function toggleZip() {
    var zipInput = document.getElementById("optional");
    
    if (zipInput.style.display === "none")
        zipInput.style.display = "inherit";
    else {
        zipInput.style.display = "none";
        navigator.geolocation.getCurrentPosition(saveLocation, handleError);
    }
    
}

// Update the current slider value (each time you drag the slider handle)
function sliderInput() {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("range");
    output.innerHTML = slider.value + " miles";
}

function toggleDrop() {
    var x = document.getElementById("dropmenu");
    if (x.classList.contains("droppeddown")) {
        x.classList.remove("droppeddown");
    } else {
        x.classList.add("droppeddown");
    }
}
