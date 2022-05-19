/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PitchComponent } from './Pitch.component';

describe('PitchComponent', () => {
  let component: PitchComponent;
  let fixture: ComponentFixture<PitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
