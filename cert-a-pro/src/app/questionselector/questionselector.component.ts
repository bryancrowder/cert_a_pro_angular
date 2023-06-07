import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questionselector',
  templateUrl: './questionselector.component.html',
  styleUrls: ['./questionselector.component.css']
})
export class QuestionselectorComponent implements OnInit {
  certificationID: string | null = null;
  certificationTitle: string | null = null;
  selectedQuestionCount!: number; // Using definite assignment assertion operator

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.certificationID = params['certificationID'] || null;
      this.certificationTitle = params['title'] || null;
    });
  }

  setQuestionCount(questionCount: number): void {
    this.selectedQuestionCount = questionCount;
    // Perform any additional actions based on the selected question count
    console.log('Selected Question Count:', this.selectedQuestionCount);
  }
}
