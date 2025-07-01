// Update with your config settings.

import dotenv from "dotenv";

dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const development = {
  client: "postgresql",
  connection: {
    database: process.env.DEV_DB,
    user: process.env.DEV_USER,
    password: process.env.DEV_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  },
  seeds: {
    directory: "db/seeds"
  }
};

const production = {
  client: "postgresql",
  connection: {
    database: "my_db",
    user: "username",
    password: "password"
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  }
};

export { development, production };

// module.exports = {

//   development: {
//     client: 'postgresql',
//     connection: {
//       database: "project",
//       user: "postgres",
//       password: "12345"
//     }
//   },

//   staging: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   },

//   production: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   }

// };
