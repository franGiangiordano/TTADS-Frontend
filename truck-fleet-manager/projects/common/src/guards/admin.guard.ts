import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AppLoginService } from '../services/app-login.service';
import { UserRoles } from '../constants';


export const adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(AppLoginService)
  const router = inject(Router);
  let roles: UserRoles[] = loginService.getUserRole();

  if (loginService.isLoggedIn() && roles.some(role => role === UserRoles.Admin)) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
