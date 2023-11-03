import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AppLoginService } from '../services';
import { UserRoles } from '../constants';

export const operativeGuard: CanActivateFn = (route, state) => {
  const loginService = inject(AppLoginService)
  const router = inject(Router);
  let roles: UserRoles[] = loginService.getUserRole();

  if (loginService.isLoggedIn() && roles.some(role => role === UserRoles.Operative)) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
