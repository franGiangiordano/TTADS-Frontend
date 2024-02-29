/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RepairlistComponent} from './repair.list.component';

describe('RepairlistComponent', () => {
  let component: RepairlistComponent;
  let fixture: ComponentFixture<RepairlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
