// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl; // Adjust based on your backend URL

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  getCurrentUser(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.get(`${this.baseUrl}/users/currentUser`, { headers });
  }

  // currentUser(userId: any): Observable<any> {
  //   let url = `${this.baseUrl}/users/currentUser`
  //   let httpOptions = {
  //     HttpHeaders: {
  //       "Authorization":
  //     }
  //   }
  //   return this.http.get(url,);
  // }
}
