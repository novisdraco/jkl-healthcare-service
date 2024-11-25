import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import $ from 'jquery';
import { Subject } from 'rxjs';
import { FlButtonComponent } from '../../core-components/fl-button/fl-button.component';
import { AuthService } from '../../../services/auth.service';
import { CaregiverService } from '../../../services/caregiver.service';

@Component({
  selector: 'app-add-caregiver-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, FlButtonComponent],
  templateUrl: './add-caregiver-modal.component.html',
  styleUrl: './add-caregiver-modal.component.css',
})
export class AddCaregiverModalComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();
  showModal = false;
  caregiverName: any;
  patientEmail: any;
  patientAddress: any;
  medicalRecord: any;
  outline = true;
  userId: any;
  availability = [
    { value: true, text: 'Avaiable', status: true },
    { value: false, text: 'Not Avaiable', status: false },
  ];
  selectedAvailability = 'Avaiable';
  selectedValue = true;
  openDropdown = false;
  constructor(
    private caregiverApi: CaregiverService,
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

  toggleDropdown(e: any) {
    this.openDropdown = !this.openDropdown;
    e.stopPropagation();
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

  selectedStatus(value: any) {
    this.availability.map((ele) => {
      if (ele['text'] === value['text']) {
        ele['status'] = true;
      } else {
        ele['status'] = false;
      }
    });
    this.selectedAvailability = value['text'];
    this.selectedValue = value['value'];
  }

  // save() {
  //   let requestObj = {
  //     userId: this.userId,
  //     name: this.caregiverName,
  //     availability: this.selectedValue,
  //   };
  //   this.caregiverApi.createCaregiver(requestObj).subscribe((data) => {
  //     setTimeout(() => {
  //       this.closeModalEvent.emit({ cancel: true, error: null });
  //     }, 200);
  //   });
  // }

  ngOnDestroy() {
    $('#add-patient-overlay').remove();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
