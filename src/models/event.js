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

export const insertEvent = async (payload) => {
  return Event.forge({
    low_paper_value: payload.lp,
    low_battery_value: payload.lb,
    sensor_uuid: payload.id,
  }).save();
};

export const fetchAllEvents = async () => {
  return Event.forge().fetchAll();
};

export const fetchSensorEvents = async (uuid) => {
  return Event.forge().where('sensor_uuid', '=', uuid).fetchAll();
};
