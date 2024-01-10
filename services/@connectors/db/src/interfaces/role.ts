import {UserModel} from "./user";

export interface RoleModel {
    id: number,
    name: string,
    createdAt: Date,
    users: UserModel[]
}