import {RoleModel} from "./role";

export interface UserModel {
    id: number,
    email: string,
    password?: string,
    role_id?: number,
    roles?: RoleModel[],
    created_at?: Date,
    updated_at?: Date
}