import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (sessionStorage.getItem('email') && typeof sessionStorage !== undefined) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};