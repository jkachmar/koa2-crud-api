import Sensor from '../models/sensor';

async function fetchAllSensors() {
  return Sensor.forge().fetchAll();
}

export const getAllSensors = async (ctx) => {
  const sensor = await fetchAllSensors();
  ctx.body = sensor.toJSON();
};

export const addSensor = (ctx) => {
  ctx.assert(ctx.request.type === 'application/json', 400);
  ctx.body = '[POST]: new sensor';
};

export const updateLocation = (ctx) => {
  ctx.assert(ctx.request.type === 'application/json', 400);
  ctx.body = '[PUT]: new location';
};
