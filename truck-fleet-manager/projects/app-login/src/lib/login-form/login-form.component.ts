import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppLoginService } from '../services/app-login.service';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../../../../../src/app/utils/notification.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'fm-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  constructor(private router: Router,private loginService: AppLoginService,private notificationService: NotificationService) { }

  helper = new JwtHelperService();

  email!: string;
  password!: string;
  loading = false;

  ngOnInit() {
  }

  handleLogin(): void {
    this.loading = true;
    const encryptedPassword = CryptoJS.SHA256(this.password).toString();
    this.loginService.authenticateUser(this.email,encryptedPassword).pipe(     
      catchError((error: string) => {
        this.notificationService.showSnackbar(error, 'error');
        this.loading = false
        return [];
      })
    ).subscribe((res:any) => {
      this.loginService.loginUser(res.token)
      const decodedToken = this.helper.decodeToken(res.token);
      
      this.loginService.getUser(decodedToken.id).subscribe((user:any) => {
        this.loginService.setUser(user);       
      });
      this.loading = false;
      this.validateRol()
    });
  }

  validateRol():void {
    let roles: string[] = this.loginService.getUserRole()

    if(roles.includes('admin')){
      this.router.navigate([]);
    }else if(roles.includes('manager')){
      this.router.navigate([]);
    }else if(roles.includes('operative')){
      this.router.navigate([]);
    }else{
      this.loginService.logout();
    }
    
  }

}
