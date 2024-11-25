import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import $ from 'jquery';
import { Subject } from 'rxjs';
import { FlButtonComponent } from '../../core-components/fl-button/fl-button.component';
import { PatientService } from '../../../services/patient.service';
import { AuthService } from '../../../services/auth.service';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
  selector: 'app-schedule-appointment-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, FlButtonComponent],
  templateUrl: './schedule-appointment-modal.component.html',
  styleUrl: './schedule-appointment-modal.component.css',
})
export class ScheduleAppointmentModalComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  @Input() data: any = {};
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();
  showModal = false;
  appointmentDate: Date | null = null;
  appointmentTime: any;
  outline = true;
  userId: any;
  constructor(
    private appointmentApi: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    $('body').append($('<div></div>', { id: 'add-patient-overlay' }));
    $('#add-patient-overlay').append($('#add-patient-modal-container'));
    setTimeout(() => {
      this.showModal = true;
    }, 10);
    this.currentUser();
  }

  currentUser() {
    this.authService.getCurrentUser().subscribe((user: any) => {
      this.userId = user.id;
    });
  }

  closeModal() {
    this.showModal = false;
    setTimeout(() => {
      this.closeModalEvent.emit({ cancel: true, error: null });
    }, 200);
  }

  save() {
    let dateTime = `${this.appointmentDate} ${this.appointmentTime}:00`;
    let requestObj = {
      patientId: this.data['patient_id'],
      caregiverId: this.data['caregiver_id'],
      appointmentDate: dateTime,
    };
    this.appointmentApi.scheduleAppointment(requestObj).subscribe((data) => {
      setTimeout(() => {
        this.closeModalEvent.emit({ cancel: true, error: null });
      }, 200);
    });
  }

  ngOnDestroy() {
    $('#add-patient-overlay').remove();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
