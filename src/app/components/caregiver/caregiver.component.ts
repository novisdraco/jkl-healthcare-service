import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { CaregiverService } from '../../services/caregiver.service';
// import { AddCaregiverModalComponent } from './add-caregiver-modal/add-caregiver-modal.component';
import { UpdateCaregiverModalComponent } from './update-caregiver-modal/update-caregiver-modal.component';

@Component({
  selector: 'app-caregiver',
  standalone: true,
  imports: [
    CommonModule,
    // AddCaregiverModalComponent,
    UpdateCaregiverModalComponent,
  ],
  templateUrl: './caregiver.component.html',
  styleUrl: './caregiver.component.css',
})
export class CaregiverComponent implements OnInit {
  caregiverColumnList: any = {
    name: {
      text: 'Name',
      width: 40,
    },
    availability: {
      text: 'Availability',
      width: 40,
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
    this.caregiverApi.getAllCaregiver().subscribe((data) => {
      this.caregiverDetails = [...data];
      this.onGoingRequest = false;
    });
  }

  // createCaregiver(value: any) {
  //   this.getCareGiverDetails();
  //   this.addCaregiver = false;
  // }

  updateCaregiverDetails(data: any) {
    this.updateCaregiver = !this.updateCaregiver;
    this.updateCaregiverData = data;
  }

  updateCaregiverClose(value: any) {
    this.getCareGiverDetails();
    this.updateCaregiver = false;
  }
}
