import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

import * as CryptoJS from 'crypto-js';
import { AppLoginService, FormsValidationMessages, UserRoles } from 'projects/common/src';


@Component({
  selector: 'fm-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  constructor(private router: Router, private loginService: AppLoginService, private formBuilder: FormBuilder) { }

  validUserRoles = [UserRoles.Admin, UserRoles.Manager, UserRoles.Operative];

  helper = new JwtHelperService();

  form!: FormGroup;
  passwordVisible = false;

  loading = false;

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  handleLogin(): void {
    this.loading = true;
    const encryptedPassword = CryptoJS.SHA256(this.form.controls['password'].value).toString();

    this.loginService.authenticateUser(this.form.controls['email'].value, encryptedPassword)
      .subscribe((res: any) => {
        const decodedToken = this.helper.decodeToken(res.token);

        this.loginService.getUser(decodedToken.id).subscribe((user: any) => {
          this.loginService.setUser(user,res.token);
        });

        this.loading = false;        
      })
      .add(() => {
        this.loading = false;
        this.validateRol();
      });
  }

  private validateRol(): void {
    let roles: UserRoles[] = this.loginService.getUserRole();

    if (roles.some(role => this.validUserRoles.includes(role))) {
      this.router.navigate([]);
    } else {
      this.loginService.logout();
    }
  }

  getEmailErrorMessage() {
    if (this.form.controls['email'].hasError('required')) {
      return FormsValidationMessages.Required;
    }

    return this.form.controls['email'].hasError('email') ? FormsValidationMessages.InvlaidEmail : '';
  }

  getPasswordErrorMessage() {
    return FormsValidationMessages.Required;
  }
}
