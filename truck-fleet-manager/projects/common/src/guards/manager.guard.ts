import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { UserRoles } from '../constants';
import { AppLoginService } from '../services';

export const managerGuard: CanActivateFn = (route, state) => {
  const loginService = inject(AppLoginService)
  let roles: UserRoles[] = loginService.getUserRole();

  return roles.some(role => role === UserRoles.Manager)
};
