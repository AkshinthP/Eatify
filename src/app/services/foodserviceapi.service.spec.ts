import { TestBed } from '@angular/core/testing';

import { FoodserviceapiService } from './foodserviceapi.service';

describe('FoodserviceapiService', () => {
  let service: FoodserviceapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodserviceapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
