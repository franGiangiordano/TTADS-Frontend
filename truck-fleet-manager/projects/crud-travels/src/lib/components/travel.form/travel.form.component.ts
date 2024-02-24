import { Component } from '@angular/core';
import * as moment from 'moment';

import { FormGroup } from '@angular/forms';
import { TravelService } from '../../services/travel.service';
import { NotificationService } from 'projects/common/src';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EquipmentService } from 'projects/crud-equipment/src/lib/services/equipment.service';
import { Travel } from '../../models';
import { Equipment } from 'projects/crud-equipment/src/lib/models';
import { comboField } from 'projects/common-ui/src/constants/types';

@Component({
  selector: 'lib-travel.form',
  templateUrl: './travel.form.component.html',
  styleUrls: ['./travel.form.component.css'],
  providers: [EquipmentService, TravelService],
})
export class TravelFormComponent {
  id = '';
  editMode = false;
  formTitle = 'Añadir Viaje';

  equipmentForm!: FormGroup;
  EquipmentList: comboField[] = [];

  equipmentSelectected!: Equipment;

  constructor(
    private equipmentService: EquipmentService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private travelService: TravelService
  ) {}

  ngOnInit() {
    this.loadCombos();

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.editMode = true;
        this.formTitle = 'Editar Viaje';
        this.autocompleteForm();
      }
    });
  }

  loadCombos() {
    this.equipmentService.getEquipments().subscribe(
      (response) =>
        (this.EquipmentList = response.results.map((result) => {
          return { value: result.description, viewValue: result.description };
        }))
    );
  }

  autocompleteForm() {
    this.travelService.getTravel(this.id).subscribe((travel) => {
      let arrival_date = moment
        .utc(travel.arrival_date)
        .add(1, 'days')
        .format('YYYY-MM-DD');
      let departure_date = moment
        .utc(travel.departure_date)
        .add(1, 'days')
        .format('YYYY-MM-DD');

      this.equipmentForm.get('fecha inicio')?.setValue(departure_date);
      this.equipmentForm.get('fecha fin')?.setValue(arrival_date);

      this.equipmentForm.controls['equipo'].setValue(
        travel.equipment.description
      );

      this.equipmentForm.get('costo')?.setValue(travel.cost);
      this.equipmentForm.get('km')?.setValue(travel.km);
      this.equipmentForm
        .get('localidad inicio')
        ?.setValue(travel.starting_location);
      this.equipmentForm.get('localidad fin')?.setValue(travel.final_location);
      this.equipmentForm
        .get('destino')
        ?.setValue(travel.destination_description);
    });
  }

  postTravel(form: FormGroup): void {
    this.equipmentService
      .getEquipments(1, 10, form.value['equipo'])
      .subscribe((response) => {
        this.equipmentSelectected = response.results[0];

        const nuevoViaje: Travel = {
          _id: '',
          departure_date: new Date(form.value['fecha inicio']),
          arrival_date: new Date(form.value['fecha fin']),
          cost: parseInt(form.value.costo, 10),
          km: parseInt(form.value.km, 10),
          starting_location: form.value['localidad inicio'],
          final_location: form.value['localidad fin'],
          equipment: this.equipmentSelectected,
          destination_description: form.value['destino'],
        };
        this.travelService.postTravels(nuevoViaje).subscribe(() => {
          this.notificationService.showSnackbar(
            'Se añadió el viaje!',
            'success'
          );
          this.router.navigate(['/equipments/travels']);
        });
      });
  }

  putTravel(form: FormGroup): void {
    this.equipmentService
      .getEquipments(1, 10, form.value['equipo'])
      .subscribe((response) => {
        this.equipmentSelectected = response.results[0];

        const nuevoViaje: Travel = {
          _id: this.id,
          departure_date: new Date(form.value['fecha inicio']),
          arrival_date: new Date(form.value['fecha fin']),
          cost: parseInt(form.value.costo, 10),
          km: parseInt(form.value.km, 10),
          starting_location: form.value['localidad inicio'],
          final_location: form.value['localidad fin'],
          equipment: this.equipmentSelectected,
          destination_description: form.value['destino'],
        };

        this.travelService.putTravels(nuevoViaje).subscribe(() => {
          this.router.navigate(['/equipments/travels']);
          this.notificationService.showSnackbar(
            'Se actualizo el equipo',
            'success'
          );
        });
      });
  }

  setequipmentForm(form: FormGroup): void {
    this.equipmentForm = form;
  }

  onSubmit(form: FormGroup): void {
    this.equipmentForm = form;
    if (form.valid) {
      if (!this.id) {
        this.postTravel(form);
      } else {
        this.putTravel(form);
      }
    }
  }
}
