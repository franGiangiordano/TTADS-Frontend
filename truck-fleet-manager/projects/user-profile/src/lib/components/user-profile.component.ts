import { Component } from '@angular/core';
import { NotificationService, User } from 'projects/common/src';
import { AppLoginService } from 'projects/common/src';
import { UserService } from 'projects/crud-users/src/lib/services/crud.user.service';

@Component({
  selector: 'lib-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  user!: User;
  isEditingName = false;
  editedName = '';

  isEditingEmail: boolean = false;
  editedEmail: string = '';

  constructor(
    private appLoginService: AppLoginService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.user = appLoginService.getUserInfo();
  }

  toggleEdit(field: string) {
    if (field === 'name') {
      this.isEditingName = !this.isEditingName;
      if (!this.isEditingName) {
        this.user.name = this.editedName;
      } else {
        this.editedName = this.user.name;
      }
    } else if (field === 'email') {
      this.isEditingEmail = !this.isEditingEmail;
      if (!this.isEditingEmail) {
        this.user.email = this.editedEmail;
      } else {
        this.editedEmail = this.user.email;
      }
    }
  }

  updateName() {
    this.user.name = this.editedName;
    this.isEditingName = false;
    this.userService.putUsers(this.user).subscribe(() => {
      this.notificationService.showSnackbar(
        `Se actualizo el nombre de usuario a: ${this.user.name}`,
        'success'
      );
      this.appLoginService.updateUserInfo(this.user);
    });
  }

  updateEmail() {
    this.user.email = this.editedEmail;
    this.isEditingEmail = false;
    this.userService.putUsers(this.user).subscribe(() => {
      this.notificationService.showSnackbar(
        `Se actualizo el email de usuario a: ${this.user.email}`,
        'success'
      );
      this.appLoginService.updateUserInfo(this.user);
    });
  }
}
