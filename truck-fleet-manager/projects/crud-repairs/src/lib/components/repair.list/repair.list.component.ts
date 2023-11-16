import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { EntityListResponse, NotificationService } from 'projects/common/src';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { RepairService } from '../../services/repair.service';
import { Repair } from '../../models';
import * as moment from 'moment';

@Component({
  selector: 'lib-repair.list',
  templateUrl: './repair.list.component.html',
  styleUrls: ['./repair.list.component.css'],
  providers: [RepairService, NotificationService],
})
export class RepairlistComponent implements OnInit {

  editMode = false;
  formTitle = 'Añadir Reparación';
  rutaVariable: string = 'equipments/repairs';

  pageSize: number = 10;
  pageIndex: number = 1;

  repairsList$ = new Subject<EntityListResponse<Repair>>();

  repairsForm!: FormGroup;

  constructor(private repairService: RepairService, private notificationService: NotificationService,  private router : Router) { }

  ngOnInit(): void {
    this.doSearch();
  }

  doSearch(search?:string): void {
    this.repairService.getRepairs(this.pageIndex, this.pageSize,search)
      .subscribe(response => this.repairsList$.next(response));
  }

  deleteRepair(event: Repair): void {
    this.repairService.deleteRepairs(event)
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
        reparacion: obj.description,
        costo: obj.cost,
        fechaReparacion: moment.utc(obj.createdAt).format('DD/MM/YYYY'),
      };
    });
  }  

  editRepair(event: Repair): void {
    this.router.navigate(['/equipments/repairs/edit/'+ event._id]);    
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
