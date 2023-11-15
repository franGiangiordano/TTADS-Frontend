import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AppLoginService } from '../services';
import { UserRoles } from '../constants';

export const operativeGuard: CanActivateFn = (route, state) => {
  const loginService = inject(AppLoginService);
  let roles: UserRoles[] = loginService.getUserRole();

  return roles.some(role => role === UserRoles.Operative)
};
