exports.seed = (knex, Promise) => {
  return Promise.join(
    // Deletes ALL existing entries
    knex.table('sensors').del(),
    knex.table('events').del(),

    // Inserts seed entries
    knex.table('sensors').insert({
      uuid: 1234,
      location: '4th Floor Mens',
      paper_state: 'good',
      battery_state: 'good',
    }),

    knex.table('sensors').insert({
      uuid: 1107,
      location: '4th Floor Womens',
      paper_state: 'good',
      battery_state: 'good',
    })
  );
};
