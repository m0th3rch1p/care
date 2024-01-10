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