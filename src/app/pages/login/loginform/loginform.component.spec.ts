import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Logindata } from './loginform.component';

describe('Logindata', () => {
  let component: Logindata;
  let fixture: ComponentFixture<Logindata>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logindata],
    }).compileComponents();

    fixture = TestBed.createComponent(Logindata);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
