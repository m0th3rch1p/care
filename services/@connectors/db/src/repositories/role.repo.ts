import { RoleModel } from "../interfaces/role";
import {KnexClient} from "../plugins/knex";
import { Knex } from "knex";

export class RoleRepo {
    private readonly client: Knex;
    private readonly table: Knex.QueryBuilder<RoleModel, ({ _base: RoleModel; _hasSelection: boolean; _keys: string; _aliases: {}; _single: boolean; _intersectProps: {}; _unionProps: unknown; } | { _base: RoleModel; _hasSelection: false; _keys: never; _aliases: {}; _single: false; _intersectProps: {}; _unionProps: never; })[] | { _base: RoleModel; _hasSelection: false; _keys: never; _aliases: {}; _single: false; _intersectProps: {}; _unionProps: never; }[]>;
    private readonly tableName: string = "roles";
    
    constructor(client: KnexClient) {
        this.client = client.client();
        this.table = this.client.table<RoleModel>(this.tableName);
    }

    async save (role: RoleModel) {
        return this.table.insert(role, ['id', 'name', 'created_at']);
    }

    fetchAll () {
        return this.table
            .select('id', 'name', 'createdAt');
    }

    fetchById (id: number) {
        return this.table
            .join('role_user', 'role_user.user_id', '=', 'roles.id')
            .select('id', 'name', 'createdAt').where({
                id
            });
    }

    searchByEmail (name: string) {
        return this.table.whereILike('name', `%${name}%`);
    }

    destroyUser (userId: number) {
        return this.table.where({
            id: userId
        }).delete();
    }
}