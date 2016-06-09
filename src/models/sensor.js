/* eslint arrow-body-style: ["error", "always"] */

import db from '../../db/bookshelf';
import Event from './event';

const Sensor = db.Model.extend({
  tableName: 'sensors',
  hasTimestamps: true,
  events: () => {
    return this.hasMany(Event);
  },
});

// function checkState(val, sensor, flag, app) {
//   let newState = sensor[flag];
//   if (val === 1) {
//     newState = 'good';
//   } else if (sensor[flag] !== 'low') {
//     newState = 'low';
//     app.emit(`${flag}.update`, sensor.location);
//   }
//   return newState;
// }

export default Sensor;
