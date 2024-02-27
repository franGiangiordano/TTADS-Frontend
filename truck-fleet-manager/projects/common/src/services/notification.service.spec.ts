import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
    let service: NotificationService;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [MatSnackBar] });
        service = TestBed.inject(NotificationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
