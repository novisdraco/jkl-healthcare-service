import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCaregiverModalComponent } from './update-caregiver-modal.component';

describe('UpdateCaregiverModalComponent', () => {
  let component: UpdateCaregiverModalComponent;
  let fixture: ComponentFixture<UpdateCaregiverModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCaregiverModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCaregiverModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
