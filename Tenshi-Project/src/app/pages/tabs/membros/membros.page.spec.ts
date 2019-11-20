import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembrosPage } from './membros.page';

describe('MembrosPage', () => {
  let component: MembrosPage;
  let fixture: ComponentFixture<MembrosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembrosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
