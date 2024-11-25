import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { CaregiverService } from '../../services/caregiver.service';
import { FlButtonComponent } from '../core-components/fl-button/fl-button.component';
import { ScheduleUpdateAppointmentModalComponent } from './schedule-update-appointment-modal/schedule-update-appointment-modal.component';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-caregiver-update-appointment',
  standalone: true,
  imports: [CommonModule, FlButtonComponent, ScheduleUpdateAppointmentModalComponent],
  templateUrl: './caregiver-update-appointment.component.html',
  styleUrl: './caregiver-update-appointment.component.css',
})
export class CaregiverUpdateAppointmentComponent implements OnInit {
  caregiverColumnList: any = {
    caregiverName: {
      text: 'Caregiver Name',
      width: 20,
    },
    availability: {
      text: 'Availability',
      width: 20,
    },
    patientName: {
      text: 'Patient Name',
      width: 20,
    },
    medicalRecord: {
      text: 'Medical Record',
      width: 30,
    },
  };
  displayedColumns: string[] = Object.keys(this.caregiverColumnList);
  onGoingRequest = false;
  caregiverDetails: any = [];
  heightStyle = {};
  openAppointment = false;
  appointmentData = {};

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setHeightStyle();
  }

  constructor(private appointmentApi: AppointmentService) {}

  ngOnInit() {
    this.setHeightStyle();
    this.getCareGiverDetails();
  }

  setHeightStyle() {
    this.heightStyle = {
      maxHeight: `${window.innerHeight - 160}px`,
      overflow: 'auto',
      minHeight: `${window.innerHeight - 160}px`,
    };
  }

  getHeightStyle() {
    return { ...this.heightStyle };
  }

  getCareGiverDetails() {
    this.onGoingRequest = true;
    this.appointmentApi.getAllAppointment().subscribe((data) => {
      this.caregiverDetails = [...data];
      this.onGoingRequest = false;
    });
  }

  toggleAppointment(data: any) {
    this.openAppointment = !this.openAppointment;
    this.appointmentData = data;
  }

  appointmentClose(value: any) {
    this.getCareGiverDetails();
    this.openAppointment = false;
  }
}
