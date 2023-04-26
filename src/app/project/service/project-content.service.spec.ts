import { TestBed } from '@angular/core/testing';

import { ProjectContentService } from './project-content.service';

describe('ProjectContentService', () => {
  let service: ProjectContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
