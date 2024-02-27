import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { EntityListResponse, NotificationService } from '../../../../../../projects/common/src';
import { TrailerService } from '../../services/trailer.service';
import { Trailer } from '../../models/trailer.model';

@Component({
  selector: 'trailer.list',
  templateUrl: './trailer.list.component.html',
  styleUrls: ['./trailer.list.component.scss'],
  providers: [TrailerService, NotificationService],
})
export class TrailerListComponent implements OnInit {
  editMode = false;
  formTitle = 'Añadir Acoplado';
  rutaVariable: string = 'trailers';

  pageSize: number = 10;
  pageIndex: number = 1;

  trailersList$ = new Subject<EntityListResponse<Trailer>>();

  traielrForm!: FormGroup;

  constructor(public trailerService: TrailerService, private notificationService: NotificationService, public router: Router) { }

  ngOnInit(): void {
    this.doSearch();
  }

  doSearch(search?: string): void {
    this.trailerService.getTrailers(this.pageIndex, this.pageSize, search)
      .subscribe(response => this.trailersList$.next(response));
  }

  deleteTrailer(event: Trailer): void {
    this.trailerService.deleteTrailers(event)
      .subscribe(() => {
        this.notificationService.showSnackbar('Elemento eliminado exitosamente', 'success');
        this.doSearch();
      });
  }

  editTrailer(event: Trailer): void {
    this.router.navigate(['/trailers/edit/' + event._id]);
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
