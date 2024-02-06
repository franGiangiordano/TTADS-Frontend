import { Component } from '@angular/core';
import { Batea } from '../../models/batea.model';
import { FormGroup } from '@angular/forms';
import { BateaService } from '../../services/batea.service';
import { NotificationService } from 'projects/common/src/services/notification.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-batea-form',
  templateUrl: './batea.form.component.html',
  styleUrls: ['./batea.form.component.css'],
})
export class BateaFormComponent {
  id = '';
  editMode = false;
  formTitle = 'Añadir Batea';

  bateaForm!: FormGroup;

  constructor(
    private bateaService: BateaService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.editMode = true;
        this.formTitle = 'Editar Batea';
        this.autocompleteForm();
      }
    });
  }

  autocompleteForm() {
    this.bateaService.getBatea(this.id).subscribe((batea) => {
      this.bateaForm.get('patente')?.setValue(batea.patent);
    });
  }

  postBatea(form: FormGroup): void {
    const nuevaBatea: Batea = { _id: '', patent: form.value.patente };
    this.bateaService.postBateas(nuevaBatea).subscribe(() => {
      this.notificationService.showSnackbar(
        `Se añadió la patente: ${nuevaBatea.patent}`,
        'success'
      );
      this.router.navigate(['/bateas']);
    });
  }

  putBatea(form: FormGroup): void {
    const nuevaBatea: Batea = {
      _id: this.id,
      patent: form.value.patente,
    };

    this.bateaService.putBateas(nuevaBatea).subscribe(() => {
      this.router.navigate(['/bateas']);
      this.notificationService.showSnackbar(
        `Se actualizo la patente a : ${nuevaBatea.patent}`,
        'success'
      );
    });
  }

  setbateaForm(form: FormGroup): void {
    this.bateaForm = form;
  }

  onSubmit(form: FormGroup): void {
    this.bateaForm = form;
    if (form.valid) {
      if (!this.id) {
        this.postBatea(form);
      } else {
        this.putBatea(form);
      }
    }
  }
}
