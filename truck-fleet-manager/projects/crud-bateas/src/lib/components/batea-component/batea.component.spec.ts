import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BateaComponent } from './batea.component';

describe('BateaComponent', () => {
    let component: BateaComponent;
    let fixture: ComponentFixture<BateaComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [BateaComponent]
        });
        fixture = TestBed.createComponent(BateaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
