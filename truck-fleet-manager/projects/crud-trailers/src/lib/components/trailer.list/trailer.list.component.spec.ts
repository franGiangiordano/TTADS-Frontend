import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerListComponent } from './trailer.list.component';

describe('TrailerListComponent', () => {
  let component: TrailerListComponent;
  let fixture: ComponentFixture<TrailerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
