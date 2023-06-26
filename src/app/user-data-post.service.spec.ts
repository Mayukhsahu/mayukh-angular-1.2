import { TestBed } from '@angular/core/testing';

import { UserDataPostService } from './user-data-post.service';

describe('UserDataPostService', () => {
  let service: UserDataPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
