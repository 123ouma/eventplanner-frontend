import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['admin@eventplanner.com', [Validators.required, Validators.email]],
      password: ['admin123', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.adminLogin(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.clear();

        localStorage.setItem('admin_user', JSON.stringify(res.user));
        localStorage.setItem('role', 'admin');

        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err?.error?.message || 'Admin login failed';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}