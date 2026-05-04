import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://127.0.0.1:8000/api/reservations';

  constructor(private http: HttpClient) {}

  reserve(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
  getMyRegistrations(userId: number) {
  return this.http.get<any[]>(`http://127.0.0.1:8000/api/my-registrations/${userId}`);
}
cancelReservation(id: number) {
  return this.http.delete<any>(`http://127.0.0.1:8000/api/reservations/${id}`);
}
}