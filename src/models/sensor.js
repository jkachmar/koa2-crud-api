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

export const fetchAllSensors = async () => {
  return Sensor.forge().fetchAll();
};

export const fetchOneSensor = async (sensorId) => {
  return Sensor.forge().where('uuid', '=', sensorId).fetch();
};

export const insertSensor = async (sensorId) => {
  return Sensor.forge({
    uuid: sensorId,
    paper_state: 'good',
    battery_state: 'good',
  }).save();
};

export const updateSensor = async (id, pState, bState) => {
  return Sensor.forge().where('uuid', '=', id)
    .save({ paper_state: pState,
            battery_state: bState },
          { patch: true });
};

export const checkStatus = (val, sensor, flag) => {
  let newState = sensor[flag];
  if (val === 1) {
    newState = 'good';
  } else if (sensor[flag] !== 'low') {
    newState = 'low';
  }
  return newState;
};
