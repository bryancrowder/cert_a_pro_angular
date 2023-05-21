import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore }  from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent implements OnInit {
  categoryId!: string;
  certification!: Observable<any>;

  constructor(private route: ActivatedRoute, private firestore: Firestore) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
      this.certification = this.firestore.collection('CAA').doc(this.categoryId).valueChanges();
    });
  }
}
