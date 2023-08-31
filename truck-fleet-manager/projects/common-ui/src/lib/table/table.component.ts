import { Component, EventEmitter, Input,Output } from '@angular/core';
import { DELETE_CONFIRMATION_MESSAGE } from '../messages.constant';

@Component({
  selector: 'fm-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent {
 
  @Input() data: any[] = [];
  @Input() columns: string[] = [];

  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.displayedColumns = [...this.columns, 'actions'];
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
}
