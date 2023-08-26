// import { Injectable } from '@angular/core';
// import { getFirestore, doc, getDoc } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserRoleService {
//   constructor() {}

//   async getUserRole(uid: string): Promise<string | null> {
//     try {
//       console.log('Fetching user role data for UID:', uid);
//       const auth = getAuth();
//       const firestore = getFirestore();
//       const userDocRef = doc(firestore, 'users', uid);
//       const userSnapshot = await getDoc(userDocRef);
  
//       if (userSnapshot.exists()) {
//         const userData = userSnapshot.data() as { role: string };
//         const role = userData['role'] || null;
//         console.log('User role:', role);
//         return role;
//       } else {
//         console.log('User document does not exist.');
//         return null;
//       }
//     } catch (error) {
//       console.error('Error getting user role:', error);
//       return null;
//     }
//   }
// }  