import { Batea } from './batea.model';

export class GetBateasResponse {
    bateas!: Batea[];
    currentPage!: number;
    totalPages!: number;
    totalBateas!: number

    constructor() { }
}