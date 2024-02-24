import { Component } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { NotificationService } from 'projects/common/src';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';

import { UserService } from '../../services/crud.user.service';
import { User } from 'projects/common/src';

@Component({
  selector: 'lib-user.form',
  templateUrl: './user.form.component.html',
  styleUrls: ['./user.form.component.scss'],
  providers: [UserService,NotificationService],

})
export class UserFormComponent {
  id = '';
  editMode = false;
  formTitle = 'Añadir Usuario';

  userForm!: FormGroup;

  constructor(private userService: UserService, private notificationService: NotificationService, public router : Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id){
        this.editMode=true;
        this.formTitle= 'Editar Usuario';
        this.autocompleteForm();
      }      
    });
  }

  autocompleteForm(){
    this.userService.getUser(this.id).subscribe(user => {
      this.userForm.get('nombre')?.setValue(user.name);
      this.userForm.get('email')?.setValue(user.email);      
      this.userForm.controls['rol'].setValue(user.roles[0].name)});
  } 

  postUser(form: FormGroup): void {
    const nuevoUsuario: User = { 
      _id: '', 
      name: form.value.nombre, 
      email: form.value.email, 
      password: CryptoJS.SHA256(form.value.password).toString(),
      roles: form.value['rol'] === 'admin' ? ['admin','manager'] : [form.value['rol']],
    };

    this.userService.postUsers(nuevoUsuario)
      .subscribe(() => {
        this.notificationService.showSnackbar(`Se añadió el usuario: ${nuevoUsuario.name}`, 'success');
        this.router.navigate(['/users']);
      });
  }

  putUser(form: FormGroup): void {
    const nuevoUsuario: User = {
      _id: this.id,
      name: form.value.nombre,
      email: form.value.email,
      password: CryptoJS.SHA256(form.value.password).toString(),
      roles: form.value['rol'] === 'admin' ? ['admin','manager'] : [form.value['rol']],
    };

    this.userService.putUsers(nuevoUsuario)
      .subscribe(() => {
        this.router.navigate(['/users']);
        this.notificationService.showSnackbar('Se actualizo el usuario', 'success');
      });
  }

  setUserForm(form: FormGroup): void {
    this.userForm = form;
  }

  onSubmit(form: FormGroup): void {
    this.userForm = form;
    if (form.valid) {
      if (!this.id) {
        this.postUser(form);
      } else {
        this.putUser(form);
      }
    }
  }
}
