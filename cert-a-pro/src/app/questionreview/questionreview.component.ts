import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questionreview',
  templateUrl: './questionreview.component.html',
  styleUrls: ['./questionreview.component.css']
})
export class QuestionreviewComponent implements OnInit {
  questions: any[] = [];
  correctCount: number = 0;
  totalQuestions: number = 0;
  percentage: number = 0;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['questions']) {
        this.questions = JSON.parse(params['questions']);
        this.correctCount = +params['correctCount'];
        this.totalQuestions = +params['totalQuestions'];
        this.percentage = +params['percentage']; // Retrieve the percentage
      }
      console.log(this.percentage)
    });
  }
  
  getSelectedAnswer(question: any): string {
    if (question.selectedAnswer) {
      return question.selectedAnswer.answer;
    } else if (question.selectedAnswers) {
      return question.selectedAnswers.map((answer: any) => answer.answer).join(', ');
    }
    return 'No answer selected';
  }

  getCorrectAnswers(question: any): string {
    const correctAnswers = question.answers.filter((answer: any) => answer.correctAnswer);
    return correctAnswers.map((answer: any) => answer.answer).join(', ');
  }
  isAnswerCorrect(question: any): boolean {
    if (question.selectedAnswer) {
      return question.selectedAnswer.correctAnswer;
    } else if (question.selectedAnswers) {
      return question.selectedAnswers.every((answer: any) => answer.correctAnswer);
    }
    return false;
  }
  
}
