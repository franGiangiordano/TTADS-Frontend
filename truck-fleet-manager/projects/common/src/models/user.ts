export class User {
    constructor(_id = "", name = "",email = "", roles = []) {
      this._id = _id;
      this.name = name;  
      this.email = email;   
      this.roles = roles; 
    }
    _id: string;
    name: string;  
    email:string; 
    roles: string[];
  }
