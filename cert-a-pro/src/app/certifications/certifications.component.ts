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

        // Update the collection name to 'certification_array'
        const certQuery = query(collection(db, 'certification_array'), where('categoryID', '==', this.categoryID));

        getDocs(certQuery)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const certification = doc.data();
              certification['id'] = doc.id;
              this.certifications.push(certification);
            });
            console.log('Certifications:', this.certifications); // Log the certifications array
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

  navigateToQuestionSelector(certification: any) {
    this.router.navigate(['/selection'], {
      queryParams: {
        certificationID: certification.id,
        title: certification.title,
        categoryID: this.categoryID
      }
    });
  }
}
