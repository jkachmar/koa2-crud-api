/* eslint arrow-body-style: ["error", "always"] */

import db from '../db/bookshelf';
import Event from './event';

// Sensor model, has a one-to-many relationship with Events
const Sensor = db.Model.extend({
  tableName: 'sensors',
  hasTimestamps: true,
  events: () => {
    return this.hasMany(Event);
  },
});

// Fetches all sensors in the database
export const fetchAllSensors = async () => {
  return Sensor.forge().fetchAll();
};

// Fetches a sensor in the database associated with the provided UUID
export const fetchOneSensor = async (sensorId) => {
  return Sensor.forge().where('uuid', '=', sensorId).fetch();
};

// Inserts a sensor with the provided UUID, initializes default state
export const insertSensor = async (sensorId) => {
  return Sensor.forge({
    uuid: sensorId,
    paper_state: 'good',
    battery_state: 'good',
  }).save();
};

// Updates the paper and battery state
export const updateSensorState = async (id, pState, bState) => {
  return Sensor.forge().where('uuid', '=', id)
    .save({ paper_state: pState,
            battery_state: bState },
          { patch: true });
};

// Updates the sensor location
export const updateSensorLocation = async (id, sensorLoc) => {
  return Sensor.forge().where('uuid', '=', id)
    .save({ location: sensorLoc }, { patch: true });
};
