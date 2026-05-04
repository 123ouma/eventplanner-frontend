import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    const data = {
      email: this.email,
      password: this.password
    };

    this.authService.login(data).subscribe({
      next: (res: any) => {
        localStorage.clear();

        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('role', res.user.role);

        if (res.user.role === 'admin') {
          localStorage.setItem('admin_user', JSON.stringify(res.user));
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/events']);
        }
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'Email ou mot de passe incorrect';
      }
    });
  }
}