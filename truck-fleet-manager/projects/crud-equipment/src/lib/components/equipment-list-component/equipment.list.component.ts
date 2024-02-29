import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { EntityListResponse, NotificationService } from 'projects/common/src';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { EquipmentService } from '../../services/equipment.service';
import { Equipment } from '../../models';

@Component({
  selector: 'equipment-list-component',
  templateUrl: './equipment.list.component.html',
  styleUrls: ['./equipment.list.component.css'],
  providers: [EquipmentService, NotificationService],
})
export class EquipmentListComponent implements OnInit{
  editMode = false;

  pageSize: number = 10;
  pageIndex: number = 1;
  rutaVariable: string = 'equipments';

  equipmentList$ = new Subject<EntityListResponse<Equipment>>();

  constructor(private equipmentService: EquipmentService, private notificationService: NotificationService,  private router : Router) { }

  ngOnInit(): void {    
    this.doSearch();
  }

  doSearch(search?:string): void {
    this.equipmentService.getEquipments(this.pageIndex, this.pageSize,search)
      .subscribe(response => this.equipmentList$.next(response));
  }

  formatResponse(array: any[]): any[]{
    return array.map(obj => {
      return {
        _id: obj._id,
        description: obj.description,
        legajo: obj.driver.legajo,
        name: obj.driver.name,
        surname: obj.driver.surname,
        batea: obj.batea.patent,
        trailer: obj.trailer.patent,
        type: obj.trailer.type
      };
    });
  }  

  deleteEquipment(event: Equipment): void {
    this.equipmentService.deleteEquipments(event)
      .subscribe(() => {
        this.notificationService.showSnackbar('Elemento eliminado exitosamente', 'success');
        this.doSearch();
      });
  }

  editEquipment(event: Equipment): void {
    this.router.navigate(['/equipments/edit/'+ event._id]);    
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
