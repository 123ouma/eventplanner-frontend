import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);

  const admin = localStorage.getItem('admin_user');
  const role = localStorage.getItem('role');

  if (admin && role === 'admin') {
    return true;
  }

  router.navigate(['/admin/login']);
  return false;
};