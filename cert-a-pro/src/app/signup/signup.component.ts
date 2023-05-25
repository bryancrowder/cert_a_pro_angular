import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, OAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  username: string = '';
  constructor(private router: Router) {}


  async handleEmailSignup() {
    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(auth, this.email, this.password);

      // Save the user data in Firestore
      const firestore = getFirestore();
      const usersCollection = collection(firestore, 'users');
      await addDoc(usersCollection, {
        uid: user.uid,
        email: user.email,
        username: this.username
      });

      this.router.navigate(['/dashboard']); // Redirect to the dashboard after successful signup
    } catch (error) {
      console.error('Error creating account:', error);
    }
  }



  async handleGoogleLogin() {
    try {
      const auth = getAuth();
      const provider = new OAuthProvider('google.com');
      await signInWithPopup(auth, provider);
      this.router.navigate(['/dashboard']); // Redirect to the dashboard after successful login
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  }
}
