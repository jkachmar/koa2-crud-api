import {
  fetchAllSensors,
  fetchOneSensor,
  insertSensor,
  updateSensorState,
  updateSensorLocation,
  checkStatus,
} from '../models/sensor';

export const getAllSensors = async (ctx) => {
  const sensor = await fetchAllSensors();
  ctx.body = sensor.toJSON();
};

export const addSensor = async (ctx) => {
  ctx.assert(ctx.request.type === 'application/json', 400);
  const body = ctx.request.body;

  ctx.assert(('id' in body), 400, 'Payload must contain "id" field.');

  let sensor = await fetchOneSensor(body.id);
  if (!sensor) {
    await insertSensor(body.id);
    sensor = await fetchOneSensor(body.id);
  }

  ctx.assert(('lp' in body), 400, 'Payload must contain "lp" field.');
  ctx.assert(('lb' in body), 400, 'Payload must contain "lb" field.');

  const pState = checkStatus(body.lp, sensor, 'paper_state');
  const bState = checkStatus(body.lb, sensor, 'paper_state');

  if (pState !== sensor.paper_state ||
      bState !== sensor.battery_state) {
    updateSensorState(body.id, pState, bState);
  }

  ctx.body = { uuid: body.id,
               paper_state: pState,
               battery_state: bState };
};

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
