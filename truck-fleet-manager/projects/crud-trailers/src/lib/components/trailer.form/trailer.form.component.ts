import { Component } from '@angular/core';
import { Trailer } from '../../models/trailer.model';
import { FormGroup } from '@angular/forms';
import { TrailerService } from '../../services/trailer.service';
import { NotificationService } from '../../../../../../projects/common/src/services/notification.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'lib-trailer.form',
  templateUrl: './trailer.form.component.html',
  styleUrls: ['./trailer.form.component.css']
})
export class TrailerFormComponent {
  id = '';
  editMode = false;
  formTitle = 'Añadir Acoplado';

  trailerForm!: FormGroup;

  constructor(public trailerService: TrailerService, private notificationService: NotificationService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.editMode = true;
        this.formTitle = 'Editar Trailer';
        this.autocompleteForm();
      }
    });
  }

  autocompleteForm() {
    this.trailerService.getTrailer(this.id).subscribe(trailer => {
      this.trailerForm.get('patente')?.setValue(trailer.patent);
      this.trailerForm.get('type')?.setValue(trailer.type);
    });
  }

  postTrailer(form: FormGroup): void {
    const nuevoTrailer: Trailer = { _id: '', patent: form.value.patente, type: form.value.type };
    this.trailerService.postTrailers(nuevoTrailer)
      .subscribe(() => {
        this.notificationService.showSnackbar(`Se añadió el acoplado con la patente: ${nuevoTrailer.patent}`, 'success');
        this.router.navigate(['/trailers']);
      });
  }

  putTrailer(form: FormGroup): void {
    const nuevoTrailer: Trailer = {
      _id: this.id,
      patent: form.value.patente,
      type: form.value.type
    };

    this.trailerService.putTrailers(nuevoTrailer)
      .subscribe(() => {
        this.router.navigate(['/trailers']);
        this.notificationService.showSnackbar(`Se actualizo el acoplado con la patente: ${nuevoTrailer.patent}`, 'success');
      });
  }

  settrailerForm(form: FormGroup): void {
    this.trailerForm = form;
  }

  onSubmit(form: FormGroup): void {
    this.trailerForm = form;
    if (form.valid) {
      if (!this.id) {
        this.postTrailer(form);
      } else {
        this.putTrailer(form);
      }
    }
  }
}
