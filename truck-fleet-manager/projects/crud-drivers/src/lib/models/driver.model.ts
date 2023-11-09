export class Driver {
    constructor(_id = "", legajo = "", name = "", surname = "") {
      this._id = _id;
      this.legajo = legajo;
      this.name = name;
      this.surname = surname;
    }
    _id: string;
    legajo: string;
    name: string;
    surname: string;
  }
  