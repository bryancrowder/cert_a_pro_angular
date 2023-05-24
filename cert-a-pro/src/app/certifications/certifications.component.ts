//  import { Component, OnInit } from '@angular/core';
//  import { ActivatedRoute, Params } from '@angular/router';
 

//  @Component({
//    selector: 'app-certifications',
//    templateUrl: './certifications.component.html',
//    styleUrls: ['./certifications.component.css']
//  })
//  export class CertificationsComponent  implements OnInit {
//  cert: string | undefined;

//    constructor(private route: ActivatedRoute, ) {}
  
  
//    ngOnInit() {
//      const params: Params = this.route.snapshot.params;
//      this.cert = params["id"]
//      console.log(this.cert);
//      console.log(this.route.snapshot.params);
//    } 
//  }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
  ) {}

  ngOnInit() {
    const params: Params = this.route.snapshot.params;
    this.categoryID = params["id"];
    console.log(this.categoryID);
    console.log(this.route.snapshot.params);

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
  }
}


