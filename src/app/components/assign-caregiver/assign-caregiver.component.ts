import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { CaregiverService } from '../../services/caregiver.service';
import { FlButtonComponent } from '../core-components/fl-button/fl-button.component';
@Component({
  selector: 'app-assign-caregiver',
  standalone: true,
  imports: [CommonModule, FlButtonComponent],
  templateUrl: './assign-caregiver.component.html',
  styleUrl: './assign-caregiver.component.css',
})
export class AssignCaregiverComponent implements OnInit {
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
    this.caregiverApi.getAssignedList().subscribe((data) => {
      this.caregiverDetails = [...data];
      this.onGoingRequest = false;
    });
  }
  unassignCaregiver(data: any) {
    let requestObj = {
      assignmentId: data['assignment_id'],
    };
    this.caregiverApi.unassignCaregiver(requestObj).subscribe((data) => {
      this.getCareGiverDetails();
    });
  }
}
