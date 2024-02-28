import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { EntityListResponse } from '../../../../../common/src/models/entity.list.response';
import { NotificationService } from '../../../../../common/src/services/notification.service';
import { BateaService } from '../../services/batea.service';
import { Batea } from '../../models/batea.model';

@Component({
  selector: 'batea-list-component',
  templateUrl: './batea.list.component.html',
  styleUrls: ['./batea.list.component.scss'],
})
export class BateaListComponent implements OnInit {
  editMode = false;
  formTitle = 'Añadir Batea';
  rutaVariable: string = 'bateas';

  pageSize: number = 10;
  pageIndex: number = 1;

  bateasList$ = new Subject<EntityListResponse<Batea>>();

  bateaForm!: FormGroup;

  constructor(
    private bateaService: BateaService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.doSearch();
  }

  doSearch(search?: string): void {
    this.bateaService
      .getBateas(this.pageIndex, this.pageSize, search)
      .subscribe((response) => this.bateasList$.next(response));
  }

  deleteBatea(event: Batea): void {
    this.bateaService.deleteBateas(event).subscribe(() => {
      this.notificationService.showSnackbar(
        'Elemento eliminado exitosamente',
        'success'
      );
      this.doSearch();
    });
  }

  editBatea(event: Batea): void {
    this.router.navigate(['/bateas/edit/' + event._id]);
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
