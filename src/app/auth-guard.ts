import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = false; // Replace with actual authentication logic
  const router = inject(Router);

  if (!isAuthenticated) {
    console.log('Access denied. User is not authenticated.');
    router.navigate(['/login']);
    return false;
  }
  return true;
};
