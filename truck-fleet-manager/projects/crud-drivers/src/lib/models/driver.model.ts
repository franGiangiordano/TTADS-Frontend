export class Driver {
    constructor(_id = "", legajo = 0, name = "", surname = "") {
      this._id = _id;
      this.legajo = legajo;
      this.name = name;
      this.surname = surname;
    }
    _id: string;
    legajo: number;
    name: string;
    surname: string;
  }
  