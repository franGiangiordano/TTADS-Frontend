import { Component } from '@angular/core';
import { NavService } from '../service/nav.service';
import { Router } from '@angular/router';
import { AppLoginService } from '../../../../../common/src/services/app-login.service';

@Component({
  selector: 'fm-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
 
  constructor(private nav: NavService, private router: Router, private loginService:AppLoginService) {}

  expandEquipments: boolean = false;

  toggleEquipments(): void {
    this.expandEquipments = !this.expandEquipments;
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['login']);
  }
}
