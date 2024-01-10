import { UserModel } from "../interfaces/user";
import {KnexClient} from "../plugins/knex";
import { Knex } from "knex";

export class UserRepo {
    private readonly client: Knex;
    private readonly table: Knex.QueryBuilder<UserModel, ({ _base: UserModel; _hasSelection: boolean; _keys: string; _aliases: {}; _single: boolean; _intersectProps: {}; _unionProps: unknown; } | { _base: UserModel; _hasSelection: false; _keys: never; _aliases: {}; _single: false; _intersectProps: {}; _unionProps: never; })[] | { _base: UserModel; _hasSelection: false; _keys: never; _aliases: {}; _single: false; _intersectProps: {}; _unionProps: never; }[]>;
    private readonly tableName: string = "users";
    constructor(client: KnexClient) {
        this.client = client.client();
        this.table = this.client.table<UserModel>(this.tableName);
    }

    async save (user: UserModel) {
        return this.table.insert(user, ['id', 'email']);
    }

    fetchAll () {
        return this.table
            .join('role_user', 'role_user.user_id', '=', 'users.id')
            .select('email');
    }

    fetchById (id: number) {
        return this.table
            .join('role_user', 'role_user.user_id', '=', 'users.id')
            .select('email').where({
                id
            });
    }

    searchByEmail (email: string) {
        return this.table.whereILike('email', `%${email}%`);
    }

    updateEmail (userId: number, email: string) {
        return this.table.where({
            id: userId
        }).update({
            email
        });
    }

    updatePassword (userId: number, hashedPassword: string) {
        return this.table.where({
            id: userId
        }).update({
            password: hashedPassword
        });
    }

    destroyUser (userId: number) {
        return this.table.where({
            id: userId
        }).delete();
    }
}