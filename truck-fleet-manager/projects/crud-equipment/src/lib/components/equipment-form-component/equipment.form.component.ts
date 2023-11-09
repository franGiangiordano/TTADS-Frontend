import { Component } from '@angular/core';
import * as moment from 'moment';

import { FormGroup } from '@angular/forms';
import { EquipmentService } from '../../services/equipment.service';
import { NotificationService } from 'projects/common/src/services/notification.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-equipment.form',
  templateUrl: './equipment.form.component.html',
  styleUrls: ['./equipment.form.component.css']
})
export class EquipmentFormComponent {
  id='';
  editMode = false;
  formTitle = 'Añadir Equipo';

  equipmentForm!: FormGroup;

  constructor(public equipmentService: EquipmentService, private notificationService: NotificationService, public router : Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id){
        this.editMode=true;
        this.formTitle= 'Editar Batea';
        this.autocompleteForm();
      }      
    });
  }

  autocompleteForm(){
    this.equipmentService.getEquipment(this.id).subscribe(equipment => {
    this.equipmentForm.get('descripcion')?.setValue(equipment.description); 
    
    let date = moment(equipment.until_date).format('YYYY-MM-DD');    
    this.equipmentForm.get('fecha hasta')?.setValue(date);  
    this.equipmentForm.get('patente batea')?.setValue(equipment.batea.patent);
    });
  } 

  setequipmentForm(form: FormGroup): void {
    this.equipmentForm = form;
  }

  onSubmit(form: FormGroup): void {
    this.equipmentForm = form;
    if (form.valid) {
      if (!this.id) {
       // this.postBatea(form);
      } else {
       // this.putBatea(form);
      }
    }
  }
}
