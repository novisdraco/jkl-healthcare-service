import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverUpdateAppointmentComponent } from './caregiver-update-appointment.component';

describe('CaregiverUpdateAppointmentComponent', () => {
  let component: CaregiverUpdateAppointmentComponent;
  let fixture: ComponentFixture<CaregiverUpdateAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaregiverUpdateAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaregiverUpdateAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
