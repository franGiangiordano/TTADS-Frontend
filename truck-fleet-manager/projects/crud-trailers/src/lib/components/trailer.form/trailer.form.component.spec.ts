import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerFormComponent } from './trailer.form.component';
import { NotificationService } from '../../../../../../projects/common/src';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrailerService } from '../../services/trailer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('TrailerFormComponent', () => {
    let component: TrailerFormComponent;
    let fixture: ComponentFixture<TrailerFormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [NotificationService, MatSnackBar, TrailerService],
            declarations: [TrailerFormComponent]
        });
        fixture = TestBed.createComponent(TrailerFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
