import { CanActivateFn, Router } from '@angular/router';
import { AppLoginService } from '../app-login/src/lib/services/app-login.service';
import { inject } from '@angular/core';
import { UserRoles } from 'projects/app-login/src/lib/models/user.roles.enum';


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
