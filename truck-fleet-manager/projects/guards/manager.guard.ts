import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppLoginService } from 'projects/app-login/src/lib/services/app-login.service';

export const managerGuard: CanActivateFn = (route, state) => {
  const loginService = inject(AppLoginService)
  const router = inject(Router);

  if (loginService.isLoggedIn() && loginService.getUserRole().includes('manager')) {
    return true; 
  } else {
    router.navigate(['login']);
    return false; 
  }
};
