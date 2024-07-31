import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

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
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to handle sign-in
export function handleSignIn(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('Signed in as:', user.email);
      // Redirect to another page, e.g., dashboard.html
      window.location.href = '../../dashboard.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error code:', errorCode);
      console.error('Error message:', errorMessage);
      // Display error message
      document.getElementById('errorMessage').textContent = errorMessage;
    });

  return false; // Return false to prevent form submission
}

// Function to handle sign-out
export function handleSignOut() {
  signOut(auth).then(() => {
    console.log('User signed out.');
    // Redirect to the sign-in page or show sign-in form
    window.location.href = '../../admin.html';
  }).catch((error) => {
    console.error('Sign out error:', error);
  });
}

// Attach the signIn function to the form submit event
document.addEventListener("DOMContentLoaded", function() {
  const signInForm = document.getElementById('signInForm');
  const signOutButton = document.getElementById('signOutButton');

  signInForm.onsubmit = handleSignIn;

  if (signOutButton) {
    signOutButton.addEventListener('click', handleSignOut);
    // Show the sign-out button if the user is already signed in
    auth.onAuthStateChanged((user) => {
      if (user) {
        signOutButton.style.display = 'block';
      } else {
        signOutButton.style.display = 'none';
      }
    });
  }
});