const dbConfig = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'sensor_api_devdb',
      user: 'dev',
      password: '',
    },
    migrations: {
      directory: `${__dirname}/migrations`,
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: `${__dirname}/seeds/dev`,
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: `${__dirname}/migrations`,
      tableName: 'knex_migrations',
    },
  },
};

module.exports = dbConfig;
