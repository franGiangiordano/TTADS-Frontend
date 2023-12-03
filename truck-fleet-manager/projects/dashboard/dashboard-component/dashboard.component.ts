import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../../projects/crud-drivers/src/lib/services/driver.service';
import { Driver } from '../../../projects/crud-drivers/src/lib/models/driver.model';
import { EntityListResponse } from 'projects/common/src';

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalDriversCount: number = 0;

  constructor(private driverService: DriverService) { }

  ngOnInit(): void {
    this.countDrivers();
  }

  countDrivers(): void {
    this.driverService.getDrivers() 
      .subscribe((response: EntityListResponse<Driver>) => {
        this.totalDriversCount = response.results.length;
      });
  }
}

