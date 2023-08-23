import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionreviewComponent } from './questionreview.component';

describe('QuestionreviewComponent', () => {
  let component: QuestionreviewComponent;
  let fixture: ComponentFixture<QuestionreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
