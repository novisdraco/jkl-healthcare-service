import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { FlButtonComponent } from '../../core-components/fl-button/fl-button.component';
import { PatientService } from '../../../services/patient.service';
import { AuthService } from '../../../services/auth.service';
import $ from 'jquery';
import moment from 'moment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-patient-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, FlButtonComponent],
  templateUrl: './delete-patient-modal.component.html',
  styleUrl: './delete-patient-modal.component.css',
})
export class DeletePatientModalComponent {
  @Input() data: any = {};
  @Input() styles: any = {};
  @Input() confirmBtnText = 'Yes, Delete';
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();
  showModal = false;
  onGoingRequest = false;

  constructor(
    private patientApi: PatientService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    $('body').append($('<div></div>', { id: 'add-patient-overlay' }));
    $('#add-patient-overlay').append($('#add-patient-modal-container'));
    setTimeout(() => {
      this.showModal = true;
    }, 10);
  }

  closeModal() {
    this.showModal = false;
    setTimeout(() => {
      this.closeModalEvent.emit({ cancel: true });
    }, 200);
  }

  deletePatient() {
    let requestObj = {
      id: this.data['patient_id'],
    };
    this.patientApi.deletePatient(requestObj).subscribe((data) => {
      setTimeout(() => {
        this.closeModalEvent.emit({ cancel: true });
      }, 200);
    });
  }

  ngOnDestroy() {
    $('#add-patient-overlay').remove();
  }
}
