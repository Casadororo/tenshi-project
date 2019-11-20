import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadPage } from './cad.page';

describe('CadPage', () => {
  let component: CadPage;
  let fixture: ComponentFixture<CadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
