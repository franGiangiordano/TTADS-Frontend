import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TravelListComponent } from './travel.list.component';
import { TravelService } from '../../services/travel.service';
import { NotificationService } from '../../../../../../projects/common/src';

describe('TravelListComponent', () => {
    let component: TravelListComponent;
    let fixture: ComponentFixture<TravelListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            declarations: [TravelListComponent],
            providers: [TravelService, NotificationService, MatSnackBar]
        });
        fixture = TestBed.createComponent(TravelListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
