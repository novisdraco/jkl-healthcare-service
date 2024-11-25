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
import { AuthService } from '../../../services/auth.service';
import { AppointmentService } from '../../../services/appointment.service';
import moment from 'moment';

@Component({
  selector: 'app-schedule-update-appointment-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, FlButtonComponent],
  templateUrl: './schedule-update-appointment-modal.component.html',
  styleUrl: './schedule-update-appointment-modal.component.css',
})
export class ScheduleUpdateAppointmentModalComponent
  implements OnInit, OnDestroy
{
  private destroy$: Subject<void> = new Subject<void>();
  @Input() data: any = {};
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();
  showModal = false;
  appointmentDate: any = null;
  appointmentTime: any;
  outline = true;
  userId: any;
  constructor(
    private appointmentApi: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    let date = moment(new Date(this.data['appointment_date'])).format(
      'YYYY-MM-DD HH:mm'
    );
    this.appointmentDate = date.split(' ')[0];
    this.appointmentTime = date.split(' ')[1];

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
      appointmentId: this.data['appointment_id'],
      appointmentDate: dateTime,
      patientId: this.data['patient_id'],
    };
    this.appointmentApi
      .updateScheduleAppointment(requestObj)
      .subscribe((data) => {
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
