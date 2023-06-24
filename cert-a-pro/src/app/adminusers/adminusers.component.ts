import { Component } from '@angular/core';
import { getFirestore, collection, query, where, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

interface User {
  email: string;
  role: string;
  uid: string;
  user_name: string;
}

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent {
  users: User[];

  constructor() {
    this.users = [];
    this.fetchUsers();
  }

  async fetchUsers() {
    const firestore = getFirestore();
    const usersCollection = collection(firestore, 'users');
    const q = query(usersCollection);
    const querySnapshot = await getDocs(q);

    this.users = querySnapshot.docs.map((doc) => doc.data() as User);
  }

  async updateUser(user: User) {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, 'users', user.uid);

    await setDoc(userDocRef, user);
    console.log('User updated successfully!');
  }

  async deleteUser(user: User) {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, 'users', user.uid);

    await deleteDoc(userDocRef);
    console.log('User deleted successfully!');

    // Remove the deleted user from the users array
    this.users = this.users.filter((u) => u.uid !== user.uid);
  }
}
