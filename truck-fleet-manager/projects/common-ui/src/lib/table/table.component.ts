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

@Component({
  selector: 'fm-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  searchText: string = '';
  displayedColumns: string[] = [];

  loading = false;
  count!: number;
  results!: any[];

  @Input({ required: true }) data!: Observable<EntityListResponse<any>>;
  @Input({ required: true }) columns: string[] = [];
  @Input() rutaVariable: string = ''
  @Input() formatFunction?: (array: any[]) => any[];

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() search = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<PageEvent>();

  ngOnInit(): void {
    this.displayedColumns = [...this.columns, 'actions'];
    this.loading = true;
    this.data.subscribe(response => {
      this.count = response.count;
      this.results = (this.formatFunction)? this.formatFunction(response.results): response.results;
      console.log(this.results);
      this.loading = false
    })
  }
 
  editItem(item: any) {
    this.edit.emit(item);
  }

  deleteItem(item: any) {
    const confirmDelete = confirm(DELETE_CONFIRMATION_MESSAGE);
    if (confirmDelete) {
      this.delete.emit(item);
    }
  }

  filterData() {
    this.search.emit(this.searchText);
  }

  getColumnHeader(propertyName: string) {
    return ColumnDescription[propertyName as keyof typeof ColumnDescription];
  }

  onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
    this.loading = true;
  }
}
