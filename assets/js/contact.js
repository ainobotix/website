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
  var  contactformdb = firebase.database().ref('contactus')


  document.getElementById('contactForm').addEventListener("submit", submitform)

  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('year').textContent = new Date().getFullYear();
  });


  function submitform(e){
      e.preventDefault();

      var name = getElementVal('name');
      var email = getElementVal('email');
      var phone = getElementVal('phone');
      var message = getElementVal('message');
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

      saveMessages(name, email, phone, message, timestamp);

      document.querySelector(".success").style.display = "block";
    
      setTimeout(() => {
        document.querySelector(".success").style.display = "none";
      }, 3000);
    
      document.getElementById("contactForm").reset();
    }
    
    const saveMessages = (name, email, phone, message, timestamp) => {
      var newContactForm = contactformdb.push();
    
      newContactForm.set({
        name: name,
        email: email,
        message: message,
        phone: phone,
        timestamp: timestamp,
      });
    };

  const getElementVal = (id) =>{
      return document.getElementById(id).value;
  }
  document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.toggleButton');
    
    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
      link.classList.remove('active');
    });

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            // Hide all content elements
            const contents = document.querySelectorAll('.content');
            contents.forEach(content => {
                content.style.display = "none";
            });

            // Show the targeted element
            targetElement.style.display = "block";
        });
    });

    // Initially hide all content elements
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => {
        content.style.display = "none";
    });
});