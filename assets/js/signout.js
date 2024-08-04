import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, signOut, onAuthStateChanged, updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

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

// Function to update display name
export function handleUpdateDisplayName(event) {
  event.preventDefault();
  const newDisplayName = document.getElementById('newDisplayName').value;
  const user = auth.currentUser;
  const toastLiveExample = document.getElementById('liveToast')
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

  if (user) {
    updateProfile(user, {
      displayName: newDisplayName
    }).then(() => {
      document.getElementById('username').textContent = newDisplayName;
      document.getElementById('welcomeMessage').textContent = `Welcome, ${newDisplayName}`;
      document.getElementById('alert-status').textContent = 'Username updated successfully!';
      toastBootstrap.show()
    }).catch((error) => {
      console.error('Update display name error:', error);
      document.getElementById('updateErrorMessage').textContent = error.message;
    });
  }
}

// Function to update password
export function handleUpdatePassword(event) {
  event.preventDefault();
  const email = document.getElementById('reauthEmail').value;
  const currentPassword = document.getElementById('reauthPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const user = auth.currentUser;

  if (user) {
    const credential = EmailAuthProvider.credential(email, currentPassword);

    reauthenticateWithCredential(user, credential).then(() => {
      return updatePassword(user, newPassword);
    }).then(() => {
      document.getElementById('updateMessage').textContent = 'Password updated successfully!';
      document.getElementById('updateErrorMessage').textContent = '';
      handleSignOut();
    }).catch((error) => {
      console.error('Reauthenticate or update password error:', error);
      document.getElementById('updateErrorMessage').textContent = error.message;
    });
  }
}

// Attach the signIn function to the form submit event
document.addEventListener("DOMContentLoaded", function() {
  const signOutButton = document.getElementById('signOutButton');
  const updateDisplayNameForm = document.getElementById('updateDisplayNameForm');
  const updatePasswordForm = document.getElementById('updatePasswordForm');

  if (signOutButton) {
    signOutButton.addEventListener('click', handleSignOut);
    // Show the sign-out button if the user is already signed in
  }

  if (updateDisplayNameForm) {
    updateDisplayNameForm.onsubmit = handleUpdateDisplayName;
  }

  if (updatePasswordForm) {
    updatePasswordForm.onsubmit = handleUpdatePassword;
  }

    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, display user's name
          const userName = user.displayName || 'User';
          document.getElementById('username').textContent = userName;
          document.getElementById('welcomeMessage').textContent = `Welcome, ${userName}`;
        } else {
          // User is signed out, redirect to the sign-in page
          window.location.href = '../../admin.html';
        }
      });
});