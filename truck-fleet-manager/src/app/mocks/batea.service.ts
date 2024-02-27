import { Observable, of } from 'rxjs';

import { Batea } from '../../../projects/crud-bateas/src/lib/models/batea.model';

export class BateaServiceMock {
  getBateas() {
    return of();
  }

  getBatea() {
    return of();
  };

  postBateas() {
    return new Observable<Batea>();
  };

  putBateas() {
    return new Observable<Batea>();
  };

  deleteBateas() {
    return new Observable<Batea>();
  };
} 
