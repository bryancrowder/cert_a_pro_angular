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
  selectedAnswers: any[] = [];
  correctCount: number = 0;

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
  
      // Calculate correctCount based on correct answers
      questionData['correctCount'] = questionData['answers'].filter((answer: any) => answer.correctAnswer).length;
  
      return questionData;
    });
  }
  

  selectAnswer(question: any, answer: any) {
    question.selectedAnswer = answer;
  }
  submitQuiz() {
    this.selectedAnswers = [];
    let correctAnswersCount = 0; // Initialize count of correct answers
    for (const question of this.questions) {
      if (question.selectedAnswer) {
        this.selectedAnswers.push({
          question: question.question,
          answer: question.selectedAnswer.answer
        });
  
        if (question.selectedAnswer.correctAnswer) {
          correctAnswersCount++; // Increment count for each correct answer
        }
      }
    }
    console.log(this.selectedAnswers);
  
    const percentage = (correctAnswersCount / this.questions.length) * 100; // Calculate percentage
  
    console.log(`Percentage of correct answers: ${percentage}%`);
  
    this.correctCount = correctAnswersCount; // Update the correctCount property
  
    // You may also choose to update the correctCount property for each question in the questions array, similar to the previous implementation
  
    // Update the correctCount property for each question
    for (const question of this.questions) {
      question.correctCount = question.answers.filter((answer: any) => answer.correctAnswer).length;
    }
  }
  
  
  calculatePercentage(): number {
    const percentage = (this.correctCount > 0) ? (this.correctCount / this.questions.length) * 100 : 0;
    return Math.round(percentage);
  }
  
  
  

}
