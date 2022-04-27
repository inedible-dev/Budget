import { TestBed } from '@angular/core/testing';

import { BudgetsServiceService } from './budgets-service.service';

describe('BudgetsServiceService', () => {
  let service: BudgetsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
