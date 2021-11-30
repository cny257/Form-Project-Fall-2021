// Save data to local storage
function handleSubmit() {
    // Retrieve values by ID
    //name
    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    //title
    let title1;
    const title = document.getElementsByName('titleRadios');
    for(i = 0; i < title.length; i++) {
        if (title[i].checked) {
        title1 = JSON.stringify(title[i].value);
        localStorage.setItem("TITLE", title1);
        }
    }
    //height
    const height= document.getElementById('heightSelect').value;
    //phone
    const phone = document.getElementById('phone').value;
    //address
    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    var zipcode = document.getElementById('zipcode').value;
    //services
    let srEmail = document.getElementById("checkEmail");  
    let srPhone = document.getElementById("checkPhone");  
    let srFB = document.getElementById("checkFB");  
    let srTT = document.getElementById("checkTweeter");
    let srMail = document.getElementById("checkMail");
    let srVisit = document.getElementById("checkVisit");   
    var services = "";
    if (srEmail.checked == true){  
        var sr1 = document.getElementById("checkEmail").value;  
        services = services + sr1 + ", ";   
    }   
    if (srPhone.checked == true){  
        var sr2 = document.getElementById("checkPhone").value;  
        services = services + sr2 + ", ";   
    }  
    if (srFB.checked == true){   
        var sr3 = document.getElementById("checkFB").value;  
        services = services + sr3 + ", ";   
    }  
    if (srTT.checked == true){  
        var sr4 = document.getElementById("checkTweeter").value;  
        services = services + sr4 + ", ";   
    }
    if (srMail.checked == true){   
        var sr5 = document.getElementById("checkMail").value;  
        services = services + sr5 + ", ";   
    }  
    if (srVisit.checked == true){  
        var sr6 = document.getElementById("checkVisit").value;  
        services = services + sr6;   
    }   
    //alert(services);  
    //budget 
    let budget1;
    const budget = document.getElementsByName('budgetRadios');
    for(i = 0; i < budget.length; i++) {
        if (budget[i].checked) {
        budget1 = JSON.stringify(budget[i].value);
        localStorage.setItem("BUDGET", budget1);
        }
    }
    //email
    const email = document.getElementById('email').value;
    
    // Save values to local storage
    localStorage.setItem("LASTNAME", lastName);
    localStorage.setItem("FIRSTNAME", firstName);
    //localStorage.setItem("TITLE", title);
    localStorage.setItem("HEIGHT", height);
    localStorage.setItem("PHONE", phone);
    localStorage.setItem("ADDRESS", address);
    localStorage.setItem("CITY", city);
    localStorage.setItem("STATE", state);
    localStorage.setItem("ZIPCODE", zipcode);
    localStorage.setItem("SERVICES", services);
    localStorage.setItem("EMAIL", email);
    
    return;
   
}

// Retrieve data from local storage
addEventListener('load', () => {
    // Retrieve values by the key
    const lastName = localStorage.getItem('LASTNAME');
    const firstName = localStorage.getItem('FIRSTNAME');
    let title2;
    const title = localStorage.getItem('TITLE');
    title2 = JSON.parse(title);
    const height = localStorage.getItem('HEIGHT');
    const phone = localStorage.getItem('PHONE');
    var fullAddress;
    var address = localStorage.getItem('ADDRESS');
    var city = localStorage.getItem('CITY');
    var state = localStorage.getItem('STATE');
    var zipcode = localStorage.getItem('ZIPCODE');
    const services = localStorage.getItem('SERVICES');
    let budget2;
    const budget = localStorage.getItem('BUDGET');
    budget2 = JSON.parse(budget);
    const email = localStorage.getItem('EMAIL');
    fullAddress = address + ", " + city + ", " + state + " " + zipcode;
    
    // Render saved values to the result page
    document.getElementById('lastName').innerHTML = lastName;
    document.getElementById('firstName').innerHTML = firstName;
    document.getElementById('title').innerHTML = title2;
    document.getElementById('heightSelect').innerHTML = height;
    document.getElementById('phone').innerHTML = phone;
    document.getElementById('fullAddress').innerHTML = fullAddress;
    document.getElementById('servicesReq').innerHTML = services;
    document.getElementById('monthlyBudget').innerHTML = budget2;
    document.getElementById('email').innerHTML = email;
})

// Google Map
let map;
var geocoder;
function initMap() {
  // location  
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.7749, lng: -122.4194 },
    zoom: 15,
  });

  geocoder = new google.maps.Geocoder();
  geocodeAddress(geocoder, map);
}

function geocodeAddress(geocoder, map) {
    var fullAddress;
    var address = localStorage.getItem('ADDRESS');
    var city = localStorage.getItem('CITY');
    var state = localStorage.getItem('STATE');
    var zipcode = localStorage.getItem('ZIPCODE');
    fullAddress = address + ", " + city + ", " + state + " " + zipcode;
    
    geocoder.geocode({'address': fullAddress}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

// validate reCAPTCHA 
addEventListener("submit", function(event)
{
  var response = grecaptcha.getResponse();
  if(response.length == 0) 
  { 
    //reCaptcha not verified
    alert("Please verify you are not a robot."); 
    event.preventDefault();
    return false;
  }
});