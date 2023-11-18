import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../../projects/crud-drivers/src/lib/services/driver.service';

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalDriversCount: number = 0;

  constructor(private driverService: DriverService) { }

  ngOnInit(): void {
    this.getDriversCount();
  }

  getDriversCount() {
    this.driverService.getTotalDriversCount().subscribe(
      (response: any) => {
        this.totalDriversCount = response.count; 
      }
    );
  }
}

