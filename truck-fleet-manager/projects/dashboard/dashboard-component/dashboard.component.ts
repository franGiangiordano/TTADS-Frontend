import { Component, OnInit, inject } from '@angular/core';

import { forkJoin } from 'rxjs';

import { DriverService } from '../../../projects/crud-drivers/src/lib/services/driver.service';
import { BateaService } from '../../../projects/crud-bateas/src/lib/services/batea.service';
import { TrailerService } from '../../../projects/crud-trailers/src/lib/services/trailer.service';
import { TravelService } from '../../../projects/crud-travels/src/lib/services/travel.service';
import { EquipmentService } from '../../../projects/crud-equipment/src/lib/services/equipment.service';
import { RepairService } from '../../../projects/crud-repairs/src/lib/services/repair.service';

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cardInfo!: any[];

  driverService = inject(DriverService);
  bateaService = inject(BateaService);
  trailerService = inject(TrailerService);
  travelService = inject(TravelService);
  equipmentService = inject(EquipmentService);
  repairService = inject(RepairService);

  ngOnInit(): void {
    this.getCounts();
    this.cardInfo = [
      {
        title: 'Choferes',
        icon: 'fa-id-card'
      },
      {
        title: 'Bateas',
        icon: 'fa-truck'
      },
      {
        title: 'Trailers',
        icon: 'fa-truck'
      },
      {
        title: 'Viajes',
        icon: 'fa-route'
      },
      {
        title: 'Reparaciones',
        icon: 'fa-gears'
      },
      {
        title: 'Equipos',
        icon: 'fa-users-gear'
      }
    ]
  }

  getCounts(): void {
    forkJoin([
      this.driverService.getDrivers(),
      this.bateaService.getBateas(),
      this.trailerService.getTrailers(),
      this.travelService.getTravels(),
      this.repairService.getRepairs(),
      this.equipmentService.getEquipments()
    ]).subscribe((responses: any) => {
      for (let i = 0; i < responses.length; i++) {
        this.cardInfo[i].count = responses[i].count;
      }
    });
  }
}

