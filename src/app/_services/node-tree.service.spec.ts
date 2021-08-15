import { TestBed } from '@angular/core/testing';

import { NodeTreeService } from './node-tree.service';

describe('NodeTreeService', () => {
  let service: NodeTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
