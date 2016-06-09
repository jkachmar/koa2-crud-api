import Sensor from '../models/sensor';

export const getAllSensors = (ctx) => {
  ctx.body = { test: 'Test' };
};

export const addSensor = (ctx) => {
  if (ctx.response.type === /json/) {
    ctx.body = '[POST]: new sensor';
  }
};

export const updateLocation = (ctx) => {
  if (ctx.response.type === /json/) {
    ctx.body = '[PUT]: new location';
  }
};
