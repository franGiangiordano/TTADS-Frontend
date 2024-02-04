import { Observable, of } from 'rxjs';
import { Batea } from '../../../projects/crud-bateas/src/lib/models/batea.model';
import { EntityListResponse } from '../../../projects/common/src/models/entity.list.response';

export const BateaServiceMock: {
  getBateas: (
    page: number,
    limit: number,
    search: string
  ) => Observable<EntityListResponse<Batea>>;

  getBatea: (id: string) => Observable<Batea>;

  postBateas: (batea: Batea) => Observable<Batea>;

  putBateas: (selectedBatea: Batea) => Observable<Batea>;

  deleteBateas: (batea: Batea) => Observable<Batea>;
} = {
  getBateas: (page: number, limit: number, search: string) => {
    return of({
      count: 2,
      results: [
        {
          _id: '1',
          patent: '1231',
        },
        {
          _id: '2',
          patent: '1232',
        },
      ],
      currentPage: 1,
      totalPages: 1,
    });
  },
  getBatea: () => {
    return of({
      _id: '1',
      patent: '1231',
    });
  },
  postBateas: () => {
    return new Observable<Batea>();
  },
  putBateas: () => {
    return new Observable<Batea>();
  },
  deleteBateas: () => {
    return new Observable<Batea>();
  },
};
