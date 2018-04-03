window.onload = function() {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("range");
    output.innerHTML = slider.value + " miles"; // Display the default slider value    
};

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    
  } else {
    
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

function handleError() {
    console.log("Error getting location");
}

function addSearchTerm() {
    var termtext = document.getElementById("searchterm");
    document.getElementById("terms").style.display = "inherit";
    
    var term = document.createElement("A");
    //term.setAttribute("href", "#");
    term.setAttribute("onclick", "removeSearchTerm(this)");
    term.setAttribute("id", termtext.value);
    document.getElementById("terms").appendChild(term);
    
    var termspan = document.createElement("SPAN");
    termspan.innerHTML = "<i class=\"fas fa-times\"></i> " + termtext.value;
    
    term.appendChild(termspan);
    criteria.push(termtext.value);
    termtext.value = "";
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

function createSchedule() {
    
    for (var i = 0; i < 5; i++) {
        var rnum = getRndInteger(0, restPool.length);
        schedule.push(restPool[rnum]);
        restPool.splice(rnum, 1);
    }
    
    //document.getElementById("schedule-subhead").style.display = "block";
    
    var tableDiv = document.getElementById("scheduletable");
    tableDiv.innerHTML = '';
    
    var instruct = document.createElement("P");
    instruct.setAttribute("id", "instructions");
    instruct.innerHTML = ("Login to save your schedule");
    document.getElementById("save-instruction-container").appendChild(instruct);
    
    var schedButton = document.createElement("BUTTON");
    schedButton.setAttribute("id", "save-schedule");
    schedButton.setAttribute("onclick", "saveSchedule()");
    schedButton.innerHTML = "Save Schedule";
    document.getElementById("save-schedule-button-container").appendChild(schedButton);
    
    
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
        b.innerHTML = schedule[j];
        document.getElementById("srow" + j).appendChild(b);
    }

    
    toggleResults();
    toggleSchedule();
}

function find() {
    document.getElementById("location-error").innerHTML = '';
    
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

var categories = ["abruzzese",
        "acaibowls",
        "afghani",
        "african",
        "alentejo",
        "algarve",
        "alsatian",
        "altoatesine",
        "andalusian",
        "apulian",
        "arabian",
        "arabpizza",
        "argentine",
        "armenian",
        "arroceria_paella",
        "asianfusion",
        "asturian",
        "australian",
        "austrian",
        "auvergnat",
        "azores",
        "backshop",
        "baden",
        "bagels",
        "baguettes",
        "bakeries",
        "bangladeshi",
        "basque",
        "bavarian",
        "bbq",
        "beer_and_wine",
        "beergarden",
        "beerhall",
        "beira",
        "beisl",
        "belgian",
        "bento",
        "berrichon",
        "beverage_stores",
        "bistros",
        "blacksea",
        "blowfish",
        "bourguignon",
        "brasseries",
        "brazilian",
        "brazilianempanadas",
        "breakfast_brunch",
        "breweries",
        "brewpubs",
        "british",
        "bubbletea",
        "buffets",
        "bulgarian",
        "burgers",
        "burmese",
        "butcher",
        "cafes",
        "cafeteria",
        "cajun",
        "cakeshop",
        "calabrian",
        "cambodian",
        "candy",
        "canteen",
        "cantonese",
        "caribbean",
        "catalan",
        "centralbrazilian",
        "cheekufta",
        "cheese",
        "cheesesteaks",
        "chicken_wings",
        "chickenshop",
        "chilean",
        "chimneycakes",
        "chinese",
        "chocolate",
        "churros",
        "cideries",
        "coffee",
        "coffeeroasteries",
        "coffeeteasupplies",
        "colombian",
        "comfortfood",
        "congee",
        "convenience",
        "conveyorsushi",
        "corsican",
        "creperies",
        "csa",
        "cuban",
        "cucinacampana",
        "cupcakes",
        "currysausage",
        "customcakes",
        "cypriot",
        "czech",
        "czechslovakian",
        "dagashi",
        "danish",
        "delicatessen",
        "delis",
        "desserts",
        "dimsum",
        "diners",
        "dinnertheater",
        "distilleries",
        "diyfood",
        "dominican",
        "donairs",
        "donburi",
        "donuts",
        "driedfruit",
        "dumplings",
        "eastern_european",
        "easterngerman",
        "easternmexican",
        "egyptian",
        "eltern_cafes",
        "emilian",
        "empanadas",
        "ethicgrocery",
        "ethiopian",
        "fado_houses",
        "falafel",
        "farmersmarket",
        "filipino",
        "fischbroetchen",
        "fishmonger",
        "fishnchips",
        "flatbread",
        "flemish",
        "fondue",
        "food_court",
        "fooddeliveryservices",
        "foodstands",
        "foodtrucks",
        "franconian",
        "freiduria",
        "french",
        "friterie",
        "friulan",
        "frozenfood",
        "fuzhou",
        "galician",
        "gamemeat",
        "gastropubs",
        "gelato",
        "georgian",
        "german",
        "giblets",
        "gluhwein",
        "gluten_free",
        "gourmet",
        "gozleme",
        "greek",
        "grocery",
        "guamanian",
        "gyudon",
        "hainan",
        "haitian",
        "hakka",
        "halal",
        "handrolls",
        "hawaiian",
        "hawkercentre",
        "healthmarkets",
        "henghwa",
        "herbsandspices",
        "hessian",
        "heuriger",
        "himalayan",
        "hkcafe",
        "hokkien",
        "homemadefood",
        "honduran",
        "honey",
        "horumon",
        "hotdog",
        "hotdogs",
        "hotpot",
        "hunan",
        "hungarian",
        "iberian",
        "icecream",
        "importedfood",
        "indonesian",
        "indpak",
        "international",
        "internetcafe",
        "intlgrocery",
        "irish",
        "island_pub",
        "israeli",
        "italian",
        "izakaya",
        "jaliscan",
        "japacurry",
        "japanese",
        "jewish",
        "jpsweets",
        "juicebars",
        "kaiseki",
        "kebab",
        "kiosk",
        "kombucha",
        "kopitiam",
        "korean",
        "kosher",
        "kurdish",
        "kushikatsu",
        "lahmacun",
        "laos",
        "laotian",
        "latin",
        "lebanese",
        "ligurian",
        "lumbard",
        "lyonnais",
        "macarons",
        "madeira",
        "malaysian",
        "mamak",
        "markets",
        "mauritius",
        "meatballs",
        "meats",
        "mediterranean",
        "mexican",
        "mideastern",
        "milkbars",
        "milkshakebars",
        "minho",
        "modern_australian",
        "modern_european",
        "mongolian",
        "moroccan",
        "napoletana",
        "nasilemak",
        "newamerican",
        "newcanadian",
        "newmexican",
        "newzealand",
        "nicaraguan",
        "nicois",
        "nightfood",
        "nikkei",
        "noodles",
        "norcinerie",
        "northeasternbrazilian",
        "northernbrazilian",
        "northerngerman",
        "northernmexican",
        "norwegian",
        "nyonya",
        "oaxacan",
        "oden",
        "okinawan",
        "okonomiyaki",
        "oliveoil",
        "onigiri",
        "opensandwiches",
        "organic_stores",
        "oriental",
        "ottomancuisine",
        "oyakodon",
        "pakistani",
        "palatine",
        "panasian",
        "panzerotti",
        "parma",
        "pastashops",
        "pekinese",
        "persian",
        "peruvian",
        "pfcomercial",
        "piadina",
        "piemonte",
        "pierogis",
        "pita",
        "pizza",
        "poke",
        "polish",
        "polynesian",
        "popcorn",
        "popuprestaurants",
        "portuguese",
        "potatoes",
        "poutineries",
        "pretzels",
        "provencal",
        "pubfood",
        "pueblan",
        "puertorican",
        "ramen",
        "raw_food",
        "reunion",
        "rhinelandian",
        "ribatejo",
        "riceshop",
        "robatayaki",
        "rodizios",
        "roman",
        "romanian",
        "rotisserie_chicken",
        "russian",
        "salad",
        "salumerie",
        "salvadoran",
        "sandwiches",
        "sardinian",
        "scandinavian",
        "schnitzel",
        "scottish",
        "seafood",
        "seafoodmarkets",
        "senegalese",
        "serbocroatian",
        "shanghainese",
        "shavedice",
        "shavedsnow",
        "sicilian",
        "signature_cuisine",
        "singaporean",
        "slovakian",
        "smokehouse",
        "soba",
        "soulfood",
        "soup",
        "southafrican",
        "southern",
        "spanish",
        "srilankan",
        "steak",
        "streetvendors",
        "sud_ouest",
        "sugarshacks",
        "sukiyaki",
        "supperclubs",
        "sushi",
        "swabian",
        "swedish",
        "swissfood",
        "syrian",
        "szechuan",
        "tabernas",
        "tacos",
        "taiwanese",
        "taiyaki",
        "takoyaki",
        "tamales",
        "tapas",
        "tapasmallplates",
        "tavolacalda",
        "tea",
        "tempura",
        "teochew",
        "teppanyaki",
        "tex-mex",
        "thai",
        "themedcafes",
        "tofu",
        "tonkatsu",
        "torshi",
        "tortillas",
        "traditional_swedish",
        "tradamerican",
        "tras_os_montes",
        "trattorie",
        "trinidadian",
        "turkish",
        "turkishravioli",
        "tuscan",
        "udon",
        "ukrainian",
        "unagi",
        "uzbek",
        "vegan",
        "vegetarian",
        "venetian",
        "venezuelan",
        "venison",
        "vietnamese",
        "waffles",
        "waterstores",
        "westernjapanese",
        "wineries",
        "winetastingroom",
        "wok",
        "wraps",
        "yakiniku",
        "yakitori",
        "yucatan",
        "yugoslav",
        "zapiekanka"];

