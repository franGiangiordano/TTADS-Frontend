import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fm-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  constructor(private router: Router) { }

  username!: string;
  password!: string;
  loading = false;

  ngOnInit() {
  }

  handleLogin(): void {
    if (this.username == 'admin' && this.password == 'admin') {
      this.router.navigate([]);
    } else {
      alert('Invalid credentials');
    }
  }
}
