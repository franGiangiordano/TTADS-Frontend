import { Component, OnInit } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { DriverService } from '../../services/driver.service';
import { NotificationService } from '../../../utils/notification.service';
import { Driver } from '../../models/driver';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
  providers: [DriverService, NotificationService]
})
export class DriverComponent implements OnInit {

  editMode = false;
  selectedDriver = new Driver();

  pageSize: number = 10;
  pageIndex: number = 1;
  totalItems: number = 0;

  driverForm!: FormGroup;

  constructor(public driverService: DriverService, private notificationService: NotificationService) { }

  ngOnInit(): void {
      this.getDrivers();
  }

  getDrivers(index?:number, limit?:number): void {
    this.driverService.getDrivers(index,limit).subscribe((res) => { 
    this.driverService.drivers = res.drivers;  
    this.totalItems = res.totalDrivers;
    });
  }

  postDriver(event: FormGroup): void {
    const nuevoDriver: Driver = { _id: '', legajo: event.value.legajo, name: event.value.name, surname: event.value.surname };    
    this.driverService.postDrivers(nuevoDriver).pipe(
      tap(() => {
       this.notificationService.showSnackbar(`Se añadió el chofer con legajo: ${nuevoDriver.legajo}`, 'success');        
        event.reset();
      }),
      catchError((error: string) => {
        this.notificationService.showSnackbar(error, 'error');
        return [];
      })
    ).subscribe(() => {
      this.getDrivers();
    });
  }

  putDriver(event: FormGroup):void{    
    const nuevoDriver: Driver = {
      _id: this.selectedDriver._id,
      legajo: event.value.legajo, 
      name: event.value.name, 
      surname: event.value.surname
    };

    this.driverService.putDrivers(nuevoDriver).pipe(
      tap(() => {
        event.reset();
      }),
      catchError((error: string) => {
        this.notificationService.showSnackbar(error, 'error');
        return [];
      })
    ).subscribe(() => {
      this.editMode = false;
      this.getDrivers(this.pageIndex,this.pageSize);
      this.notificationService.showSnackbar(`Se actualizo el chofer con legajo: ${nuevoDriver.legajo}`, 'success');      
    });
  }

  deleteDriver(event: Driver): void {
    this.driverService.deleteDrivers(event).pipe(
      tap(() => {
        this.notificationService.showSnackbar('Elemento eliminado exitosamente', 'success');
        this.getDrivers();
      }),catchError((error: string) => {
        this.notificationService.showSnackbar(error, 'error');
        return [];
      })
    ).subscribe();
  }

  setdriverForm(event: FormGroup): void {
    this.driverForm = event;
  }

  editDriver(event: Driver): void {
    this.editMode = true;
    this.selectedDriver = event;
    this.driverForm.get('legajo')?.setValue(event.legajo);
    this.driverForm.get('name')?.setValue(event.name);
    this.driverForm.get('surname')?.setValue(event.surname);
  }

  onSubmit(event: FormGroup): void {        
    this.driverForm=event;
    if (event.valid) {  
      if(!this.editMode){
        this.postDriver(event)
      }else{
        this.putDriver(event)
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
    this.getDrivers(this.pageIndex,this.pageSize)
  }

}