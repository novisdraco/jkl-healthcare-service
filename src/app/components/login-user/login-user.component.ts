import { Component, inject, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
})
export class LoginUserComponent implements OnInit {
  credentials = { email: '', password: '' };
  showPassword = false;
  userEmail: any;
  userPassword: any;
  isError = false;
  formdata: any;

  login_data = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required),
  });

  private router = inject(Router);
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.isError = false;
  }
  toggle() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.credentials = { email: this.userEmail, password: this.userPassword };
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        sessionStorage.setItem('email', this.credentials['email']);
        localStorage.setItem('token', response.token); // Save token in local storage
        this.router.navigate(['main']); // Navigate to the dashboard or home page
      },
      error: (err) => {
        console.error(err);
        this.isError = true;
      },
    });
  }

  navigateTo() {
    this.router.navigate(['register']);
  }
}
