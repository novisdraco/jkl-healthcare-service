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
import { PatientService } from '../../../services/patient.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-add-patient-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, FlButtonComponent],
  templateUrl: './add-patient-modal.component.html',
  styleUrl: './add-patient-modal.component.css',
})
export class AddPatientModalComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
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
    };
    this.patientApi.createPatient(requestObj).subscribe((data) => {
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
