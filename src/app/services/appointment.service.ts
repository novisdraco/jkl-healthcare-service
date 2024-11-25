// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private baseUrl = environment.apiUrl; // Adjust based on your backend URL

  constructor(private http: HttpClient) {}

  scheduleAppointment(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    };
    return this.http.post(
      `${this.baseUrl}/appointment/scheduleAppointment`,
      data,
      httpOptions
    );
  }

  updateScheduleAppointment(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    };
    return this.http.put(
      `${this.baseUrl}/appointment/updateScheduleAppointment`,
      data,
      httpOptions
    );
  }

  getAllAppointment(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    };
    return this.http.get(
      `${this.baseUrl}/appointment/getAllAppointment`,
      httpOptions
    );
  }
}
