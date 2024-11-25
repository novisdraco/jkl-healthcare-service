import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverAppointmentComponent } from './caregiver-appointment.component';

describe('CaregiverAppointmentComponent', () => {
  let component: CaregiverAppointmentComponent;
  let fixture: ComponentFixture<CaregiverAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaregiverAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaregiverAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
