import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignCaregiverComponent } from './unassign-caregiver.component';

describe('UnassignCaregiverComponent', () => {
  let component: UnassignCaregiverComponent;
  let fixture: ComponentFixture<UnassignCaregiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnassignCaregiverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnassignCaregiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
