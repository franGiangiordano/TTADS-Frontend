import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserRoles } from '../constants';
import { AppLoginService } from '../services';

export const managerGuard: CanActivateFn = (route, state) => {
  const loginService = inject(AppLoginService)
  const router = inject(Router);
  let roles: UserRoles[] = loginService.getUserRole();

  if (loginService.isLoggedIn() && roles.some(role => role === UserRoles.Manager)) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
