import { CanActivateFn, Router } from '@angular/router';
import { AppLoginService } from '../app-login/src/lib/services/app-login.service';
import { inject } from '@angular/core';


export const adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(AppLoginService)
  const router = inject(Router);

  if (loginService.isLoggedIn() && loginService.getUserRole().includes('admin')) {
    return true; 
  } else {
    router.navigate(['login']);
    return false; 
  }
};
