import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionselectorComponent } from './questionselector.component';

describe('QuestionselectorComponent', () => {
  let component: QuestionselectorComponent;
  let fixture: ComponentFixture<QuestionselectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionselectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
