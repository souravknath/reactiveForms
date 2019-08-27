import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SknTraderComponent } from './skn-trader.component';

describe('SknTraderComponent', () => {
  let component: SknTraderComponent;
  let fixture: ComponentFixture<SknTraderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SknTraderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SknTraderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
