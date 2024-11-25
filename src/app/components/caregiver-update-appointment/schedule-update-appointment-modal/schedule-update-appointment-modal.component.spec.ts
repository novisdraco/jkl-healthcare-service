import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleUpdateAppointmentModalComponent } from './schedule-update-appointment-modal.component';

describe('ScheduleUpdateAppointmentModalComponent', () => {
  let component: ScheduleUpdateAppointmentModalComponent;
  let fixture: ComponentFixture<ScheduleUpdateAppointmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleUpdateAppointmentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleUpdateAppointmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
