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
  selectedQuestionCount: number | null = null; // Add this line

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.certificationID = params['certificationID'] || null;
      this.selectedQuestionCount = +params['count'] || null; // Parse the count from query parameters
      if (this.certificationID) {
        this.getQuestions();
      }
    });
  }

  async getQuestions() {
    const firestore = getFirestore();
    const questionsQuery = query(
      collection(firestore, 'questions'),
      where('certificationID', '==', this.certificationID)
    );
    const querySnapshot = await getDocs(questionsQuery);
  
    this.questions = querySnapshot.docs
      .map((doc: QueryDocumentSnapshot<DocumentData>) => {
        const questionData = doc.data();
        questionData['answers'] = JSON.parse(questionData['answers']); // Parse the answers field
        questionData['selectedAnswer'] = null; // Initialize selected answer
        questionData['correctCount'] = questionData['answers'].filter(
          (answer: any) => answer.correctAnswer
        ).length; // Calculate correctCount based on correct answers
        return questionData;
      })
      .slice(0, this.selectedQuestionCount as number); // Slice the array to the selected question count

  }
  
  

  selectAnswer(question: any, answer: any) {
    if (question.questionType === 'QuestionType.selectAll') {
      if (!question.selectedAnswers) {
        question.selectedAnswers = [];
      }
  
      // Check if the answer is already selected
      const answerIndex = question.selectedAnswers.indexOf(answer);
  
      if (answerIndex > -1) {
        // If answer is already selected, remove it
        question.selectedAnswers.splice(answerIndex, 1);
      } else {
        // If answer is not selected, add it
        question.selectedAnswers.push(answer);
      }
    } else {
      // For other question types, handle as before (single selection)
      question.selectedAnswer = answer;
    }
  }
submitQuiz() {
  this.selectedAnswers = [];
  let correctAnswersCount = 0; // Declare the variable here

  for (const question of this.questions) {
    if (question.questionType === 'QuestionType.selectAll') {
      const selectedCorrectAnswers = question.answers.filter(
        (answer: any) =>
          answer.correctAnswer && question.selectedAnswers && question.selectedAnswers.includes(answer)
      );
      

      if (selectedCorrectAnswers.length === question.correctCount) {
        correctAnswersCount++;
      }
    } else if (question.selectedAnswer && question.selectedAnswer.correctAnswer) {
      correctAnswersCount++;
    }
  }

  console.log(this.selectedAnswers);

  const percentage = (correctAnswersCount / this.questions.length) * 100;

  console.log(`Percentage of correct answers: ${percentage}%`);

  this.correctCount = correctAnswersCount;

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
