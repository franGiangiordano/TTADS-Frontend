import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppLoginService } from 'projects/app-login/src/lib/services/app-login.service';
import { UserRoles } from 'projects/app-login/src/lib/models/user.roles.enum';

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
