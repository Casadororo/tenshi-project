import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchConfigPage } from './switch-config.page';

describe('SwitchConfigPage', () => {
  let component: SwitchConfigPage;
  let fixture: ComponentFixture<SwitchConfigPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchConfigPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
