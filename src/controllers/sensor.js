import Sensor from '../models/sensor';

async function fetchAllSensors() {
  return Sensor.forge().fetchAll();
}

async function fetchOneSensor(sensorId) {
  return Sensor.forge().where('uuid', '=', sensorId).fetch();
}

async function insertSensor(sensorId) {
  return Sensor.forge({
    uuid: sensorId,
    paper_state: 'good',
    battery_state: 'good',
  }).save();
}

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

  ctx.body = sensor.toJSON();
};

export const updateLocation = (ctx) => {
  ctx.assert(ctx.request.type === 'application/json', 400);
  ctx.body = '[PUT]: new location';
};
