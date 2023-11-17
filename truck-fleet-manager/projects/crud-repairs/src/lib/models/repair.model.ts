import { Equipment } from "projects/crud-equipment/src/lib/models";

export class Repair  {
    constructor(
        _id = "", 
        description = "",
        cost = "", 
        equipment: Equipment,
        ) {
      this._id = _id;
      this.description = description;
      this.cost = cost;
      this.equipment = equipment;
    }
    _id: string;
    description: string; 
    cost: string;
    equipment: Equipment;
    createdAt?: Date;
  }