import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { AddPatientModalComponent } from './add-patient-modal/add-patient-modal.component';
import { UpdatePatientModalComponent } from './update-patient-modal/update-patient-modal.component';
import { DeletePatientModalComponent } from './delete-patient-modal/delete-patient-modal.component';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    CommonModule,
    AddPatientModalComponent,
    UpdatePatientModalComponent,
    DeletePatientModalComponent,
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css',
})
export class PatientComponent implements OnInit {
  patientColumnList: any = {
    name: {
      text: 'Name',
      width: 20,
    },
    email: {
      text: 'Email',
      width: 20,
    },
    address: {
      text: 'Address',
      width: 20,
    },
    medidicalRecord: {
      text: 'Medical Record',
      width: 30,
    },
  };
  displayedColumns: string[] = Object.keys(this.patientColumnList);
  onGoingRequest = false;
  patientDetails: any = [];
  addPatient = false;
  updatePatient = false;
  updatePatientData = {};
  deletePatient = false;
  deletePatientData = {};
  heightStyle = {};

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setHeightStyle();
  }

  constructor(private patientApi: PatientService) {}

  ngOnInit() {
    this.setHeightStyle();
    this.getPatientDetails();
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

  getPatientDetails() {
    this.onGoingRequest = true;
    this.patientApi.getPatientDetails({}).subscribe((data) => {
      this.patientDetails = [...data];
      this.onGoingRequest = false;
    });
  }

  createPatient(value: any) {
    if (!value.error && !value.cancel && value.error !== null) {
      this.getPatientDetails();
    } else if (value.error && !value.cancel && value.error !== null) {
    }
    this.addPatient = false;
  }

  updatePatientDetails(data: any) {
    this.updatePatient = !this.updatePatient;
    this.updatePatientData = data;
  }

  updatePatientClose(value: any) {
    this.getPatientDetails();
    this.updatePatient = false;
  }

  deletePatientDetails(data: any) {
    this.deletePatient = !this.deletePatient;
    this.deletePatientData = data;
  }

  deletePatientClose(value: any) {
    this.getPatientDetails();
    this.deletePatient = false;
  }
}
