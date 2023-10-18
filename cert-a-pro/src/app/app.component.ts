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
  loggedInUsername: string | null = null;

  constructor() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user: User | null) => {
      this.isLoggedIn = !!user;
      if (user) {
        this.loggedInUsername = user.displayName;
      } else {
        this.loggedInUsername = null;
      }
    });
  }

  handleLogout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('User logged out successfully.');
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  }
}
