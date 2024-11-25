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
import { CaregiverService } from '../../../services/caregiver.service';

@Component({
  selector: 'app-update-caregiver-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, FlButtonComponent],
  templateUrl: './update-caregiver-modal.component.html',
  styleUrl: './update-caregiver-modal.component.css',
})
export class UpdateCaregiverModalComponent {
  private destroy$: Subject<void> = new Subject<void>();
  @Input() data: any = {};
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();
  showModal = false;
  caregiverName: any;
  patientEmail: any;
  patientAddress: any;
  medicalRecord: any;
  outline = true;
  userId: any;
  availability = [
    { id: 1, value: true, text: 'Avaiable', status: true },
    { id: 0, value: false, text: 'Not Avaiable', status: false },
  ];
  selectedAvailability = 'Avaiable';
  selectedValue = true;
  openDropdown = false;
  constructor(
    private caregiverApi: CaregiverService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    console.log('data', this.data);
    this.caregiverName = this.data['name'];
    this.availability.map((ele) => {
      if (this.data['availability'] === ele['id']) {
        ele['status'] = true;
        this.selectedAvailability = ele['text'];
        this.selectedValue = ele['value'];
      } else {
        ele['status'] = false;
      }
    });
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

  save() {
    let requestObj = {
      caregiverId: this.data['caregiver_id'],
      name: this.caregiverName,
      availability: this.selectedValue,
    };
    this.caregiverApi.updateCaregiver(requestObj).subscribe((data) => {
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
