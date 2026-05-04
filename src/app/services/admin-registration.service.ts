import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminRegistrationService {
  private apiUrl = 'http://127.0.0.1:8000/api/admin/registrations';

  constructor(private http: HttpClient) {}

  getRegistrations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteRegistration(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}