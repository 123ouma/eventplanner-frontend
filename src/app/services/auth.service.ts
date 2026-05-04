import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  private userSubject = new BehaviorSubject<any>(this.getCurrentUser());
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        this.userSubject.next(response.user);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('user');
        this.userSubject.next(null);
      })
    );
  }

  updateProfile(id: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/profile/${id}`, formData).pipe(
      tap((response: any) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        this.userSubject.next(response.user);
      })
    );
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }
  adminLogin(data: any) {
  return this.http.post('http://127.0.0.1:8000/api/admin/login', data);
}
logoutAdmin() {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_user');
}

}