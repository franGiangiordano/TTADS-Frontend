import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatChipListboxChange } from '@angular/material/chips';

import * as moment from 'moment';
import { Subject, forkJoin } from 'rxjs';

import { TravelService } from '../../services/travel.service';
import { Travel } from '../../models';
import { DriverService } from '../../../../../../projects/crud-drivers/src/lib/services/driver.service';
import { TrailerService } from '../../../../../../projects/crud-trailers/src/lib/services/trailer.service';
import { BateaService } from '../../../../../../projects/crud-bateas/src/lib/services/batea.service';
import { EntityListResponse, NotificationService } from '../../../../../../projects/common/src';

export class FilterOptionsTravel {
  driver?: string[];
  batea?: string[];
  trailer?: string[];
}

@Component({
  selector: 'lib-travel.list',
  templateUrl: './travel.list.component.html',
  styleUrls: ['./travel.list.component.css'],
  providers: [TravelService, DriverService, TrailerService, BateaService, NotificationService],
})
export class TravelListComponent implements OnInit {
  editMode = false;
  formTitle = 'Añadir Viaje';
  rutaVariable: string = 'equipments/travels';

  pageSize: number = 10;
  pageIndex: number = 1;

  travelsList$ = new Subject<EntityListResponse<Travel>>();

  travelsForm!: FormGroup;

  loadingFilterData!: boolean;
  TrailerList!: string[];
  BateaList!: string[];
  DriverList!: string[];
  selectedFilteringOptions = new FilterOptionsTravel();

  constructor(private travelService: TravelService,
    private trailerService: TrailerService,
    private bateaService: BateaService,
    private driverService: DriverService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit(): void {
    this.doSearch();
    this.loadFilterData();
  }

  doSearch(search?: string): void {
    this.travelService.searchTravels(this.pageIndex, this.pageSize, search, this.selectedFilteringOptions)
      .subscribe(response => this.travelsList$.next(response));
  }

  updateDriverFilteringOptions($event: MatChipListboxChange) {
    this.selectedFilteringOptions.driver = $event.value;
    this.doSearch();
  }

  updateTrailerFilteringOptions($event: MatChipListboxChange) {
    this.selectedFilteringOptions.trailer = $event.value;
    this.doSearch();
  }

  updateBateaFilteringOptions($event: MatChipListboxChange) {
    this.selectedFilteringOptions.batea = $event.value;
    this.doSearch();
  }

  deleteTravel(event: Travel): void {
    this.travelService.deleteTravels(event).subscribe(() => {
      this.notificationService.showSnackbar(
        'Elemento eliminado exitosamente',
        'success'
      );
      this.doSearch();
    });
  }

  loadFilterData() {
    this.loadingFilterData = true;
    forkJoin([this.trailerService.getTrailers(), this.bateaService.getBateas(), this.driverService.getDrivers()])
      .subscribe(([trailers, bateas, drivers]) => {
        this.TrailerList = trailers.results.map(trailer =>
          trailer.patent
        );
        this.BateaList = bateas.results.map(batea =>
          batea.patent
        );
        this.DriverList = drivers.results.map(driver =>
          driver.legajo
        );
      }).add(() => this.loadingFilterData = false)
  }

  formatResponse(array: any[]): any[] {
    return array.map((obj) => {
      return {
        _id: obj._id,
        descEquipo: obj.equipment.description,
        legajo: obj.equipment.driver.legajo,
        name: obj.equipment.driver.name,
        surname: obj.equipment.driver.surname,
        batea: obj.equipment.batea.patent,
        trailer: obj.equipment.trailer.patent,
        localIni: obj.starting_location,
        localFin: obj.final_location,
        fechaIni: moment.utc(obj.departure_date).format('DD/MM/YYYY'),
        fechaFin: moment.utc(obj.arrival_date).format('DD/MM/YYYY'),
        destination_description: obj.destination_description
          ? obj.destination_description
          : '',
      };
    });
  }

  editTravel(event: Travel): void {
    this.router.navigate(['/equipments/travels/edit/' + event._id]);
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
