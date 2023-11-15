import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppLoginService } from '../../../../../common/src/services/app-login.service';

@Component({
  selector: 'fm-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  expandEquipments: boolean = false;
  roles: string[] = [];

  menuItems!: any[];

  constructor(private router: Router, private loginService: AppLoginService) { }

  ngOnInit(): void {
    this.roles = this.loginService.getUserRole();
    this.menuItems = [
      {
        routerLink: '/dashboard',
        iconType: 'dashboard',
        innerText: 'Dashboard'
      }, {
        routerLink: '/bateas',
        iconType: 'local_shipping',
        innerText: 'Bateas'
      }, {
        routerLink: '/drivers',
        iconType: 'directions_car',
        innerText: 'Choferes'
      }, {
        routerLink: '/trailers',
        iconType: 'local_shipping',
        innerText: 'Acoplados'
      }, {
        iconType: 'engineering',
        isOpen: () => this.expandEquipments,
        innerText: 'Equipos',
        onClick: () => this.toggleEquipments(),
        innerItems: [{
          routerLink: '/equipments',
          iconType: 'list',
          innerText: 'Listado'
        }, {
          routerLink: '/equipments/travels',
          iconType: 'card_travel',
          innerText: 'Viajes'
        }, {
          routerLink: '/equipments/repairs',
          iconType: 'build',
          innerText: 'Reparaciones'
        }]
      }, {
        routerLink: '/users',
        iconType: 'people',
        innerText: 'Usuarios',
        canDisplay: this.roles.includes('admin')
      }, {
        routerLink: '/my-account',
        iconType: 'account_circle',
        innerText: 'Mi cuenta',
      }, {
        iconType: 'exit_to_app',
        innerText: 'Salir',
        onClick: () => this.logout()
      }
    ]
  }

  toggleEquipments(): void {
    this.expandEquipments = !this.expandEquipments;
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  onClick(): void {
    this.router.navigate(['']);
  }
}
