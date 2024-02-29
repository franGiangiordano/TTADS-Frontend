import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { EntityListResponse } from 'projects/common/src/models';

import { DELETE_CONFIRMATION_MESSAGE } from '../messages.constant';
import { ColumnDescription } from '../../constants';
import { AppLoginService } from '../../../../common/src/services/app-login.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'fm-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  searchText: string = '';
  displayedColumns: string[] = [];
  columsR: string[] = [];

  showPdfButton = false;
  loading = false;
  count!: number;
  results!: any[];
  pageIndex!: number;

  @Input({ required: true }) data!: Observable<EntityListResponse<any>>;
  @Input({ required: true }) columns: string[] = [];
  @Input() rutaVariable: string = '';
  @Input() formatFunction?: (array: any[]) => any[];

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() search = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() generatePdfClick = new EventEmitter<void>();

  generatePdf() {
    this.generatePdfClick.emit();
  }

  constructor(private loginService: AppLoginService, private router: Router) {}
  roles: string[] = [];

  ngOnInit(): void {
    this.roles = this.loginService.getUserRole();
    this.displayedColumns = this.roles.includes('manager')
      ? [...this.columns, 'actions']
      : [...this.columns];
    this.loading = true;
    this.data.subscribe((response) => {
      this.pageIndex = Math.ceil(response.currentPage / 10);
      this.count = response.count;
      this.results = this.formatFunction
        ? this.formatFunction(response.results)
        : response.results;
      this.loading = false;

      if (this.columns.length > 6 && !this.showAllColumns) {
        this.showAllColumns = true;
        this.displayedColumns = this.roles.includes('manager')
          ? [...this.columns, 'actions']
          : [...this.columns];
      } else {
        this.showAllColumns = false;
        this.showColumns();
      }
    });
    this.toggleColumnVisibility();
    const currentRoute = this.router.url;
    this.showPdfButton =
      currentRoute.includes('/equipments/travels') ||
      currentRoute.includes('/equipments/repairs');
  }

  editItem(item: any) {
    this.edit.emit(item);
  }

  deleteItem(item: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: DELETE_CONFIRMATION_MESSAGE,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete.emit(item);
      }
    });
  }

  filterData() {
    this.search.emit(this.searchText);
  }

  getColumnHeader(propertyName: string) {
    return ColumnDescription[propertyName as keyof typeof ColumnDescription];
  }

  onPageChange(event: PageEvent): void {
    console.log('onPageChange', event);
    this.pageChange.emit(event);
    this.loading = true;
  }

  redirect() {
    this.router.navigate([this.rutaVariable + '/add']);
  }

  showAllColumns = false;

  toggleColumnVisibility() {
    this.showAllColumns = !this.showAllColumns;
    this.displayedColumns = this.showAllColumns
      ? [...this.columns, 'actions']
      : [...this.columns.slice(0, 6), 'actions'];
  }

  showColumns() {
    this.displayedColumns = this.roles.includes('manager')
      ? [...this.columns.slice(0, 6), 'actions']
      : [...this.columns];
  }
}
