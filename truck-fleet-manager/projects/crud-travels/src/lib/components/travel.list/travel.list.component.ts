import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';

import { EntityListResponse, NotificationService } from 'projects/common/src';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { TravelService } from '../../services/travel.service';
import { Travel } from '../../models';

@Component({
  selector: 'lib-travel.list',
  templateUrl: './travel.list.component.html',
  styleUrls: ['./travel.list.component.css'],
  providers: [TravelService, NotificationService],
})
export class TravelListComponent implements OnInit{
  editMode = false;
  formTitle = 'Añadir Viaje';
  rutaVariable: string = 'equipments/travels';

  pageSize: number = 10;
  pageIndex: number = 1;

  travelsList$ = new Subject<EntityListResponse<Travel>>();

  travelsForm!: FormGroup;

  constructor(private travelService: TravelService, private notificationService: NotificationService,  private router : Router) { }

  ngOnInit(): void {
    this.doSearch();
  }

  doSearch(search?:string): void {
    this.travelService.getTravels(this.pageIndex, this.pageSize,search)
      .subscribe(response => this.travelsList$.next(response));
  }

  deleteTravel(event: Travel): void {
    this.travelService.deleteTravels(event)
      .subscribe(() => {
        this.notificationService.showSnackbar('Elemento eliminado exitosamente', 'success');
        this.doSearch();
      });
  }

  formatResponse(array: any[]): any[]{
    return array.map(obj => {
      return {
        _id: obj._id,
        legajo: obj.equipment.driver.legajo,
        name: obj.equipment.driver.name,
        surname: obj.equipment.driver.surname,
        description: obj.equipment.description,        
        batea: obj.equipment.batea.patent,
        trailer: obj.equipment.trailer.patent,
        localIni: obj.starting_location,
        localFin: obj.final_location,
        fechaIni: moment.utc(obj.departure_date).format('DD/MM/YYYY'),
        fechaFin: moment.utc(obj.arrival_date).format('DD/MM/YYYY'),
      };
    });
  }  

  editTravel(event: Travel): void {
    this.router.navigate(['/equipments/travels/edit/'+ event._id]);    
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
