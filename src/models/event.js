/* eslint arrow-body-style: ["error", "always"] */

import db from '../../db/bookshelf';
import Sensor from './sensor';

const Event = db.Model.extend({
  tableName: 'events',
  hasTimestamp: true,
  sensor: () => {
    return this.belongsTo(Sensor);
  },
});

export default Event;
