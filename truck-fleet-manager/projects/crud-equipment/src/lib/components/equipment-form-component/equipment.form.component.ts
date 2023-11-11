import { Component } from '@angular/core';
import * as moment from 'moment';

import { FormGroup } from '@angular/forms';
import { EquipmentService } from '../../services/equipment.service';
import { NotificationService } from 'projects/common/src';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BateaService } from 'projects/crud-bateas/src/lib/services/batea.service';
import { DriverService } from 'projects/crud-drivers/src/lib/services/driver.service';
import { TrailerService } from 'projects/crud-trailers/src/lib/services/trailer.service';
import { Equipment } from '../../models';
import { Batea } from 'projects/crud-bateas/src/lib/models';
import { Driver } from 'projects/crud-drivers/src/lib/models';
import { Trailer } from 'projects/crud-trailers/src/lib/models';

@Component({
  selector: 'lib-equipment.form',
  templateUrl: './equipment.form.component.html',
  styleUrls: ['./equipment.form.component.css'],
  providers: [BateaService, DriverService, TrailerService],

})
export class EquipmentFormComponent {
  id = '';
  editMode = false;
  formTitle = 'Añadir Equipo';

  equipmentForm!: FormGroup;
  BateaList: string[] = [];
  DriverList: string[] = [];
  TrailerList: string[] = [];

  bateaSelectected!: Batea;
  trailerSelected!: Trailer;
  driverSelected!: Driver

  constructor(private equipmentService: EquipmentService, private notificationService: NotificationService, private router: Router, private route: ActivatedRoute, private bateaService: BateaService, private driverService: DriverService, private trailerService: TrailerService) {
  }

  ngOnInit() {

    this.loadCombos();

    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.editMode = true;
        this.formTitle = 'Editar Batea';
        this.autocompleteForm();
      }
    });
  }

  loadCombos() {
    this.bateaService.getBateas()
      .subscribe(response => this.BateaList = response.results.map(result =>
        result.patent
      ));

    this.driverService.getDrivers()
      .subscribe(response => this.DriverList = response.results.map(result =>
        result.legajo
      ));

    this.trailerService.getTrailers()
      .subscribe(response => this.TrailerList = response.results.map(result =>
        result.patent
      ));
  }

  autocompleteForm() {
    this.equipmentService.getEquipment(this.id).subscribe(equipment => {
      this.equipmentForm.get('descripcion')?.setValue(equipment.description);

      let date = moment(equipment.until_date).format('YYYY-MM-DD');
      this.equipmentForm.get('fecha hasta')?.setValue(date);
      this.equipmentForm.controls['batea'].setValue(equipment.batea.patent)
      this.equipmentForm.controls['driver'].setValue(equipment.driver.legajo)
      this.equipmentForm.controls['trailer'].setValue(equipment.trailer.patent)
    });
  }

  postEquipment(form: FormGroup): void {
    this.bateaService.getBateas(1, 10, form.value['batea']).subscribe(response => {
      this.bateaSelectected = response.results[0];

      this.driverService.getDrivers(1, 10, form.value['driver']).subscribe(response => {
        this.driverSelected = response.results[0];

        this.trailerService.getTrailers(1, 10, form.value['trailer']).subscribe(response => {
          this.trailerSelected = response.results[0];

          const nuevoEquipo: Equipment = {
            _id: '',
            description: form.value.descripcion,
            until_date: new Date(form.value['fecha hasta']),
            batea: this.bateaSelectected,
            driver: this.driverSelected,
            trailer: this.trailerSelected
          }

          this.equipmentService.postEquipments(nuevoEquipo)
            .subscribe(() => {
              this.notificationService.showSnackbar('Se añadió el equipo!', 'success');
              this.router.navigate(['/equipments']);
            });
        })
      })
    })
  }

  putEquipment(form: FormGroup): void {
    this.bateaService.getBateas(1, 10, form.value['batea']).subscribe(response => {
      this.bateaSelectected = response.results[0];

      this.driverService.getDrivers(1, 10, form.value['driver']).subscribe(response => {
        this.driverSelected = response.results[0];

        this.trailerService.getTrailers(1, 10, form.value['trailer']).subscribe(response => {
          this.trailerSelected = response.results[0];

          const nuevoEquipo: Equipment = {
            _id: this.id,
            description: form.value.descripcion,
            until_date: new Date(form.value['fecha hasta']),
            batea: this.bateaSelectected,
            driver: this.driverSelected,
            trailer: this.trailerSelected
          }

          this.equipmentService.putEquipments(nuevoEquipo)
            .subscribe(() => {
              this.router.navigate(['/equipments']);
              this.notificationService.showSnackbar('Se actualizo el equipo', 'success');
            });
        })
      })
    })


  }

  setequipmentForm(form: FormGroup): void {
    this.equipmentForm = form;
  }

  onSubmit(form: FormGroup): void {
    this.equipmentForm = form;
    if (form.valid) {
      if (!this.id) {
        this.postEquipment(form);
      } else {
        this.putEquipment(form);
      }
    }
  }
}