import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent implements OnInit {
  categoryID: string | undefined;
  certifications: any[] = []; // Array to store multiple certifications

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const params: Params = this.route.snapshot.params;
    this.categoryID = params["id"];
    console.log(this.categoryID);
    console.log(this.route.snapshot.params);

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const db = getFirestore();

        const certQuery = query(collection(db, 'certifications'), where('categoryID', '==', this.categoryID));

        getDocs(certQuery)
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                this.certifications.push(doc.data()); // Store each certification in the array
              });
            } else {
              console.log('No certifications found!');
            }
          })
          .catch((error) => {
            console.error('Error getting certifications:', error);
          });
      } else {
        // User is not logged in, redirect to login page or any other desired action
        this.router.navigate(['/login']);
      }
    });
  }

  onCertificationClick(certification: any) {
    // Handle the click event for the certification
    // You can access the certification data and perform any desired actions
    console.log('Clicked certification:', certification);
    // Additional logic here
  }
}
