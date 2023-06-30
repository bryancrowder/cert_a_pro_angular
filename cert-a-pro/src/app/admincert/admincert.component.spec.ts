import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincertComponent } from './admincert.component';

describe('AdmincertComponent', () => {
  let component: AdmincertComponent;
  let fixture: ComponentFixture<AdmincertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmincertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmincertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
