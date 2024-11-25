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
import { Subject } from 'rxjs';
import { FlButtonComponent } from '../../core-components/fl-button/fl-button.component';
import { PatientService } from '../../../services/patient.service';
import { AuthService } from '../../../services/auth.service';
import $ from 'jquery';
import moment from 'moment';

// declare var moment: any;

@Component({
  selector: 'app-update-patient-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, FlButtonComponent],
  templateUrl: './update-patient-modal.component.html',
  styleUrl: './update-patient-modal.component.css',
})
export class UpdatePatientModalComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  @Input() data: any = {};
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();
  showModal = false;
  patientName: any;
  patientEmail: any;
  patientAddress: any;
  medicalRecord: any;
  outline = true;
  userId: any;

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
    this.patientName = this.data['name'];
    this.patientEmail = this.data['email'];
    this.patientAddress = this.data['address'];
    this.medicalRecord = this.data['medical_record'];
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
    let requestObj = {
      userId: this.userId,
      name: this.patientName,
      email: this.patientEmail,
      address: this.patientAddress,
      medicalRecord: this.medicalRecord,
      patientId: this.data['patient_id'],
      updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    };
    this.patientApi.updatePatient(requestObj).subscribe((data) => {
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
