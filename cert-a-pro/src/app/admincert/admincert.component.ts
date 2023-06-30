// admincert.component.ts
import { Component } from '@angular/core';
import { getFirestore, collection, query, getDocs, doc, updateDoc, addDoc, Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-admincert',
  templateUrl: './admincert.component.html',
  styleUrls: ['./admincert.component.css']
})
export class AdmincertComponent {
  certifications: any[] = [];
  newCertification: any = {
    title: '',
    description: '',
    categoryID: '',
    abbreviation: ''
  };

  constructor() {}

  ngOnInit() {
    this.fetchCertifications();
  }

  async fetchCertifications() {
    const firestore = getFirestore();
    const certificationsCollection = collection(firestore, 'certifications');
    const certificationsQuery = query(certificationsCollection);

    const snapshot = await getDocs(certificationsQuery);

    this.certifications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  onCertificationTitleChange(certification: any, event: any) {
    certification.title = event.target.innerText;
  }

  onCertificationDescriptionChange(certification: any, event: any) {
    certification.description = event.target.innerText;
  }

  async saveCertification(certification: any) {
    const firestore = getFirestore();
    const certificationDocRef = doc(firestore, 'certifications', certification.id);
    await updateDoc(certificationDocRef, certification);
  }

  async addCertification() {
    const firestore = getFirestore();
    const certificationsCollection = collection(firestore, 'certifications');

    const newCertificationData = {
      ...this.newCertification,
      timestamp: Timestamp.now() // Add a timestamp field
    };

    const docRef = await addDoc(certificationsCollection, newCertificationData);

    this.certifications.push({
      id: docRef.id,
      ...newCertificationData
    });

    // Clear the input fields
    this.newCertification = {
      title: '',
      description: '',
      categoryID: '',
      abbreviation: ''
    };
  }
}
