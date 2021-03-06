/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SesionesComponent } from './Sesiones.component';

describe('SesionesComponent', () => {
  let component: SesionesComponent;
  let fixture: ComponentFixture<SesionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
