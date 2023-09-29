import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BateaComponentComponent } from './batea.component';

describe('BateaComponentComponent', () => {
  let component: BateaComponentComponent;
  let fixture: ComponentFixture<BateaComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BateaComponentComponent]
    });
    fixture = TestBed.createComponent(BateaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
