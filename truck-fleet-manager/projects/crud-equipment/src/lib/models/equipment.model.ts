import { Batea } from "projects/crud-bateas/src/lib/models";
import { Driver } from "projects/crud-drivers/src/lib/models";
import { Trailer } from "projects/crud-trailers/src/lib/models";

export class Equipment {
    constructor(_id = "", description = "", batea:Batea, driver:Driver, trailer: Trailer) {
      this._id = _id;
      this.description = description;    
      this.batea = batea;
      this.driver = driver;
      this.trailer = trailer;
    }
    _id: string;
    description: string; 
    createdAt?: Date;
    updatedAt?: Date;
    batea: Batea;
    driver: Driver;
    trailer: Trailer;
  }