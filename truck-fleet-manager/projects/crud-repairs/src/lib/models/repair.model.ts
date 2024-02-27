import { Equipment } from 'projects/crud-equipment/src/lib/models';

export class Repair {
  constructor(
    _id = '',
    description = '',
    cost = 0,
    equipment: Equipment,
    km = 0
  ) {
    this._id = _id;
    this.description = description;
    this.cost = cost;
    this.equipment = equipment;
    this.km = km;
  }
  _id: string;
  description: string;
  cost: number;
  equipment: Equipment;
  createdAt?: Date;
  km: number;
}
