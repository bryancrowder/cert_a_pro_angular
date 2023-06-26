import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, query, getDocs, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

@Component({
  selector: 'app-adminq',
  templateUrl: './adminq.component.html',
  styleUrls: ['./adminq.component.css']
})
export class AdminqComponent implements OnInit {
  questions: any[] = [];
  selectedAnswers: { [key: string]: any } = {}; // Use an object to store selected answers

  constructor() {}

  ngOnInit() {
    this.getQuestions();
  }

  async getQuestions() {
    const firestore = getFirestore();
    const questionsQuery = query(collection(firestore, 'questions'));
    const querySnapshot = await getDocs(questionsQuery);

    this.questions = querySnapshot.docs
      .map((doc: QueryDocumentSnapshot<DocumentData>) => {
        const questionData = doc.data();
        questionData['answers'] = JSON.parse(questionData['answers']);
        return questionData;
      });
  }

  submitAnswers() {
    console.log(this.selectedAnswers);
    // Process the selected answers here
  }
  editQuestion(index: number) {
  // Perform any desired logic for editing a question
  console.log('Edit question:', this.questions[index]);
}

}
