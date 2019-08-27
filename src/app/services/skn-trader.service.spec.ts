import { TestBed } from '@angular/core/testing';

import { SknTraderService } from './skn-trader.service';

describe('SknTraderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SknTraderService = TestBed.get(SknTraderService);
    expect(service).toBeTruthy();
  });
});
