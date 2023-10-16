import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-questionselector',
  templateUrl: './questionselector.component.html',
  styleUrls: ['./questionselector.component.css']
})
export class QuestionselectorComponent implements OnInit {
  certificationID: string | null = null;
  certificationTitle: string | null = null;
  questionCounts = [5, 10, 15, 25, 50, 100, 150];
  selectedQuestionCount: number | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.certificationID = params['certificationID'] || null;
      this.certificationTitle = params['title'] || null;
    });
  }

  setQuestionCount(count: number) {
    this.selectedQuestionCount = count;
  }

  submitSelection() {
    if (this.selectedQuestionCount && this.certificationID) {
      this.router.navigate(['/quiz'], {
        queryParams: {
          count: this.selectedQuestionCount,
          certificationID: this.certificationID
        }
      });
    }
  }
}
