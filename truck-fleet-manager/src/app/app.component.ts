import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { NavService } from '../../projects/common-ui/src/lib/nav/service/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'truck-fleet-manager';

  constructor(public nav: NavService, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Verifica la ruta actual y ajusta la visibilidad de fm-nav
        if (!event.url.includes('/login')) {
          this.nav.show();
        } else {
          this.nav.hide();
        }
      }
    });

  }
}
