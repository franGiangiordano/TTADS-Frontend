import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { EntityListResponse, NotificationService } from 'projects/common/src';
import { AppLoginService } from '../../../../../common/src/services/app-login.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { RepairService } from '../../services/repair.service';
import { Repair } from '../../models';
import * as moment from 'moment';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

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

  roles: string[] = [];

  pageSize: number = 10;
  pageIndex: number = 1;

  repairsList$ = new Subject<EntityListResponse<Repair>>();

  repairsForm!: FormGroup;

  constructor(
    private repairService: RepairService,
    private notificationService: NotificationService,
    private loginService: AppLoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roles = this.loginService.getUserRole();
    this.doSearch();
  }

  doSearch(search?: string): void {
    this.repairService
      .getRepairs(this.pageIndex, this.pageSize, search)
      .subscribe((response) => this.repairsList$.next(response));
  }

  deleteRepair(event: Repair): void {
    this.repairService.deleteRepairs(event).subscribe(() => {
      this.notificationService.showSnackbar(
        'Elemento eliminado exitosamente',
        'success'
      );
      this.doSearch();
    });
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
        reparacion: obj.description,
        costo: obj.cost,
        km: obj.km,
        fechaReparacion: moment.utc(obj.createdAt).format('DD/MM/YYYY'),
      };
    });
  }

  editRepair(event: Repair): void {
    this.router.navigate(['/equipments/repairs/edit/' + event._id]);
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

  createPdf() {
    this.repairService
      .getRepairs(this.pageIndex, this.pageSize)
      .subscribe((response) => {
        const repairsData = this.formatResponse(response.results);

        const pdfDefinition: any = {
          content: [
            { text: 'Listado Reparaciones', style: 'header' },

            {
              table: {
                body: [
                  [
                    'Equipo',
                    'Legajo',
                    'Nombre',
                    'Apellido',
                    'Batea',
                    'Trailer',
                    'Reparación',
                    'Costo',
                    'KM',
                    'Fecha Reparación',
                  ],
                  ...repairsData.map((repair) => [
                    repair.descEquipo || '',
                    repair.legajo || '',
                    repair.name || '',
                    repair.surname || '',
                    repair.batea || '',
                    repair.trailer || '',
                    repair.reparacion || '',
                    repair.costo || '',
                    repair.km !== undefined ? repair.km : '',
                    repair.fechaReparacion || '',
                  ]),
                ],
              },
              margin: [0, 10, 0, 0],
            },
          ],
          pageMargins: [10, 10, 10, 10],
          styles: {
            header: {
              fontSize: 15,
              bold: true,
              margin: [0, 0, 0, 10],
            },
          },
        };
        const pdf = pdfMake.createPdf(pdfDefinition);
        pdf.open();
      });
  }
}
