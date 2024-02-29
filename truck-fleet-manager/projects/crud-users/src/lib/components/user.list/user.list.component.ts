import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { EntityListResponse, NotificationService } from 'projects/common/src';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { UserService } from '../../services/crud.user.service';
import { User } from 'projects/common/src';

@Component({
  selector: 'user-list-component',
  templateUrl: './user.list.component.html',
  styleUrls: ['./user.list.component.scss'],
  providers: [UserService, NotificationService],
})
export class UserListComponent {
  editMode = false;
  formTitle = 'Añadir Usuario';
  rutaVariable: string = 'users';

  pageSize: number = 10;
  pageIndex: number = 1;

  usersList$ = new Subject<EntityListResponse<User>>();

  userForm!: FormGroup;

  constructor(public userService: UserService, private notificationService: NotificationService,  public router : Router) { }

  ngOnInit(): void {
    this.doSearch();
  }

  doSearch(search?:string): void {
    this.userService.getUsers(this.pageIndex, this.pageSize,search)
      .subscribe(response => this.usersList$.next(response));
  }

  formatResponse(userList:any[]): any[] {   
    return userList.map(obj => {
      return {
        _id: obj._id,      
        name: obj.name,
        email: obj.email,
        rol: obj.roles[0].name
      };
    });  
  }

  deleteUser(event: User): void {
    this.userService.deleteUsers(event)
      .subscribe(() => {
        this.notificationService.showSnackbar('Elemento eliminado exitosamente', 'success');
        this.doSearch();
      });
  }

  editUser(event: User): void {
    this.router.navigate(['/users/edit/'+ event._id]);    
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
