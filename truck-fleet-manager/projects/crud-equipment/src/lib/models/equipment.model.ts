import { Batea } from "projects/crud-bateas/src/lib/models";
import { Driver } from "projects/crud-drivers/src/lib/models";
import { Trailer } from "projects/crud-trailers/src/lib/models";

export class Equipment {
    constructor(_id = "", description = "", date= new Date(), batea:Batea, driver:Driver, trailer: Trailer) {
      this._id = _id;
      this.description = description;    
      this.until_date = date; 
      this.batea = batea;
      this.driver = driver;
      this.trailer = trailer;
    }
    _id: string;
    description: string; 
    until_date: Date;
    batea: Batea;
    driver: Driver;
    trailer: Trailer;
  }