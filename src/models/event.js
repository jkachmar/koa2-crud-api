/* eslint arrow-body-style: ["error", "always"] */

import db from '../../db/bookshelf';
import Sensor from './sensor';

// Event model, has a many-to-one relationship with Sensor
const Event = db.Model.extend({
  tableName: 'events',
  hasTimestamp: true,
  sensor: () => {
    return this.belongsTo(Sensor);
  },
});

// Inserts an event when provided a valid JSON payload
export const insertEvent = async (payload) => {
  return Event.forge({
    low_paper_value: payload.lp,
    low_battery_value: payload.lb,
    sensor_uuid: payload.id,
  }).save();
};

// Fetches all events in the database
export const fetchAllEvents = async () => {
  return Event.forge().fetchAll();
};

// Fetches all events associated with a single sensor in the database
export const fetchSensorEvents = async (uuid) => {
  return Event.forge().where('sensor_uuid', '=', uuid).fetchAll();
};
