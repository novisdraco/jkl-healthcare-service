import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { CaregiverService } from '../../services/caregiver.service';
import { FlButtonComponent } from '../core-components/fl-button/fl-button.component';
// import { AddCaregiverModalComponent } from './add-caregiver-modal/add-caregiver-modal.component';
// import { UpdateCaregiverModalComponent } from './update-caregiver-modal/update-caregiver-modal.component';

@Component({
  selector: 'app-unassign-caregiver',
  standalone: true,
  imports: [CommonModule, FlButtonComponent],
  templateUrl: './unassign-caregiver.component.html',
  styleUrl: './unassign-caregiver.component.css',
})
export class UnassignCaregiverComponent implements OnInit {
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
  addCaregiver = false;
  updateCaregiver = false;
  updateCaregiverData = {};
  heightStyle = {};

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setHeightStyle();
  }

  constructor(private caregiverApi: CaregiverService) {}

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
    this.caregiverApi.getUnassignedList().subscribe((data) => {
      this.caregiverDetails = [...data];
      this.onGoingRequest = false;
    });
  }
  assignCaregiver(data: any) {
    let requestObj = {
      patientId: data['patient_id'],
      caregiverId: data['caregiver_id'],
    };
    this.caregiverApi.assignCaregiver(requestObj).subscribe((data) => {
      this.getCareGiverDetails();
    });
  }
}
