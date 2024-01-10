import knex from 'knex'
import {DbConfig, DBModel} from "../../interfaces/dbConfig";

export class KnexClient {
    private readonly _client;
    constructor(config: DbConfig) {
        this._client = knex({
            client: 'pg',
            connection: {
                host: config.host,
                port: config.port,
                user: config.user,
                password: config.password,
                database: config.database,
                ssl: config.ssl ? { rejectUnauthorized: false } : false
            }
        });
    }


    public client() {
        return this._client;
    }
}