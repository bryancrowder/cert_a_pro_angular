import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { getFirestore, getDoc, doc, collection, getDocs } from 'firebase/firestore';
import { Router } from '@angular/router';

interface QuizQuestion {
  answers: any[];
  question: string;
  questionType: string;
  selectedAnswer: any | null;
  selectedAnswers?: any[];
  correctCount?: number;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  certificationID: string | null = null;
  questions: QuizQuestion[] = [];
  selectedAnswers: any[] = [];
  correctCount: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(async (params: Params) => {
      this.certificationID = params['certificationID'] || null;
      if (this.certificationID) {
        await this.getQuestions();
        console.log('Questions:', this.questions);

        const selectedQuestionCount = parseInt(params['count'], 10);
        this.questions = this.questions.slice(0, selectedQuestionCount);
        console.log('Selected Questions:', this.questions);
      }
    });
  }

  async getQuestions() {
    const firestore = getFirestore();

    try {
      const collectionRef = collection(firestore, 'question_array');
      const querySnapshot = await getDocs(collectionRef);

      if (!querySnapshot.empty) {
        console.log('Query Snapshot:', querySnapshot.docs);

        const questionDoc = querySnapshot.docs.find(
          (doc) => doc.data()['certification_id'] === this.certificationID
        );

        if (questionDoc) {
          const questionData = questionDoc.data();
          console.log('Question Data:', questionData);

          if (questionData['questions'] && questionData['questions'].length > 0) {
            this.questions = questionData['questions'].map((questionData: any) => {
              try {
                return {
                  answers: JSON.parse(questionData['answers'] || '[]'), // Handle undefined or invalid JSON
                  question: questionData['question'],
                  questionType: questionData['questionType'],
                  selectedAnswer: null,
                  selectedAnswers: [],
                } as QuizQuestion;
              } catch (e) {
                console.error('Error parsing JSON for question:', e);
                return null; // Skip this question if JSON parsing fails
              }
            });

            // Filter out null questions (those with parsing errors)
            this.questions = this.questions.filter((question) => question !== null);

            // Shuffle the questions array to randomize the order
            this.questions = shuffleArray(this.questions);

            console.log('Fetched Questions:', this.questions);
          } else {
            console.log(
              'No questions found in the questions array for certification_id:',
              this.certificationID
            );
          }
        } else {
          console.log(
            'Questions document not found for certification_id:',
            this.certificationID
          );
        }
      } else {
        console.log('No documents found in the collection');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }

  selectAnswer(question: any, answer: any) {
    if (question.questionType === 'QuestionType.selectAll') {
      if (!question.selectedAnswers) {
        question.selectedAnswers = [];
      }

      const answerIndex = question.selectedAnswers.indexOf(answer);

      if (answerIndex > -1) {
        question.selectedAnswers.splice(answerIndex, 1);
      } else {
        question.selectedAnswers.push(answer);
      }
    } else {
      question.selectedAnswer = answer;
    }
  }

  async submitQuiz() {
    this.selectedAnswers = [];
    let correctAnswersCount = 0;

    for (const question of this.questions) {
      if (question.questionType === 'QuestionType.selectAll') {
        const selectedCorrectAnswers = question.answers.filter(
          (answer: any) =>
            answer.correctAnswer &&
            question.selectedAnswers &&
            question.selectedAnswers.includes(answer)
        );

        if (selectedCorrectAnswers.length === question.correctCount) {
          correctAnswersCount++;
        }
      } else if (
        question.selectedAnswer &&
        question.selectedAnswer.correctAnswer
      ) {
        correctAnswersCount++;
      }
    }

    // Calculate the percentage
    const percentage = (correctAnswersCount / this.questions.length) * 100;
    this.correctCount = correctAnswersCount;
    console.log('State Data:', {
      questions: this.questions,
      correctCount: this.correctCount,
      totalQuestions: this.questions.length,
      percentage: percentage
    });

    // Navigate to the question review component
    this.router.navigate(['/quizreview'], {
      queryParams: {
        questions: JSON.stringify(this.questions),
        correctCount: this.correctCount,
        totalQuestions: this.questions.length,
        percentage: percentage
      }
    });
  }

  calculatePercentage(): number {
    const percentage = this.correctCount > 0 ? (this.correctCount / this.questions.length) * 100 : 0;
    return Math.round(percentage);
  }
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
