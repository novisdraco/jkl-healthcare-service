import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Route } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  private router = inject(Router);
  user: any = {};
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser();
  }

  currentUser() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      if (this.user['role'] === 1) {
        this.router.navigate(['/main/patient']);
      } else {
        this.router.navigate(['/main/caregiver']);
      }
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
