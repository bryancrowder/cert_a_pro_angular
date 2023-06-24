import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminqComponent } from './adminq.component';

describe('AdminqComponent', () => {
  let component: AdminqComponent;
  let fixture: ComponentFixture<AdminqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
