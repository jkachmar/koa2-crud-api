/* eslint arrow-body-style: ["error", "always"] */

import db from '../../db/bookshelf';
import Event from './event';

const Sensor = db.Model.extend({
  tableName: 'users',
  events: () => {
    return this.belongsToMany(Event);
  },
});

export default Sensor;
