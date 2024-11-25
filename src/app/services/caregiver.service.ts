// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CaregiverService {
  private baseUrl = environment.apiUrl; // Adjust based on your backend URL

  constructor(private http: HttpClient) {}

  // createCaregiver(data: any): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: `${localStorage.getItem('token')}`,
  //     }),
  //   };
  //   return this.http.post(
  //     `${this.baseUrl}/caregiver/createCaregiver`,
  //     data,
  //     httpOptions
  //   );
  // }

  updateCaregiver(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    };
    return this.http.put(
      `${this.baseUrl}/caregiver/updateCaregiver`,
      data,
      httpOptions
    );
  }

  assignCaregiver(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    };
    return this.http.post(
      `${this.baseUrl}/caregiver/assignCaregiver`,
      data,
      httpOptions
    );
  }

  unassignCaregiver(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
      body: { assignmentId: data['assignmentId'] },
    };
    return this.http.delete(
      `${this.baseUrl}/caregiver/unassignCaregiver`,
      httpOptions
    );
  }

  getAllCaregiver(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    };
    return this.http.get(
      `${this.baseUrl}/caregiver/getAllCaregiver`,
      httpOptions
    );
  }

  getUnassignedList(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    };
    return this.http.get(
      `${this.baseUrl}/caregiver/getUnassignedList`,
      httpOptions
    );
  }

  getAssignedList(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    };
    return this.http.get(
      `${this.baseUrl}/caregiver/getAssignedList`,
      httpOptions
    );
  }
}
