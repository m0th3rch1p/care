import {UserRepo} from "../repositories/user.repo";

export interface DbConfig {
    user: string,
    password: string,
    host: string,
    port: number,
    database: string,
    ssl: boolean
}
export interface DBModel {
    [key: string]: any
}

export enum DBRepos {
    USER_REPO = "user"
}