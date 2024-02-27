import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserListComponent } from './user.list.component';

import { NotificationService } from '../../../../../../projects/common/src';

describe('UserListComponent', () => {
    let component: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [UserListComponent],
            providers: [NotificationService, MatSnackBar],
            imports: [HttpClientTestingModule]
        });
        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
