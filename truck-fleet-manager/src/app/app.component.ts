import { Component } from '@angular/core';
import { NavService } from 'projects/common-ui/src/lib/nav/service/nav.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'truck-fleet-manager';

  constructor(public nav: NavService, private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        if (!event.url.includes('/login')) {
          this.nav.show();
        } else {
          this.nav.hide();
        }
      });
  }
}
