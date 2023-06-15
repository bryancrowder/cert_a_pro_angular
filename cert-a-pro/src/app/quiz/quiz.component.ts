import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { getFirestore, collection, query, where, getDocs, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  certificationID: string | null = null;
  questions: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.certificationID = params['certificationID'] || null;
      if (this.certificationID) {
        this.getQuestions();
      }
    });
  }

  async getQuestions() {
    const firestore = getFirestore();
    const questionsQuery = query(collection(firestore, 'questions'), where('certificationID', '==', this.certificationID));
    const querySnapshot = await getDocs(questionsQuery);

    this.questions = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
      const questionData = doc.data();
      questionData['answers'] = JSON.parse(questionData['answers']); // Parse the answers field
      questionData['selectedAnswer'] = null; // Initialize selected answer
      return questionData;
    });
  }

  selectAnswer(question: any, answer: any) {
    question.selectedAnswer = answer;
  }
}
