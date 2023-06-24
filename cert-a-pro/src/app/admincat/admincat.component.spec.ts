import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincatComponent } from './admincat.component';

describe('AdmincatComponent', () => {
  let component: AdmincatComponent;
  let fixture: ComponentFixture<AdmincatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmincatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmincatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
