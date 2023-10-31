import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { NotificationService } from 'projects/common/src';

import { BateaService } from '../../services/batea.service';
import { Batea } from '../../models/batea.model';

@Component({
  selector: 'app-batea-component',
  templateUrl: './batea.component.html',
  styleUrls: ['./batea.component.scss'],
  providers: [BateaService, NotificationService],
})
export class BateaComponent implements OnInit {
  editMode = false;
  formTitle = 'Añadir Batea';
  selectedBatea?: Batea;

  pageSize: number = 10;
  pageIndex: number = 1;
  totalItems: number = 0;
  bateasList!: Batea[];

  bateaForm!: FormGroup;

  constructor(public bateaService: BateaService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.doSearch();
  }

  doSearch(): void {
    this.bateaService.getBateas(this.pageIndex, this.pageSize).subscribe({
      next: (res) => {
        this.bateasList = res.bateas;
        this.totalItems = res.totalBateas;
      },
      error: (err) => {
        //Modal Error
      }
    });
  }

  postBatea(form: FormGroup): void {
    const nuevaBatea: Batea = { _id: '', patent: form.value.patente };
    this.bateaService.postBateas(nuevaBatea)
      .subscribe(() => {
        this.notificationService.showSnackbar(`Se añadió la patente: ${nuevaBatea.patent}`, 'success');
        form.reset();
        this.doSearch();
      });
  }

  putBatea(form: FormGroup): void {
    const nuevaBatea: Batea = {
      _id: this.selectedBatea!._id,
      patent: form.value.patente
    };

    this.bateaService.putBateas(nuevaBatea)
      .subscribe(() => {
        form.reset();
        this.editMode = false;
        this.doSearch();
        this.notificationService.showSnackbar(`Se actualizo la patente a : ${nuevaBatea.patent}`, 'success');
      });
  }

  deleteBatea(event: Batea): void {
    this.bateaService.deleteBateas(event)
      .subscribe(() => {
        this.notificationService.showSnackbar('Elemento eliminado exitosamente', 'success');
        this.doSearch();
      });
  }

  setbateaForm(event: FormGroup): void {
    this.bateaForm = event;
  }

  editBatea(event: Batea): void {
    this.editMode = true;
    this.formTitle = 'Editar Batea';
    this.selectedBatea = event;
    this.bateaForm.get('patente')?.setValue(event.patent);
  }

  onSubmit(form: FormGroup): void {
    this.bateaForm = form;
    if (form.valid) {
      if (!this.editMode) {
        this.postBatea(form);
      } else {
        this.putBatea(form);
      }
    }
  }

  onPageChange(event: PageEvent): void {
    if (this.pageSize !== event.pageSize) {
      this.pageSize = event.pageSize;
      this.pageIndex = 1;
    } else {
      this.pageIndex = event.pageIndex + 1;
    }
    this.doSearch();
  }
}
