import { IEntitiy } from "./IEntity.js";

export interface IUser extends IEntitiy {
  name: string;
  email: string;
  password: string;
}
