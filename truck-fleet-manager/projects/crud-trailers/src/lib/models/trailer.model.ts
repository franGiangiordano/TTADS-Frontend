export class Trailer {
    constructor(_id = "", patent = "", type = "") {
      this._id = _id;
      this.patent = patent;
      this.type = type;
    }
    _id: string;
    patent: string;
    type: string; 
  }