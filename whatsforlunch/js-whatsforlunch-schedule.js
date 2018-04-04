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

    
function logOut() {
    firebase.auth().signOut().then(function() {
        console.log("signed out");
        window.location = 'home.html';
    }).catch(function(error) {
        console.log("error signing out");
    });
    
    toggleDrop();
}

function getSchedule() {
    
    var user = firebase.auth().currentUser;
    document.getElementById("retrieve-error").innerHTML = "";
    
    if (user) {
        var uid = user.uid;
        var docRef = db.collection("users").doc(uid);
        

        docRef.get().then(function(doc) {
            if (doc.exists) {
                //console.log("Document data:", doc.data().Monday);
                document.getElementById("rest-mon").innerHTML = doc.data().Monday;
                document.getElementById("rest-tues").innerHTML = doc.data().Tuesday;
                document.getElementById("rest-wed").innerHTML = doc.data().Wednesday;
                document.getElementById("rest-thurs").innerHTML = doc.data().Thursday;
                document.getElementById("rest-fri").innerHTML = doc.data().Friday;
        
                var x = document.getElementById("schedule-page-container");
                x.classList.add("show-schedule");

        
            } else {
                // doc.data() will be undefined in this case
                document.getElementById("retrieve-error").innerHTML = "Unable to retrieve schedule";
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    } else {
        document.getElementById("retrieve-error").innerHTML = "Log in to view your saved schedule";
    }
    
      
}

function toggleDrop() {
    var x = document.getElementById("dropmenu");
    if (x.classList.contains("droppeddown")) {
        x.classList.remove("droppeddown");
    } else {
        x.classList.add("droppeddown");
    }
}
