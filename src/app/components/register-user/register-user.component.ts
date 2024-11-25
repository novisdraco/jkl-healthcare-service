import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroupDirective,
  FormGroup,
  NgForm,
  Validators,
  FormsModule,
} from '@angular/forms';
import { FlButtonComponent } from '../core-components/fl-button/fl-button.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, FlButtonComponent],
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent {
  firstName: any;
  lastName: any;
  userEmail: any;
  password: any;
  confirmPassword: any;
  roleId: any;
  roles = [
    {
      roleId: 1,
      role: 'Patient',
      status: false,
    },
    {
      roleId: 2,
      role: 'Caregiver',
      status: false,
    },
  ];
  user = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role: null,
  };
  showPassword = false;
  showConfirmPassword = false;
  openRole = false;
  selectRole: any;
  selectRoleId: any;

  constructor(private authService: AuthService, private router: Router) {}

  toggle() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirm() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  toggleRole(e: any) {
    this.openRole = !this.openRole;
    e.stopPropagation();
  }

  selectedRole(role: any) {
    console.log('role', role);
    this.roles.map((ele) => {
      if (ele['roleId'] === role['roleId']) {
        ele['status'] = true;
      } else {
        ele['status'] = false;
      }
    });
    this.selectRole = role['role'];
    this.selectRoleId = role['roleId'];
  }

  navigateTo() {
    this.router.navigate(['login']);
  }

  register() {
    this.user = {
      email: this.userEmail,
      password: this.confirmPassword,
      first_name: this.firstName,
      last_name: this.lastName,
      role: this.selectRoleId,
    };
    this.authService.register(this.user).subscribe({
      next: (response) => {
        // alert(response.msg);
        this.router.navigate(['login']); // Redirect to login after successful registration
      },
      error: (err) => {
        console.error(err);
        alert(err.error.msg || 'Registration failed');
      },
    });
  }
}
