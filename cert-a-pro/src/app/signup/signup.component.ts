import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, OAuthProvider, UserCredential } from 'firebase/auth';
import { Router } from '@angular/router';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';

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
    if (!this.isValidEmail(this.email)) {
      console.error('Invalid email address');
      return;
    }

    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(auth, this.email, this.password);

      // Save the user data in Firestore
      const firestore = getFirestore();
      const usersCollection = collection(firestore, 'users');
      await addDoc(usersCollection, {
        uid: user.uid,
        email: user.email,
        username: this.username,
        role:'user'
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
      const { user } = await signInWithPopup(auth, provider);
      const additionalUserInfo = user?.providerData[0]?.uid;
      const isNewUser = additionalUserInfo ? true : false;

      if (isNewUser) {
        // Generate a random username for new Google login users
        const randomUsername = this.generateRandomUsername();

        // Save the user data in Firestore
        const firestore = getFirestore();
        const usersCollection = collection(firestore, 'users');
        const userDoc = doc(usersCollection, user.uid);
        await setDoc(userDoc, {
          uid: user.uid,
          email: user.email,
          username: randomUsername
        });
      }

      this.router.navigate(['/dashboard']); // Redirect to the dashboard after successful login
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  }

  public isValidEmail(email: string): boolean {
    // Use regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private generateRandomUsername(): string {
    // Generate a random username using a combination of letters and numbers
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let username = '';
    for (let i = 0; i < 8; i++) {
      username += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return username;
  }
}
