import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BateaListComponent } from './batea.list.component';

describe('BateaListComponent', () => {
  let component: BateaListComponent;
  let fixture: ComponentFixture<BateaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BateaListComponent]
    });
    fixture = TestBed.createComponent(BateaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
