import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Driver } from '../../models/driver.model';
import { DriverService } from '../../services/driver.service';
import { NotificationService } from '../../../../../../projects/common/src/services/notification.service';

@Component({
  selector: 'driver.form',
  templateUrl: './driver.form.component.html',
  styleUrls: ['./driver.form.component.css']
})
export class DriverFormComponent {
  id = '';
  editMode = false;
  formTitle = 'Añadir Chofer';

  driverForm!: FormGroup;

  constructor(public driverService: DriverService, private notificationService: NotificationService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.editMode = true;
        this.formTitle = 'Editar Chofer';
        this.autocompleteForm();
      }
    });
  }

  autocompleteForm() {
    this.driverService.getDriver(this.id).subscribe(driver => {
      this.driverForm.get('legajo')?.setValue(driver.legajo);
      this.driverForm.get('name')?.setValue(driver.name);
      this.driverForm.get('surname')?.setValue(driver.surname);

    });
  }

  postDriver(form: FormGroup): void {
    const nuevoDriver: Driver = { _id: '', legajo: form.value.legajo, name: form.value.name, surname: form.value.surname };
    this.driverService.postDrivers(nuevoDriver)
      .subscribe(() => {
        this.notificationService.showSnackbar(`Se añadió el chofer con legajo: ${nuevoDriver.legajo}`, 'success');
        this.router.navigate(['/drivers']);
      });
  }

  putDriver(form: FormGroup): void {
    const nuevoDriver: Driver = {
      _id: this.id,
      legajo: form.value.legajo, name: form.value.name, surname: form.value.surname
    };

    this.driverService.putDrivers(nuevoDriver)
      .subscribe(() => {
        this.router.navigate(['/drivers']);
        this.notificationService.showSnackbar(`Se actualizo el chofer con legajo: ${nuevoDriver.legajo}`, 'success');
      });
  }

  setdriverForm(form: FormGroup): void {
    this.driverForm = form;
  }

  onSubmit(form: FormGroup): void {
    this.driverForm = form;
    if (form.valid) {
      if (!this.id) {
        this.postDriver(form);
      } else {
        this.putDriver(form);
      }
    }
  }
}
