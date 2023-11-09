import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { EntityListResponse, NotificationService } from 'projects/common/src';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { DriverService } from '../../services/driver.service';
import { Driver } from '../../models/driver.model';

@Component({
  selector: 'driver.list',
  templateUrl: './driver.list.component.html',
  styleUrls: ['./driver.list.component.scss'],
  providers: [DriverService, NotificationService],
})
export class DriverListComponent implements OnInit {
  editMode = false;
  formTitle = 'Añadir Chofer';
  rutaVariable: string = 'drivers';

  pageSize: number = 10;
  pageIndex: number = 1;

  driversList$ = new Subject<EntityListResponse<Driver>>();

  driverForm!: FormGroup;

  constructor(public driverService:   DriverService, private notificationService: NotificationService,  public router : Router) { }

  ngOnInit(): void {
    this.doSearch();
  }

  doSearch(search?:string): void {
    this.driverService.getDrivers(this.pageIndex, this.pageSize,search)
      .subscribe(response => this.driversList$.next(response));
  }

  deleteDriver(event: Driver): void {
    this.driverService.deleteDrivers(event)
      .subscribe(() => {
        this.notificationService.showSnackbar('Elemento eliminado exitosamente', 'success');
        this.doSearch();
      });
  }

  editDriver(event: Driver): void {
    this.router.navigate(['/drivers/edit/'+ event._id]);    
  }

  onPageChange(event: PageEvent): void {
    if (this.pageSize !== event.pageSize) {
      this.pageSize = event.pageSize;
      this.pageIndex = 1;
    } else {
      this.pageIndex = event.pageIndex + 1;
    }
    this.doSearch();
  }
}
