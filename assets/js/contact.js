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

  function submitform(e){
      e.preventDefault();

      var name = getElementVal('name');
      var email = getElementVal('email');
      var phone = getElementVal('phone');
      var message = getElementVal('message');

      saveMessages(name, email, phone, message);

      document.querySelector(".success").style.display = "block";
    
      setTimeout(() => {
        document.querySelector(".success").style.display = "none";
      }, 3000);
    
      document.getElementById("contactForm").reset();
    }
    
    const saveMessages = (name, email, phone, message) => {
      var newContactForm = contactformdb.push();
    
      newContactForm.set({
        name: name,
        email: email,
        message: message,
        phone: phone,
      });
    };

  const getElementVal = (id) =>{
      return document.getElementById(id).value;
  }