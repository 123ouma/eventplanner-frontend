import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = null;
  selectedFile: File | null = null;
  previewUrl: string = 'assets/avatar-default.png';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || 'null');

    if (this.user?.profile_image) {
      this.previewUrl = 'http://127.0.0.1:8000/storage/' + this.user.profile_image;
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

saveProfile(): void {
  this.successMessage = '';
  this.errorMessage = '';

  const formData = new FormData();
  formData.append('name', this.user.name);
  formData.append('email', this.user.email);

  if (this.selectedFile) {
    formData.append('profile_image', this.selectedFile);
  }

  this.authService.updateProfile(this.user.id, formData).subscribe({
    next: (res: any) => {
      this.successMessage = res.message;
      this.user = res.user;

      if (res.user.profile_image) {
        this.previewUrl = 'http://127.0.0.1:8000/storage/' + res.user.profile_image;
      }
    },
    error: (err) => {
      console.log(err);

      if (err.error?.message) {
        this.errorMessage = err.error.message;
      } else {
        this.errorMessage = 'Erreur lors de la mise à jour';
      }
    }
  });
}
}