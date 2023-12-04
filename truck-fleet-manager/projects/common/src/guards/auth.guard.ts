import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AppLoginService } from '../services/app-login.service';


export const authGuard: CanActivateFn = () => {
    const loginService = inject(AppLoginService);
    const router = inject(Router);
    const isLoggedIn = loginService.isLoggedIn();
    if (!isLoggedIn) {
        router.navigate(['login']);
    }

    return isLoggedIn
};
