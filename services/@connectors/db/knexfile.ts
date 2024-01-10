import type { Knex } from "knex";
import { config as dotenvConfig } from 'dotenv'
import path from 'path';

// Update with your config settings.
dotenvConfig();
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.PG_DB_HOST_DEV,
      database: process.env.PG_DB_NAME_DEV,
      user: process.env.PG_DB_USER_DEV,
      password: process.env.PG_DB_PASS_DEV
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: process.env.PG_DB_NAME_STAGE,
      user: process.env.PG_DB_USER_STAGE,
      password: process.env.PG_DB_PASS_STAGE
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: process.env.PG_DB_NAME_PROD,
      user: process.env.PG_DB_USER_PROD,
      password: process.env.PG_DB_PASS_PROD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  test: {
    client: "sqlite3",
    connection: ":memory:",
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "seeds")
    }
  },

};

module.exports = config;
