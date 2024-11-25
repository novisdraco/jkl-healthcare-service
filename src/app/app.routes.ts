import { Routes } from '@angular/router';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './guards/auth.guard';
import { PatientComponent } from './components/patient/patient.component';
import { CaregiverComponent } from './components/caregiver/caregiver.component';
import { CaregiverAppointmentComponent } from './components/caregiver-appointment/caregiver-appointment.component';
import { AssignCaregiverComponent } from './components/assign-caregiver/assign-caregiver.component';
import { UnassignCaregiverComponent } from './components/unassign-caregiver/unassign-caregiver.component';
import { CaregiverUpdateAppointmentComponent } from './components/caregiver-update-appointment/caregiver-update-appointment.component';

export const routes: Routes = [
  { path: 'login', component: LoginUserComponent },
  { path: 'register', component: RegisterUserComponent },
  {
    path: 'main',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'patient',
        component: PatientComponent,
      },
      {
        path: 'caregiver',
        component: CaregiverComponent,
      },
      {
        path: 'caregiver-assign',
        component: AssignCaregiverComponent,
      },
      {
        path: 'caregiver-unassign',
        component: UnassignCaregiverComponent,
      },
      {
        path: 'caregiver-appointment',
        component: CaregiverAppointmentComponent,
      },
      {
        path: 'caregiver-update-appointment',
        component: CaregiverUpdateAppointmentComponent,
      },
    ],
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
];
