import {KnexClient} from "./plugins/knex";
import {DbConfig, DBRepos} from "./interfaces/dbConfig";

export class DBManager extends KnexClient {
    private repos: any = {};
    constructor(config: DbConfig) {
        super(config);
    }

    async loadRepository (repo: DBRepos) {
        try {
            if (!this.repos[repo]) {
                const r = await import(`../repositories/${repo}`);
                const classD = new r(super.client());
                this.repos[repo] = classD;
            }
        
            return this.repos[repo];
        } catch (e) {
            console.error("Error loading repository", e);
        }
    }
}