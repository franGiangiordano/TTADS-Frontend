import { Component, OnInit } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { BateaService } from '../../services/batea.service';
import { Batea } from '../../models/batea';
import { NotificationService } from 'projects/common/src';

@Component({
  selector: 'app-batea-component',
  templateUrl: './batea.component.html',
  styleUrls: ['./batea.component.scss'],
  providers: [BateaService, NotificationService],
})
export class BateaComponent  implements OnInit {
  
  editMode = false;
  formTitle = 'Añadir Batea';
  selectedBatea = new Batea();

  pageSize: number = 10;
  pageIndex: number = 1;
  totalItems: number = 0;

  bateaForm!: FormGroup;

  constructor(public bateaService: BateaService, private notificationService: NotificationService) { }

  ngOnInit(): void {
      this.getBateas();
  }

  getBateas(index?:number, limit?:number): void {
    this.bateaService.getBateas(index,limit).subscribe((res) => { 
    this.bateaService.bateas = res.bateas;    
    this.totalItems = res.totalBateas;
    });
  }

  postBatea(event: FormGroup): void {
    const nuevaBatea: Batea = { _id: '', patent: event.value.patente };    
    this.bateaService.postBateas(nuevaBatea).pipe(
      tap(() => {
       this.notificationService.showSnackbar(`Se añadió la patente: ${nuevaBatea.patent}`, 'success');        
        event.reset();
      }),
      catchError((error: string) => {
        this.notificationService.showSnackbar(error, 'error');
        return [];
      })
    ).subscribe(() => {
      this.getBateas();
    });
  }
  
  putBatea(event: FormGroup):void{    
    const nuevaBatea: Batea = {
      _id: this.selectedBatea._id,
      patent: event.value.patente
    };

    this.bateaService.putBateas(nuevaBatea).pipe(
      tap(() => {
        event.reset();
      }),
      catchError((error: string) => {
        this.notificationService.showSnackbar(error, 'error');
        return [];
      })
    ).subscribe(() => {
      this.editMode = false;
      this.getBateas(this.pageIndex,this.pageSize);
      this.notificationService.showSnackbar(`Se actualizo la patente a : ${nuevaBatea.patent}`, 'success');      
    });
  }

  deleteBatea(event: Batea): void {
    this.bateaService.deleteBateas(event).pipe(
      tap(() => {
        this.notificationService.showSnackbar('Elemento eliminado exitosamente', 'success');
        this.getBateas();
      }),catchError((error: string) => {
        this.notificationService.showSnackbar(error, 'error');
        return [];
      })
    ).subscribe();
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

  onSubmit(event: FormGroup): void {        
     this.bateaForm=event;
     if (event.valid) {  
       if(!this.editMode){
         this.postBatea(event)
       }else{
         this.putBatea(event)
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
    this.getBateas(this.pageIndex,this.pageSize)
  }
  
}
