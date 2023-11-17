import { Component, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { RepairService } from '../../services/repair.service';
import { NotificationService } from 'projects/common/src';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EquipmentService } from 'projects/crud-equipment/src/lib/services/equipment.service';
import { Repair } from '../../models';
import { Equipment } from 'projects/crud-equipment/src/lib/models';

@Component({
  selector: 'lib-repair.form',
  templateUrl: './repair.form.component.html',
  styleUrls: ['./repair.form.component.css'],
  providers: [EquipmentService, RepairService],
})
export class RepairFormComponent implements OnInit {

  id = '';
  editMode = false;
  formTitle = 'Añadir Reparación';

  repairForm!: FormGroup;
  EquipmentList: string[] = [];
 
  equipmentSelectected!: Equipment;
  
  constructor(
    private equipmentService: EquipmentService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private repairService: RepairService
  ) {}

  ngOnInit() {

    this.loadCombos();

    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.editMode = true;
        this.formTitle = 'Editar Reparación';
        this.autocompleteForm();
      }
    });
  }

  loadCombos() {
    this.equipmentService.getEquipments()
      .subscribe(response => this.EquipmentList = response.results.map(result =>
        result.description
      ));
  }

  autocompleteForm() {
    this.repairService.getRepair(this.id).subscribe(repair => {

      this.repairForm.get('descripcion')?.setValue(repair.description);
      this.repairForm.get('costo')?.setValue(repair.cost);
      this.repairForm.controls['equipo'].setValue(repair.equipment.description)
    });
  }

  postRepair(form: FormGroup): void {
    this.equipmentService.getEquipments(1, 10, form.value['equipo']).subscribe(response => {
      this.equipmentSelectected = response.results[0];

    const nuevaRepair: Repair = {
      _id: '',
      description: form.value.descripcion,
      cost: form.value.costo,
      equipment: this.equipmentSelectected 
    }; 
    this.repairService.postRepairs(nuevaRepair)
      .subscribe(() => {
        this.notificationService.showSnackbar('Se añadió la Reparación!', 'success');
        this.router.navigate(['/equipments/repairs']);
      });
    });  
  }

  putRepair(form: FormGroup): void {
    this.equipmentService.getEquipments(1, 10, form.value['equipo']).subscribe(response => {
      this.equipmentSelectected = response.results[0];
    
    const nuevaRepair: Repair = {
      _id: this.id,
      description: form.value.descripcion,
      cost: form.value.costo,
      equipment: this.equipmentSelectected
    };

    this.repairService.putRepairs(nuevaRepair)
      .subscribe(() => {
        this.router.navigate(['/equipments/repairs']);
        this.notificationService.showSnackbar('Se actualizo la Reparación', 'success');
      });
    });   
  }

  setrepairForm(form: FormGroup): void {
    this.repairForm = form;
  }

  onSubmit(form: FormGroup): void {
    this.repairForm = form;
    if (form.valid) {
      if (!this.id) {
        this.postRepair(form);
      } else {
        this.putRepair(form);
      }
    }
  }

}
