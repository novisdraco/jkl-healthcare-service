import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePatientModalComponent } from './update-patient-modal.component';

describe('UpdatePatientModalComponent', () => {
  let component: UpdatePatientModalComponent;
  let fixture: ComponentFixture<UpdatePatientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePatientModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatePatientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
