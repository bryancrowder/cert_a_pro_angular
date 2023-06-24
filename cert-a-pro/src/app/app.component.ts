import { Component } from '@angular/core';
import { getAuth, signOut, onAuthStateChanged, User } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cert-a-pro';
  isLoggedIn = false;
  loggedInUsername: string | null = null; // Property to store the logged-in user's username

  constructor() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user: User | null) => {
      this.isLoggedIn = !!user;
      if (user) {
        this.loggedInUsername = user.displayName; // Set the username of the logged-in user
      } else {
        this.loggedInUsername = null; // Reset the username when the user is logged out
      }
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
