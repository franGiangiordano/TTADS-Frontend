import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { of } from 'rxjs';

import { NotificationService } from '../../../../../common/src/services/notification.service';
import { BateaService } from '../../services/batea.service';
import { BateaListComponent } from '../batea-list-component/batea.list.component';
import { Batea } from '../../models';
import { EntityListResponse } from '../../../../../../projects/common/src';

describe('BateaListComponent', () => {
  let component: BateaListComponent;
  let bateaService: BateaService;
  let router: Router;
  let notificationService: NotificationService;
  let fixture: ComponentFixture<BateaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        HttpClientTestingModule,
        CommonModule,
        ReactiveFormsModule
      ],
      declarations: [BateaListComponent],
      providers: [
        BateaService,
        NotificationService,
        MatSnackBar,
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BateaListComponent);

    component = fixture.componentInstance;
    bateaService = TestBed.inject(BateaService);
    notificationService = TestBed.inject(NotificationService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should doSearch on init', () => {
    //Arrange
    const doSearchSpy = jest.spyOn(component, 'doSearch');

    //Act
    component.ngOnInit();

    //Asser
    expect(doSearchSpy).toHaveBeenCalled();
  });

  it('should call getBateas with correct parameters when search is provided', (done) => {
    //Arrange
    const getBateasSpy = jest.spyOn(bateaService, 'getBateas').mockReturnValue(of(new EntityListResponse<Batea>()));
    const searchQuery = 'test';

    const pageIndex = 1;
    component.pageIndex = pageIndex;

    const pageSize = 10;
    component.pageSize = pageSize;

    //Act
    component.doSearch(searchQuery);

    //Assert
    component.bateasList$.subscribe(() => {
      expect(getBateasSpy).toHaveBeenCalledWith(component.pageIndex, component.pageSize, searchQuery);
      done();
    });
  });

  it('should call bateaService getBateas method on doSearch', () => {
    //Arrange
    const getBateasSpy = jest.spyOn(bateaService, 'getBateas').mockImplementation(() => of());
    const searchText = 'searchText';

    //Act
    component.doSearch(searchText);

    //Assert
    expect(getBateasSpy).toHaveBeenCalledWith(component.pageIndex, component.pageSize, searchText);
  });

  it('should redirect to correct page on edit', (done) => {
    //Arrange
    const navigateSpy = jest.spyOn(router, 'navigate');
    const editEvent = new Batea('1');

    //Act
    component.editBatea(editEvent);

    //Assert
    expect(navigateSpy).toHaveBeenCalledWith(['/bateas/edit/1']);
    done();
  });

  it('should call bateaService on eliminate batea', () => {
    //Arrange
    const deleteBateasSpy = jest.spyOn(bateaService, 'deleteBateas');
    const deleteEvent = new Batea('1');

    //Act
    component.deleteBatea(deleteEvent);

    //Assert
    expect(deleteBateasSpy).toHaveBeenCalledWith(deleteEvent);
  });

  it('should show snackbar when batea is succesfully eliminated', () => {
    //Arrange
    const showSnackbarSpy = jest.spyOn(notificationService, 'showSnackbar');
    const editEvent = new Batea('1');

    //Act
    component.deleteBatea(editEvent);

    //Assert
    expect(showSnackbarSpy).toHaveBeenCalledWith('Elemento eliminado exitosamente',
      'success');
  });

  it('should refresh search after succesfully eliminate a batea', () => {
    //Arrange
    const doSearchSpy = jest.spyOn(component, 'doSearch');
    const editEvent = new Batea('1');

    //Act
    component.deleteBatea(editEvent);

    //Assert
    expect(doSearchSpy).toHaveBeenCalled();
  });
});
