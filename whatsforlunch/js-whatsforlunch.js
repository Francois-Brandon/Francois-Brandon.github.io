window.onload = function() {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("range");
    output.innerHTML = slider.value + " miles"; // Display the default slider value
    autocomplete(document.getElementById("myInput1"), categories);
    autocomplete(document.getElementById("myInput2"), categories);
    autocomplete(document.getElementById("myInput3"), categories);
    
};

var document = this.document;
var lat;
var long;

function saveLocation(position) {
    var crd = position.coords;
    lat = crd.latitude;
    long = crd.longitude;
    
    console.log(lat + ", " + long);
}

function handleError() {
    console.log("Error getting location");
}

function find() {
    document.getElementById("location-error").innerHTML = '';
    
    var zip = document.getElementById("zip");
    //var rating = document.querySelector('input[name=star][checked]')
    var range = document.getElementById("myRange");
    //var price = document.querySelectorAll('input[name=price][checked]')
    var cat1 = document.getElementById("myInput1");
    var cat2 = document.getElementById("myInput2");
    var cat3 = document.getElementById("myInput3");
    var coords = '';
    
    var criteria = [];
    if (cat1.value != null && cat1.value != "") {
        criteria.push(cat1.value);
    }
    if (cat2.value != null && cat2.value != "") {
        criteria.push(cat2.value);
    }
    if (cat3.value != null && cat3.value != "") {
        criteria.push(cat3.value);
    }
    
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
    } else {
        criteria.push("near+" + zip.value);
    }
    
    var query = "&query=";
    while (criteria.length) {
        query += "+" + criteria.pop()
    }
        
    
    var radius = "&radius=" + (range.value * 1609.34);
    
 console.log(query + coords + radius);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState != 4) {
            //document.getElementById("search").innerHTML = "<i class=\"fa fa-spinner fa-spin\"></i> Loading";
        }
        
        if (this.readyState == 4 && this.status == 200) {
            
            //console.log(this.response);
            //document.getElementById("response1").innerHTML = this.responseText;
            //document.getElementById("status1").innerHTML = this.status;
            var myObj = JSON.parse(this.responseText);
            parseResults(myObj);
        }
    };
    xhttp.open("GET", "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyDxecYkMzbpjToNRR98fEpaJ4qY-lSKXns&type=restaurant" + query + coords + radius, true);
    xhttp.send();
}

function parseResults(myObj) {
    console.log(myObj);
    
    document.getElementById("result-subhead").style.display = "block";
    
    var tableDiv = document.getElementById("resultstable");
    tableDiv.innerHTML = '';
    
    var tb = document.createElement("TABLE");
    tb.setAttribute("id", "results");
    document.getElementById("resultstable").appendChild(tb);
    
    /*var th = document.createElement("TH");
    th.setAttribute("id", "resultheading")
    th.innerHTML = "Results";
    document.getElementById("results").appendChild(th);*/
    
    for (var i = 0; i < myObj.results.length; i++) {
        var restaurant = myObj.results[i];
        
        var tr = document.createElement("TR");
        tr.setAttribute("id", "row" + i);
        document.getElementById("results").appendChild(tr);
        
        var a = document.createElement("TD");
        a.setAttribute("id", "result" + i);
        a.innerHTML = restaurant.name + "<br>" + restaurant.formatted_address + "<br>Rating: " + restaurant.rating;
        document.getElementById("row" + i).appendChild(a);
    }
    //document.getElementById("search").innerHTML = "Search";
    
    toggleFind();
}

function toggleFind() {
    var div = document.getElementById("search-container");
    
    if (div.style.display === "none") {
        div.style.display = "block";
        document.getElementById("find-header").innerHTML = "Find Restaurants <i class=\"fas fa-angle-down\"></i>";
        document.getElementById("result-subhead").style.borderTop = "none";
    } else {
        div.style.display = "none";
        document.getElementById("find-header").innerHTML = "Find Restaurants <i class=\"fas fa-angle-up\"></i>";
        document.getElementById("result-subhead").style.borderTop = "1px solid #193366";
    }
}

function toggleResults() {
    var div = document.getElementById("results-container");
    
    if (div.style.display === "none") {
        div.style.display = "block";
        document.getElementById("results-header").innerHTML = "Results <i class=\"fas fa-angle-down\"></i>";
    } else {
        div.style.display = "none";
        document.getElementById("results-header").innerHTML = "Results <i class=\"fas fa-angle-up\"></i>";
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

/*function addCategory() {
    var a = document.createElement("INPUT");
    a.setAttribute("placeholder", "Type");
    a.setAttribute("type", "text");
    document.getElementById("auto").appendChild(a);
}*/

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
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

