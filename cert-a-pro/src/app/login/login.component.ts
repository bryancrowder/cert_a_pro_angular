import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: string = '';
  loginSuccess: boolean = false;

  constructor(private router: Router) {}

  handleLogin() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        console.log('User logged in successfully.');
        this.loginSuccess = true;
        this.loginError = '';
        this.router.navigate(['/homepage']); // Redirect to the home page
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        this.loginSuccess = false;
        this.loginError = error.message;
      });
  }

  handleGoogleLogin() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        console.log('User logged in with Google successfully.');
        this.loginSuccess = true;
        this.loginError = '';
        this.router.navigate(['/homepage']); // Redirect to the home page
      })
      .catch((error) => {
        console.error('Error logging in with Google:', error);
        this.loginSuccess = false;
        this.loginError = error.message;
      });
  }
}
