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

@Component({
  selector: 'lib-equipment.form',
  templateUrl: './equipment.form.component.html',
  styleUrls: ['./equipment.form.component.css'],
  providers: [BateaService, DriverService,TrailerService],

})
export class EquipmentFormComponent {
  id='';
  editMode = false;
  formTitle = 'Añadir Equipo';

  equipmentForm!: FormGroup;
  BateaList: string[] = [];
  DriverList: string[] = [];
  TrailerList: string[] = [];

  constructor(public equipmentService: EquipmentService, private notificationService: NotificationService, public router : Router, private route: ActivatedRoute, public bateaService: BateaService, public driverService: DriverService, public trailerService: TrailerService) {    
   }

  ngOnInit() {

    this.loadCombos();

    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id){
        this.editMode=true;
        this.formTitle= 'Editar Batea';
        this.autocompleteForm();
      }      
    });
  }

  loadCombos(){
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

  autocompleteForm(){
    this.equipmentService.getEquipment(this.id).subscribe(equipment => {
    this.equipmentForm.get('descripcion')?.setValue(equipment.description); 

    let date = moment(equipment.until_date).format('YYYY-MM-DD');    
    this.equipmentForm.get('fecha hasta')?.setValue(date);  
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
