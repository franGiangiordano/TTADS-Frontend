import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockComponent } from 'ng-mocks';

import { BateaListComponent } from '../batea-list-component/batea.list.component';

import { BateaService } from '../../services/batea.service';
import { NotificationService } from '../../../../../common/src/services/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BateaServiceMock } from '../../../../../../src/app/mocks/batea.service';
import { NotificationServiceMock } from '../../../../../../src/app/mocks/notification.service';
import { TableComponent } from '../../../../../common-ui/src/lib/table/table.component';

describe('BateaListComponent', () => {
  let component: BateaListComponent;
  let fixture: ComponentFixture<BateaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [BateaListComponent, MockComponent(TableComponent)],
      providers: [
        { provide: BateaService, useValue: BateaServiceMock },
        { provide: NotificationService, useValue: NotificationServiceMock },
        MatSnackBar,
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BateaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  /*
  it('should update bateasList$ with response from service', () => {
    
  });*/
});
