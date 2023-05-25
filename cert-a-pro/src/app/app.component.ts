import { Component } from '@angular/core';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cert-a-pro';
  isLoggedIn = false;

  constructor() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.isLoggedIn = !!user; // Check if the user is logged in
    });
  }

  handleLogout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('User logged out successfully.');
        // Additional logic here, such as redirecting to the login page
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  }
}