import { Batea } from "projects/crud-bateas/src/lib/models";

export class Equipment {
    constructor(_id = "", description = "", date= new Date(), batea:Batea) {
      this._id = _id;
      this.description = description;    
      this.until_date = date; 
      this.batea = batea;
    }
    _id: string;
    description: string; 
    until_date: Date;
    batea: Batea;
  }