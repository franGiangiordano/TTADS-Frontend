import { Component, EventEmitter, Input,OnChanges,Output, SimpleChanges } from '@angular/core';
import { DELETE_CONFIRMATION_MESSAGE } from '../messages.constant';
import { ColumnDescription } from '../../constants';

@Component({
  selector: 'fm-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnChanges {
 
  @Input() data: any[] = [];  
  @Input() columns: string[] = [];

  filteredData: any[] = [];
  search: string = '';
  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.displayedColumns = [...this.columns, 'actions'];
  }  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {      
      this.filteredData = changes['data'].currentValue;
    }
  }

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  editItem(item: any) {
    this.edit.emit(item);
  }

  deleteItem(item: any) {
    const confirmDelete = confirm(DELETE_CONFIRMATION_MESSAGE);
    if (confirmDelete){
      this.delete.emit(item);
    }    
  }

  filterData() {
    this.filteredData = this.data.filter((row) => {
      return row.patent.toLowerCase().includes(this.search.toLowerCase());
    });
  }
  
  getColumnHeader(propertyName: string) {
    return ColumnDescription[propertyName as keyof typeof ColumnDescription];
  }
}
