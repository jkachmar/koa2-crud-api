import { insertEvent } from '../models/event';
import {
  fetchAllSensors,
  fetchOneSensor,
  insertSensor,
  updateSensorState,
  updateSensorLocation,
  checkStatus,
} from '../models/sensor';

// Gets all sensor from database, responds with a JSON body
export const getAllSensors = async (ctx) => {
  const sensor = await fetchAllSensors();
  ctx.body = sensor.toJSON();
};

// Adds a sensor and/or associated event information to the database
export const addSensor = async (ctx) => {
  ctx.assert(ctx.request.type === 'application/json', 400);
  const body = ctx.request.body;

  ctx.assert(('id' in body), 400, 'Payload must contain "id" field.');

  // Checks if the sensor exists...
  const sensor = await fetchOneSensor(body.id);
  if (!sensor) {
    // ... if it doesn't, insert it and block until finished
    await insertSensor(body.id);
  }

  // Validate JSON request body and insert sensor event if possible
  ctx.assert(('lp' in body), 400, 'Payload must contain "lp" field.');
  ctx.assert(('lb' in body), 400, 'Payload must contain "lb" field.');
  insertEvent(body);

  const pState = checkStatus(body.lp, sensor, 'paper_state');
  const bState = checkStatus(body.lb, sensor, 'paper_state');

  if (pState !== sensor.paper_state ||
      bState !== sensor.battery_state) {
    updateSensorState(body.id, pState, bState);
  }

  // Respond with updated state for the sensor ID
  ctx.body = { uuid: body.id,
               paper_state: pState,
               battery_state: bState };
};

// Updates a sensor's location identifier
export const updateLocation = async (ctx) => {
  const body = ctx.request.body;
  const sensorUuid = ctx.params.uuid;
  const sensor = await fetchOneSensor(sensorUuid);

  ctx.assert(ctx.request.type === 'application/json', 400);
  ctx.assert(sensor, 404, `Sensor ${sensorUuid} not found.`);
  ctx.assert(('loc' in body), 400, 'Payload must contain "loc" field.');

  updateSensorLocation(sensorUuid, body.loc);
  ctx.body = { uuid: sensorUuid,
               location: body.loc };
};
