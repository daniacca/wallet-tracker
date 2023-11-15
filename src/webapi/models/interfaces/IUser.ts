import { IEntitiy } from "./IEntity.js";

export enum Roles {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IUser extends IEntitiy {
  name: string;
  email: string;
  password: string;
  role: Roles;
}
