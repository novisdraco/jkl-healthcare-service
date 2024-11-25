import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCaregiverModalComponent } from './add-caregiver-modal.component';

describe('AddCaregiverModalComponent', () => {
  let component: AddCaregiverModalComponent;
  let fixture: ComponentFixture<AddCaregiverModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCaregiverModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCaregiverModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
