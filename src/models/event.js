/* eslint arrow-body-style: ["error", "always"] */

import db from '../../db/bookshelf';
import Sensor from './sensor';

const Event = db.Model.extend({
  tableName: 'events',
  events: () => {
    return this.hasOne(Sensor);
  },
});

export default Event;
