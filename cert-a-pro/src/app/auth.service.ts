// auth.service.ts

import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.userSubject.next(user);
    });
  }

  get currentUser() {
    return this.userSubject.value;
  }

  get isLoggedIn() {
    return !!this.currentUser;
  }
}
