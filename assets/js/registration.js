const firebaseConfig = {
    apiKey: "AIzaSyDE-Mokjha0UJc6GW-mVz02dGbmaO6-xn8",
    authDomain: "ainobotix-152ee.firebaseapp.com",
    databaseURL: "https://ainobotix-152ee-default-rtdb.firebaseio.com",
    projectId: "ainobotix-152ee",
    storageBucket: "ainobotix-152ee.appspot.com",
    messagingSenderId: "298959337678",
    appId: "1:298959337678:web:ef12d8d577d3f6b255789f",
    measurementId: "G-804FG7EN8J"
  };

firebase.initializeApp(firebaseConfig);
var contactformdb = firebase.database().ref('registration')

document.getElementById('registration').addEventListener("submit", submitform)

function submitform(e){
    e.preventDefault();

    var formData = new FormData(this);
    var keyValuePairs = [];
    for (var pair of formData.entries()) {
      keyValuePairs.push(pair[0] + "=" + pair[1]);
    }

    var formDataString = keyValuePairs.join("&")

    var name = getElementVal('name-2');
    var email = getElementVal('email-2');
    var phone = getElementVal('phone-2');
    var phone2 = getElementVal('phone-3');
    var section = getElementVal('section');
    var message = getElementVal('message-2');
    var timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // Use 12-hour format
      timeZoneName: 'longGeneric'
  });;

    saveMessages(name, email, phone, phone2, section, message, timestamp);

    fetch(
      "https://script.google.com/macros/s/AKfycbyn9FKebe0Fr5du4wQ0o9Agk788L28shZf0uUipXubH86nAt-kMZgL2Ri1VnorfQTrt/exec",
      {
        redirect: "follow",
        method: "POST",
        body: formDataString,
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      }
    ).then(function (response) {
      // Check if the request was successful
      if (response) {
        return response; // Assuming your script returns JSON response
      } else {
        throw new Error("Failed to submit the form.");
      }
    })

    document.querySelector(".confirm").style.display = "block";
  
    setTimeout(() => {
      document.querySelector(".confirm").style.display = "none";
    }, 3000);
  
    document.getElementById("registration").reset();
  }
  
  const saveMessages = (name, email, phone, phone2, section, message, timestamp) => {
    var newContactForm = contactformdb.push();
  
    newContactForm.set({
      name: name,
      email: email,
      message: message,
      Whatsapp_phone: phone,
      Parents_phone: phone2,
      class: section,
      timestamp: timestamp,
    });
  };

const getElementVal = (id) =>{
    return document.getElementById(id).value;
}
