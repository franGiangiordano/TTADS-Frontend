import { UserRole } from "./userRole";

export class User {
    constructor(_id = "", name = "",email = "", password = "", roles = []) {
      this._id = _id;
      this.name = name;  
      this.email = email;   
      this.password = password;   
      this.roles = roles; 
    }
    _id: string;
    name: string;  
    email:string; 
    password:string;
    roles: UserRole[];
  }
