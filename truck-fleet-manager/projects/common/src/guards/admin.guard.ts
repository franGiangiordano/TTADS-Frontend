import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AppLoginService } from '../services/app-login.service';
import { UserRoles } from '../constants';


export const adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(AppLoginService);

  let roles: UserRoles[] = loginService.getUserRole();

  return roles.some(role => role === UserRoles.Admin)
};
