// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private baseUrl = environment.apiUrl; // Adjust based on your backend URL

  constructor(private http: HttpClient) {}

  createPatient(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    };
    return this.http.post(
      `${this.baseUrl}/patient/createPatient`,
      data,
      httpOptions
    );
  }

  updatePatient(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    };
    return this.http.put(
      `${this.baseUrl}/patient/updatePatient`,
      data,
      httpOptions
    );
  }

  deletePatient(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
      body: { id: data['id'] },
    };
    return this.http.delete(
      `${this.baseUrl}/patient/deletePatient`,
      httpOptions
    );
  }

  getPatientDetails(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    };
    return this.http.get(
      `${this.baseUrl}/patient/getPatientDetails`,
      httpOptions
    );
  }
}
