/* eslint arrow-body-style: ["error", "always"] */

exports.up = (knex) => {
  return knex.schema
  // table of sensors, each with a uuid
  .createTable('sensors', (table) => {
    table.increments('id').primary();
    table.string('location').defaultTo('Unknown');
    table.string('paper_state');
    table.string('battery_state');
    table.integer('uuid').unique().notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  })

  // table of events associated with a sensor
  .createTable('events', (table) => {
    table.increments('id').primary();
    table.integer('low_paper_value').notNullable();
    table.integer('low_battery_value').notNullable();
    table.integer('sensor_uuid').references('sensors.uuid');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = (knex) => {
  return knex.schema
    .dropTable('events')
    .dropTable('sensors');
};
