import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCaregiverComponent } from './assign-caregiver.component';

describe('AssignCaregiverComponent', () => {
  let component: AssignCaregiverComponent;
  let fixture: ComponentFixture<AssignCaregiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignCaregiverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignCaregiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
