import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { TrailerListComponent } from './trailer.list.component';
import { NotificationService } from '../../../../../../projects/common/src';
import { TrailerService } from '../../services/trailer.service';

describe('TrailerListComponent', () => {
    let component: TrailerListComponent;
    let fixture: ComponentFixture<TrailerListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [NotificationService, MatSnackBar, TrailerService],
            declarations: [TrailerListComponent]
        });
        fixture = TestBed.createComponent(TrailerListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
